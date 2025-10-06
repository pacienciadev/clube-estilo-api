import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

import { HasUniqueEmailHash } from '../validation/unique-email.validator';
import { UserGenderEnum } from '../enums/user.enum';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @HasUniqueEmailHash({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'O CPF não pode ser vazio' })
  cpf: string;

  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @IsPhoneNumber('BR', { message: 'O telefone informado é inválido' })
  phone: string;

  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia' })
  birthDate: string;

  @IsNotEmpty({ message: 'O gênero não pode ser vazio' })
  gender: UserGenderEnum;
}
