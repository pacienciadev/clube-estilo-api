import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IndividualAddressService } from "./individual-address.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";

@Controller('/users/:id/addresses')
export class IndividualAddressController {
  constructor(private readonly individualAddressService: IndividualAddressService) {}

  @Post()
  async createAddress(@Param('id') userId: string, @Body() addressData: CreateAddressDto) {
    return this.individualAddressService.createAddress(userId, addressData);
  }

  @Get()
  async getAddresses(@Param('id') userId: string) {
    return this.individualAddressService.getAddresses(userId);
  }

  @Get(':addressId')
  async getAddress(@Param('id') userId: string, @Param('addressId') addressId: string) {
    return this.individualAddressService.getAddress(userId, addressId);
  }

  @Put(':addressId')
  async updateAddress(@Param('id') userId: string, @Param('addressId') addressId: string, @Body() addressData: UpdateAddressDto) {
    return this.individualAddressService.updateAddress(userId, addressId, addressData);
  }

  @Delete(':addressId')
  async deleteAddress(@Param('id') userId: string, @Param('addressId') addressId: string) {
    return this.individualAddressService.deleteAddress(userId, addressId);
  }
}