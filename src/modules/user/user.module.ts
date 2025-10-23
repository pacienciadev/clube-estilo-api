import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserController, UserController } from './user.controller';
import { HasUniqueEmailHashValidator } from './validation/unique-email.validator';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, AdminUserController],
  providers: [UserService, HasUniqueEmailHashValidator, CryptoService],
  exports: [UserService, CryptoService],
})
export class UserModule {}
