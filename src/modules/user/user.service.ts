import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserCreateDTO } from './dto/user-create.dto';
import { Repository } from 'typeorm';
import { UserListDTO } from './dto/user-list.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserStatusEnum } from './enums/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(user: UserCreateDTO) {
    const userEntity = new UserEntity();

    const encryptedEmail = this.cryptoService.encrypt(user.email);
    const emailHash = this.cryptoService.createUniqueHash(user.email);
    const encryptedCpf = this.cryptoService.encrypt(user.cpf);
    const cpfHash = this.cryptoService.createUniqueHash(user.cpf);
    const encryptedPhone = this.cryptoService.encrypt(user.phone);
    const phoneHash = this.cryptoService.createUniqueHash(user.phone);
    const encryptedBirthDate = this.cryptoService.encrypt(user.birthDate);
    const encryptedGender = this.cryptoService.encrypt(user.gender);

    const userExists = await this.userRepository.findOne({
      where: { emailHash },
    });

    if (userExists) {
      throw new ConflictException({
        message: 'Este e-mail já está em uso.',
        errorCode: 'EMAIL_IN_USE',
      });
    }

    const cpfExists = await this.userRepository.findOne({
      where: { cpfHash },
    });

    if (cpfExists) {
      throw new ConflictException({
        message: 'Este CPF já está em uso.',
        errorCode: 'CPF_IN_USE',
      });
    }

    const phoneExists = await this.userRepository.findOne({
      where: { phoneHash },
    });

    if (phoneExists) {
      throw new ConflictException({
        message: 'Este telefone já está em uso.',
        errorCode: 'PHONE_IN_USE',
      });
    }

    Object.assign(userEntity, {
      ...user,
      encryptedEmail,
      emailHash,
      encryptedCpf,
      cpfHash,
      encryptedPhone,
      phoneHash,
      encryptedBirthDate,
      encryptedGender,
    });

    return this.userRepository.save(userEntity);
  }

  async usersList(): Promise<UserListDTO[]> {
    const users = await this.userRepository.find();

    const userList: UserListDTO[] = users.map((user) => {
      const decryptEmail = this.cryptoService.decrypt(user.encryptedEmail);
      const decryptedCpf = this.cryptoService.decrypt(user.encryptedCpf);
      const decryptedPhone = this.cryptoService.decrypt(user.encryptedPhone);
      const decryptedBirthDate = this.cryptoService.decrypt(
        user.encryptedBirthDate,
      );
      const decryptedGender = this.cryptoService.decrypt(user.encryptedGender);

      return new UserListDTO(
        user.id,
        user.name,
        decryptEmail,
        decryptedCpf,
        decryptedPhone,
        decryptedBirthDate,
        decryptedGender,
        user.addresses,
        user.affiliation,
        user.status,
        user.createdAt,
        user.updatedAt,
        user.deletedAt,
      );
    });

    return userList;
  }

  async searchById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    return user;
  }

  /**
   * Busca um usuário pelo Hash do Email.
   * Usado pelo HasUniqueEmailValidator e para buscas rápidas.
   * @param emailPlaintext - O e-mail recebido (em texto simples) do DTO.
   */
  async searchByEmailHash(emailPlaintext: string) {
    const emailHash = this.cryptoService.createUniqueHash(emailPlaintext);

    const user = await this.userRepository.findOne({
      where: { emailHash },
    });

    if (user === null) {
      // Retorna a exceção que o validador espera se o e-mail não for encontrado.
      throw new NotFoundException('O e-mail não foi encontrado.');
    }

    return user;
  }

  async searchByCpfHash(cpf: string) {
    const cpfHash = this.cryptoService.createUniqueHash(cpf);

    const user = await this.userRepository.findOne({
      where: { cpfHash },
    });

    if (user === null) throw new NotFoundException('O CPF não foi encontrado.');

    return user;
  }

  async searchByPhoneHash(phone: string) {
    const phoneHash = this.cryptoService.createUniqueHash(phone);

    const user = await this.userRepository.findOne({
      where: { phoneHash },
    });

    if (user === null)
      throw new NotFoundException('O telefone não foi encontrado.');

    return user;
  }

  async updateUser(id: string, newData: UserUpdateDTO) {
    const user = await this.userRepository.findOneBy({ id });

    console.log(' UserService | updateUser | user:', user);

    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(user, newData);

    return this.userRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    await this.userRepository.delete(user.id);

    return user;
  }

  pendingUsersList(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: { status: UserStatusEnum.PENDING },
    });
  }

  approveUser(id: string): Promise<UserEntity> {
    return this.userRepository.save({
      id,
      status: UserStatusEnum.ACTIVE,
    });
  }
}
