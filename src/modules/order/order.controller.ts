import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { OrderService } from './order.service';

import { AuthGuard } from '../auth/auth.guard';
import { UserRequest } from '../auth/auth.interfaces';

import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Req() req: UserRequest,
    @Body() orderData: CreateOrderDTO,
  ) {
    const userId = req.user.sub;
    const orderCreated = await this.orderService.registersRequest(
      userId,
      orderData,
    );

    return {
      mensagem: 'Pedido feito com sucesso.',
      order: orderCreated,
    };
  }

  @Get()
  async getUserOrders(@Req() req: UserRequest) {
    const userId = req.user.sub;
    const orders = await this.orderService.getOrdersByUserId(userId);

    return {
      mensagem: 'Pedidos obtidos com sucesso.',
      orders,
    };
  }

  @Patch(':id')
  async atualizaPedido(
    @Req() req: UserRequest,
    @Param('id') orderId: string,
    @Body() updateData: UpdateOrderDto,
  ) {
    const userId = req.user.sub;
    const orderUpdated = await this.orderService.updateOrder(
      orderId,
      updateData,
      userId,
    );

    return orderUpdated;
  }
}
