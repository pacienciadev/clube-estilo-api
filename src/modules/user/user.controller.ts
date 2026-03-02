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
import { Role, Roles } from '../role/roles.decorator';
import { RolesGuard } from '../role/roles.guard';

import { UserService } from './user.service';

import { UserListDTO } from './dto/user-list.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';

import { HashPasswordPipe } from 'src/pipes/password-hash-transform.pipe';

import { AuthGuard } from 'src/auth/guards/auth.guard';

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
      user: new UserListDTO(
        createdUser.id,
        createdUser.firstName,
        createdUser.lastName,
        createdUser.email,
        createdUser.phone,
        createdUser.cpf,
        createdUser.birthDate,
        createdUser.gender,
        createdUser.addresses,
        createdUser.status,
        createdUser.role,
        createdUser.createdAt,
        createdUser.updatedAt,
        createdUser.deletedAt,
      ),
      access_token: await this.jwtService.signAsync({
        sub: createdUser.id,
        userName: `${createdUser.firstName} ${createdUser.lastName}`,
        status: createdUser.status,
        role: createdUser.role,
      }),
    };
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async usersList() {
    const savedUsers = await this.userService.usersList();

    return {
      message: 'Usuários obtidos com sucesso.',
      users: savedUsers.map(
        (user) =>
          new UserListDTO(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.cpf,
            user.phone,
            user.birthDate,
            user.gender,
            user.addresses,
            user.status,
            user.role,
            user.createdAt,
            user.updatedAt,
            user.deletedAt,
          ),
      ),
    };
  }

  @Get('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async userDetails(@Param('id') id: string) {
    const user = await this.userService.searchById(id);

    return new UserListDTO(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.cpf,
      user.phone,
      user.birthDate,
      user.gender,
      user.addresses,
      user.status,
      user.role,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  @Put('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateUser(@Param('id') id: string, @Body() newData: UserUpdateDTO) {
    const updatedUser = await this.userService.updateUser(id, newData);

    return {
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userService.deleteUser(id);

    return {
      message: 'Usuário removido com sucesso',
      user: removedUser,
    };
  }
}

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
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
          user.firstName,
          user.lastName,
          user.email,
          user.phone,
          user.cpf,
          user.birthDate,
          user.gender,
          user.addresses,
          user.status,
          user.role,
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
      user.firstName,
      user.lastName,
      user.email,
      user.cpf,
      user.phone,
      user.birthDate,
      user.gender,
      user.addresses,
      user.status,
      user.role,
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
