import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDTO } from './product-create.dto';

export class UpdateProductDTO extends PartialType(ProductCreateDTO) {}
