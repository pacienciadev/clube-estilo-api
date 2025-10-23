import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';

import { UserListDTO } from './dto/user-list.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';

import { HashPasswordPipe } from 'src/pipes/password-hash-transform.pipe';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserAffiliationEnum } from './enums/user.enum';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async createUser(
    @Body() userData: UserCreateDTO,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    const createdUser = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    return {
      message: 'Usuário criado com sucesso.',
      access_token: await this.jwtService.signAsync({
        sub: createdUser.id,
        userName: createdUser.name,
        affiliation: createdUser.affiliation,
        status: createdUser.status,
      }),
    };
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() newData: UserUpdateDTO) {
    const updatedUser = await this.userService.updateUser(id, newData);

    return {
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userService.deleteUser(id);

    return {
      message: 'Usuário removido com sucesso',
      user: removedUser,
    };
  }
}

@Roles(UserAffiliationEnum.SUPER_ADMIN, UserAffiliationEnum.CE_ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('/admin/users')
export class AdminUserController {
  constructor(private userService: UserService) {}

  @Get()
  async usersList() {
    const savedUsers = await this.userService.usersList();

    return savedUsers.map(
      (user) =>
        new UserListDTO(
          user.id,
          user.name,
          user.email,
          user.phone,
          user.cpf,
          user.birthDate,
          user.gender,
          user.addresses,
          user.affiliation,
          user.status,
          user.createdAt,
          user.updatedAt,
          user.deletedAt,
        ),
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async userDetails(@Param('id') id: string) {
    const user = await this.userService.searchById(id);

    return new UserListDTO(
      user.id,
      user.name,
      user.encryptedEmail,
      user.encryptedPhone,
      user.encryptedCpf,
      user.encryptedBirthDate,
      user.encryptedGender,
      user.addresses,
      user.affiliation,
      user.status,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  @Get('/pending')
  async usersPendingList() {
    const pendingUsers = await this.userService.pendingUsersList();

    return {
      message: 'Usuários pendentes obtidos com sucesso.',
      users: pendingUsers,
    };
  }

  @Put('/approve/:id')
  async approveUser(@Param('id') id: string) {
    await this.userService.approveUser(id);

    return {
      message: 'Usuário aprovado com sucesso.',
    };
  }
}
