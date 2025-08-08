import { Type } from 'class-transformer';

import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { ProductEntity } from '../product.entity';

export class ProductFeatureDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da característica não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  description: string;

  product: ProductEntity;
}

export class ProductImageDTO {
  id: string;

  @IsUrl({}, { message: 'URL para imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProductEntity;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidadeDisponivel: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductFeatureDTO)
  features: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  imagens: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;
}
