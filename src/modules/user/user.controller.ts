import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserListDTO } from './dto/user-list.dto';
import { HashPasswordPipe } from 'src/pipes/password-hash-transform.pipe';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

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
      user: new UserListDTO(createdUser.id, createdUser.name),
    };
  }

  @Get()
  async usersList() {
    const savedUsers = await this.userService.usersList();

    return {
      message: 'Usuários obtidos com sucesso.',
      users: savedUsers.map((user) => new UserListDTO(user.id, user.name)),
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userService.updateUser(id, newData);

    return {
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userService.deleteUser(id);

    return {
      message: 'Usuário removido com sucesso',
      user: removedUser,
    };
  }
}
