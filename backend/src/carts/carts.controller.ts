import { Controller, Get, Post, Body, Param, Req, Put } from '@nestjs/common';

import { CartsService } from '@src/carts/carts.service';

import { IAddProductDto } from '@src/carts/dto';

import { ICartResponse } from '@src/carts/interfaces';

import { IRequest } from '@src/interfaces';

@Controller('users/@me/cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/')
  async getCart(@Req() req: IRequest): Promise<ICartResponse> {
    const { user } = req || {};
    return this.cartsService.getCart(user?.id);
  }

  @Post('/:productId')
  async addProduct(
    @Body() addProductDto: IAddProductDto,
    @Param('productId') productId: string,
    @Req() req: IRequest,
  ): Promise<ICartResponse> {
    const { user } = req || {};
    return this.cartsService.addProduct(addProductDto, productId, user?.id);
  }

  @Put('/empty-cart')
  async emptyCart(@Req() req: IRequest): Promise<void> {
    const { user } = req || {};
    return this.cartsService.emptyCart(user?.id);
  }
}
