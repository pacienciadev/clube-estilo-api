import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { HasUniqueEmail } from '../validation/unique-email.validator';
import { HasUniqueCelphone } from '../validation/unique-celphone.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @HasUniqueEmail({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @IsPhoneNumber('BR', { message: 'O telefone informado é inválido' })
  @HasUniqueCelphone({ message: 'Já existe um usuário com este telefone' })
  phone: string;

  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia' })
  bornDate: Date;

  @IsNotEmpty({ message: 'O gênero não pode ser vazio' })
  gender: string;
}
