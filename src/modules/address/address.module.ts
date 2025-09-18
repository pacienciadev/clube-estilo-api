import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressEntity } from './address.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
