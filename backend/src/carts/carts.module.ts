import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';

import { ProductsModule } from '@src/products/products.module';

import { CARTS_COLLECTION } from '@src/mongo/carts/carts.collection';

@Module({
  imports: [MongooseModule.forFeature([CARTS_COLLECTION]), ProductsModule],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
