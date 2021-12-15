import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { PRODUCTS_COLLECTION } from '@src/mongo/products/products.collection';

@Module({
  imports: [MongooseModule.forFeature([PRODUCTS_COLLECTION])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
