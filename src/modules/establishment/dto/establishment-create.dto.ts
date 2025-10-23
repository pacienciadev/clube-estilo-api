import { IsNotEmpty } from 'class-validator';

export class EstablishmentCreateDTO {
  @IsNotEmpty({ message: 'O nome do estabelecimento não pode ser vazio' })
  establishmentName: string;

  @IsNotEmpty({ message: 'O e-mail do estabelecimento não pode ser vazio' })
  establishmentEmail: string;

  @IsNotEmpty({ message: 'O endereço do estabelecimento não pode ser vazio' })
  establishmentAddress: string;

  @IsNotEmpty({ message: 'O documento do estabelecimento não pode ser vazio' })
  establishmentDocument: string;

  @IsNotEmpty({ message: 'O tipo de associação não pode ser vazio' })
  membershipType: string;

  @IsNotEmpty({ message: 'O valor da mensalidade não pode ser vazio' })
  monthlyFee: number;

  @IsNotEmpty({ message: 'A descrição do estabelecimento não pode ser vazia' })
  establishmentDescription: string;

  @IsNotEmpty({ message: 'Os serviços não podem ser vazios' })
  establishmentServices: string[];
}
