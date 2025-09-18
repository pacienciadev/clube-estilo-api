import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressEntity } from './address.entity';
import { UserEntity } from 'src/modules/user/user.entity';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return user;
  }

  async createAddress(userId: string, addressData: CreateAddressDto) {
    const user = await this.findUser(userId);

    const address = this.addressRepository.create({
      ...addressData,
      user,
    });

    return this.addressRepository.save(address);
  }

  async getAddresses(userId: string) {
    const user = await this.findUser(userId);

    return this.addressRepository.find({ where: { user: { id: user.id } } });
  }

  async getAddress(userId: string, addressId: string) {
    const user = await this.findUser(userId);

    return this.addressRepository.findOne({
      where: { id: addressId, user: { id: user.id } },
    });
  }

  async updateAddress(
    userId: string,
    addressId: string,
    addressData: UpdateAddressDto,
  ) {
    const user = await this.findUser(userId);

    const updateResult = await this.addressRepository.update(
      { id: addressId, user },
      addressData,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(
        'Endereço não encontrado ou não pertence ao usuário',
      );
    }

    return this.getAddress(userId, addressId);
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.getAddress(userId, addressId);

    if (!address) {
      throw new NotFoundException('O endereço não foi encontrado');
    }

    await this.addressRepository.remove(address);
  }
}
