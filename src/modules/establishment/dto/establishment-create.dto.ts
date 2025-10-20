import { IsNotEmpty } from 'class-validator';

export class EstablishmentCreateDTO {
  @IsNotEmpty({ message: 'O nome do estabelecimento não pode ser vazio' })
  establishment_name: string;

  @IsNotEmpty({ message: 'O e-mail do estabelecimento não pode ser vazio' })
  establishment_email: string;

  @IsNotEmpty({ message: 'O endereço do estabelecimento não pode ser vazio' })
  establishment_address: string;
  
  @IsNotEmpty({ message: 'O documento do estabelecimento não pode ser vazio' })
  establishment_document: string;

  @IsNotEmpty({ message: 'O tipo de associação não pode ser vazio' })
  membership_type: string;

  @IsNotEmpty({ message: 'O valor da mensalidade não pode ser vazio' })
  monthly_fee: number;

  @IsNotEmpty({ message: 'A descrição do estabelecimento não pode ser vazia' })
  establishment_description: string;

  @IsNotEmpty({ message: 'Os serviços não podem ser vazios' })
  establishment_services: string[];
}
