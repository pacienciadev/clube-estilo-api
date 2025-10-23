import { IsNotEmpty, IsString } from "class-validator";

import { ProductEntity } from "../product.entity";

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