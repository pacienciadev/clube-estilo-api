import { IsNotEmpty, IsString, IsUrl } from "class-validator";

import { ProductEntity } from "../product.entity";

export class ProductImageDTO {
  id: string;

  @IsUrl({}, { message: 'URL para imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProductEntity;
}