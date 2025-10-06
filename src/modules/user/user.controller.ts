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

import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserListDTO } from './dto/user-list.dto';
import { HashPasswordPipe } from 'src/pipes/password-hash-transform.pipe';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async criaUsuario(
    @Body() userData: CreateUserDTO,
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

  @Get()
  @UseGuards(AuthGuard)
  async usersList() {
    const savedUsers = await this.userService.usersList();

    return {
      message: 'Usuários obtidos com sucesso.',
      users: savedUsers.map(
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
            user.createdAt,
            user.updatedAt,
            user.deletedAt,
          ),
      ),
    };
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
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
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
