import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IndividualAddressEntity } from "./individual-address.entity";
import { Repository } from "typeorm";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { UserEntity } from "src/modules/user/user.entity";

@Injectable()
export class IndividualAddressService {
  constructor(
    @InjectRepository(IndividualAddressEntity)
    private readonly individualAddressRepository: Repository<IndividualAddressEntity>,
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

    const address = this.individualAddressRepository.create({ ...addressData, user });
    
    return this.individualAddressRepository.save(address);
  }

  async getAddresses(userId: string) {
    const user = await this.findUser(userId);

    return this.individualAddressRepository.find({ where: { user } });
  }

  async getAddress(userId: string, addressId: string) {
    const user = await this.findUser(userId);

    return this.individualAddressRepository.findOne({ where: { id: addressId, user } });
  }

  async updateAddress(userId: string, addressId: string, addressData: UpdateAddressDto) {
    const user = await this.findUser(userId);

    await this.individualAddressRepository.update({ id: addressId, user }, addressData);
    return this.getAddress(userId, addressId);
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.getAddress(userId, addressId);
    if (address) {
      await this.individualAddressRepository.remove(address);
    }
  }
}
  