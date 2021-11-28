import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { IProductResponse } from '@src/products/interfaces';

import { CreateProductDTO, PatchProductDTO } from '@src/products/dto';

import { DisableAuthDecorator } from '@src/auth/decorators/disable-auth.decorator';

import { IRequest } from '@src/interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @DisableAuthDecorator()
  async getAllProducts(): Promise<IProductResponse[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') id): Promise<IProductResponse> {
    return this.productsService.getProduct(id);
  }

  @Post('/product')
  async createProduct(
    @Body() createProductDTO: CreateProductDTO,
    @Req() req: IRequest,
  ): Promise<IProductResponse> {
    const { user } = req;

    return this.productsService.createProduct(createProductDTO, user.id);
  }

  @Patch('/:id')
  async patchProduct(
    @Body() patchProductDTO: PatchProductDTO,
    @Req() req: IRequest,
    @Param('id') id,
  ): Promise<IProductResponse> {
    const { user } = req;

    return this.productsService.patchProduct(patchProductDTO, id, user.id);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id, @Req() req: IRequest): Promise<void> {
    const { user } = req;

    return this.productsService.deleteProduct(id, user.id);
  }
}
