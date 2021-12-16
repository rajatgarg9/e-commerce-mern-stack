import { Controller, Get, Post, Req } from '@nestjs/common';

import { OrdersService } from '@src/orders/orders.service';

import { ISinglBaseOrder } from '@src/orders/interfaces';

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
  async createOrder(@Req() req: IRequest): Promise<ISinglBaseOrder> {
    const { user } = req || {};
    return this.ordersService.createOrder(user?.id);
  }
}
