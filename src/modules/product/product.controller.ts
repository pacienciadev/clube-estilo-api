import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('produtos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productData: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(productData);

    return {
      message: 'Produto criado com sucesso.',
      product: createdProduct,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listAll() {
    return this.productService.listProducts();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listOne(@Param('id') id: string) {
    const savedProduct = await this.productService.listOneProduct(id);

    console.log('Produto sendo buscado do BD!');

    return savedProduct;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      productData,
    );

    return {
      message: 'Produto atualizado com sucesso',
      product: updatedProduct,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const removedProduct = await this.productService.deleteProduct(id);

    return {
      message: 'Produto removido com sucesso',
      product: removedProduct,
    };
  }
}
