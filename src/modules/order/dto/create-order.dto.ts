import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class ItemRequestDTO {
  @IsUUID()
  productId: string;
  @IsInt()
  @Min(1, { message: 'A quantidade solicitada deve ser maior que zero' })
  quantity: number;
}

export class CreateOrderDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemRequestDTO)
  itemsRequest: ItemRequestDTO[];
}
