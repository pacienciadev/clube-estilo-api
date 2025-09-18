import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AddressService } from './address.service';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('/users/:id/addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Post()
  async createAddress(
    @Param('id') userId: string,
    @Body() addressData: CreateAddressDto,
  ) {
    return this.addressService.createAddress(userId, addressData);
  }

  @Get()
  async getAddresses(@Param('id') userId: string) {
    return this.addressService.getAddresses(userId);
  }

  @Get(':addressId')
  async getAddress(
    @Param('id') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.getAddress(userId, addressId);
  }

  @Put(':addressId')
  async updateAddress(
    @Param('id') userId: string,
    @Param('addressId') addressId: string,
    @Body() addressData: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(
      userId,
      addressId,
      addressData,
    );
  }

  @Delete(':addressId')
  async deleteAddress(
    @Param('id') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.deleteAddress(userId, addressId);
  }
}
