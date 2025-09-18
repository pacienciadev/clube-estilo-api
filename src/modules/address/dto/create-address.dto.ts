import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAddressDto {
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'O campo "rua" não pode ser vazio' })
  street: string;

  @IsNotEmpty({ message: 'O campo "número" não pode ser vazio' })
  number: string;

  @IsOptional()
  complement?: string;

  @IsNotEmpty({ message: 'O campo "cidade" não pode ser vazio' })
  city: string;

  @IsNotEmpty({ message: 'O campo "estado" não pode ser vazio' })
  state: string;

  @IsNotEmpty({ message: 'O campo "CEP" não pode ser vazio' })
  zipCode: string;

  @IsNotEmpty({ message: 'O campo "em uso" não pode ser vazio' })
  inUse: boolean;

  @IsNotEmpty({ message: 'O campo "país" não pode ser vazio' })
  country: string;
}
