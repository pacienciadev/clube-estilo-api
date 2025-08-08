import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { HasUniqueEmailValidator } from './validation/unique-email.validator';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, HasUniqueEmailValidator],
  exports: [UserService],
})
export class UserModule {}
