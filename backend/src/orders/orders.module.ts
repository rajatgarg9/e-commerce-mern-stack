import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

import { CartsModule } from '@src/carts/carts.module';
import { ProductsModule } from '@src/products/products.module';

import { ORDERS_COLLECTION } from '@src/mongo/orders/orders.collection';

@Module({
  imports: [
    MongooseModule.forFeature([ORDERS_COLLECTION]),
    ProductsModule,
    CartsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
