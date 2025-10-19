import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateScheduleDTO {
  @IsNotEmpty({ message: 'O cliente não pode ser vazio' })
  client: string;

  @IsNotEmpty({ message: 'O prestador não pode ser vazio' })
  provider: string;

  @IsNotEmpty({ message: 'O estabelecimento não pode ser vazio' })
  establishment: string;

  @IsNotEmpty({ message: 'Os serviços não podem ser vazios' })
  services: string[];

  @IsNotEmpty({ message: 'A prioridade não pode ser vazia' })
  priority: number;

  @IsNotEmpty({ message: 'O valor da conta não pode ser vazio' })
  bill_value: number;

  @IsOptional()
  accepted_in: string;
  
  @IsOptional()
  check_in: string;
  
  @IsOptional()
  check_out: string;

  @IsNotEmpty({ message: 'A localização dos dispositivos não pode ser vazia' })
  devices_location: string[];
}
