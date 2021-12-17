import { Controller, Get, Post, Req, Body } from '@nestjs/common';

import { OrdersService } from '@src/orders/orders.service';

import { ISinglBaseOrder } from '@src/orders/interfaces';

import { CreateOrderDto } from '@src/orders/dto';

import { IRequest } from '@src/interfaces';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  async getAllOrders(@Req() req: IRequest): Promise<ISinglBaseOrder[]> {
    const { user } = req || {};
    return this.ordersService.getAllOrders(user?.id);
  }
  @Post('/order')
  async createOrder(
    @Req() req: IRequest,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<ISinglBaseOrder> {
    const { user } = req || {};
    return this.ordersService.createOrder(user?.id, createOrderDto);
  }
}
