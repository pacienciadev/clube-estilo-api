import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserListDTO } from './dto/user-list.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    Object.assign(userEntity, userData);

    return this.userRepository.save(userEntity);
  }
  async usersList(): Promise<UserListDTO[]> {
    const users = await this.userRepository.find();
    const userList: UserListDTO[] = users.map(
      (user) => new UserListDTO(user.id, user.name),
    );

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

  async searchByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user === null)
      throw new NotFoundException('O email não foi encontrado.');

    return user;
  }

  async updateUser(id: string, newData: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(user, newData as UserEntity);

    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    await this.userRepository.delete(user.id);

    return user;
  }
}
