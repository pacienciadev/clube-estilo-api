import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AddressService } from './address.service';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/user/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Req() req: { user: { sub: string } },
    @Body() addressData: CreateAddressDto,
  ) {
    const userId = req.user.sub;

    return this.addressService.createAddress(userId, addressData);
  }

  @Get()
  async getAddresses(@Req() req: { user: { sub: string } }) {
    const userId = req.user.sub;

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
    @Req() req: { user: { sub: string } },
    @Param('addressId') addressId: string,
    @Body() addressData: UpdateAddressDto,
  ) {
    const userId = req.user.sub;

    return this.addressService.updateAddress(userId, addressId, addressData);
  }

  @Delete(':addressId')
  async deleteAddress(
    @Req() req: { user: { sub: string } },
    @Param('addressId') addressId: string,
  ) {
    const userId = req.user.sub;

    return this.addressService.deleteAddress(userId, addressId);
  }
}
