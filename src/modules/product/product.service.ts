import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListProductsDTO } from './dto/list-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productData: CreateProductDTO) {
    const productEntity = new ProductEntity();

    Object.assign(productEntity, productData);

    return this.productRepository.save(productEntity);
  }

  async listProducts() {
    const savedProducts = await this.productRepository.find({
      relations: {
        images: true,
        features: true,
      },
    });

    const productsList = savedProducts.map(
      (product) =>
        new ListProductsDTO(
          product.id,
          product.name,
          product.features,
          product.images,
        ),
    );
    return productsList;
  }

  async listOneProduct(id: string) {
    const savedProduct = await this.productRepository.findOne({
      where: { id },
      relations: {
        images: true,
        features: true,
      },
    });

    if (savedProduct === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    const product = new ListProductsDTO(
      savedProduct.id,
      savedProduct.name,
      savedProduct.features,
      savedProduct.images,
    );

    return product;
  }

  async updateProduct(id: string, newData: UpdateProductDTO) {
    const entityName = await this.productRepository.findOneBy({ id });

    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(entityName, newData as ProductEntity);

    return this.productRepository.save(entityName);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    await this.productRepository.delete(product.id);

    return product;
  }
}
