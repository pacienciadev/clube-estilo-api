import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { In, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { OrderStatus } from './enum/order-status.enum';

import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDTO } from './dto/create-order.dto';

import { OrderEntity } from './order.entity';
import { ItemRequestEntity } from './item-request.entity';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return user;
  }

  private treatOrderData(
    orderData: CreateOrderDTO,
    relatedProducts: ProductEntity[],
  ) {
    orderData.itemsRequest.forEach((itemRequest) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === itemRequest.productId,
      );

      if (relatedProduct === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemRequest.productId} não foi encontrado`,
        );
      }

      if (itemRequest.quantity > relatedProduct.availableQuantity) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemRequest.quantity}) é maior do que a disponível (${relatedProduct.availableQuantity}) para o produto ${relatedProduct.name}.`,
        );
      }
    });
  }

  async registersRequest(userId: string, orderData: CreateOrderDTO) {
    const user = await this.findUser(userId);

    const productIds = orderData.itemsRequest.map(
      (itemRequest) => itemRequest.productId,
    );

    const relatedProducts = await this.productRepository.findBy({
      id: In(productIds),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.IN_PROCESSING;
    orderEntity.user = user;

    this.treatOrderData(orderData, relatedProducts);

    const orderItemsEntities = orderData.itemsRequest.map((itemRequest) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === itemRequest.productId,
      );

      const orderItemEntity = new ItemRequestEntity();

      orderItemEntity.product = relatedProduct!;
      orderItemEntity.salePrice = relatedProduct!.price;

      orderItemEntity.amount = itemRequest.quantity;
      orderItemEntity.product.availableQuantity -= itemRequest.quantity;
      return orderItemEntity;
    });

    const totalValue = orderItemsEntities.reduce((total, item) => {
      return total + item.salePrice * item.amount;
    }, 0);

    orderEntity.itemRequests = orderItemsEntities;

    orderEntity.totalValue = totalValue;

    const orderCreated = await this.orderRepository.save(orderEntity);
    return orderCreated;
  }

  async getOrdersByUserId(userId: string) {
    await this.findUser(userId);

    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
  }

  async updateOrder(id: string, dto: UpdateOrderDto, userId: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (order === null) {
      throw new NotFoundException('O pedido não foi encontrado.');
    }

    if (order.user.id !== userId) {
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse pedido',
      );
    }

    Object.assign(order, dto as OrderEntity);

    return this.orderRepository.save(order);
  }
}
