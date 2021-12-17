import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsService } from '@src/products/products.service';
import { CartsService } from '@src/carts/carts.service';

import { ORDERS_COLLECTION } from '@src/mongo/orders/orders.collection';
import { IOrderDao } from '@src/mongo/orders/orders.dao';

import { ISinglBaseOrder } from '@src/orders/interfaces';

import { EMPTY_CART } from '@src/orders/utilities/message';
import { getFormattedOrder } from '@src/orders/utilities/methods';

import { CreateOrderDto } from '@src/orders/dto';

import { SOMETHING_WENT_WRONG } from '@src/utilities/message';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ORDERS_COLLECTION.name)
    private readonly orderModel: Model<IOrderDao>,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
  ) {}

  async getAllOrders(userId: string): Promise<ISinglBaseOrder[]> {
    const orderList = await this.orderModel.find({ userId });

    return orderList?.map((item) => getFormattedOrder(item));
  }

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<ISinglBaseOrder> {
    const cart = await this.cartsService.getCart(userId);
    const cartProducts = cart.products;
    if (cartProducts?.length === 0) {
      throw new NotFoundException(EMPTY_CART);
    }
    const bulkUpdateInputData: {
      productId: string;
      purchasedQuantity: number;
    }[] = [];
    const orderProductList: IOrderDao['products'] = [];
    const outofStockProducts: string[] = [];
    const totalPrice = {
      amount: 0,
      currency: '',
    };

    for (let i = 0; i < cartProducts.length; ++i) {
      const {
        availableQuantity,
        selectedQuantity,
        name,
        id,
        imageUrl,
        price,
        seller,
      } = cartProducts[i];

      totalPrice.amount += price?.amount * selectedQuantity;
      totalPrice.currency = price?.currency;

      bulkUpdateInputData.push({
        productId: id,
        purchasedQuantity: selectedQuantity,
      });

      orderProductList.push({
        id,
        name,
        imageUrl,
        price,
        purchasedQuantity: selectedQuantity,
        seller,
      });

      if (availableQuantity < selectedQuantity) {
        outofStockProducts.push(name);
      }
    }
    if (outofStockProducts.length > 0) {
      throw new NotFoundException(
        `${outofStockProducts.toString()} are out of stocks`,
      );
    }

    const bulkWriteResult = await this.productsService.updatePurchasedProducts(
      bulkUpdateInputData,
    );

    if (bulkWriteResult.nModified !== bulkUpdateInputData.length) {
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }

    await this.cartsService.emptyCart(userId);

    const { address } = createOrderDto;

    const order = await this.orderModel.create({
      userId,
      products: orderProductList,
      paid: totalPrice,
      address,
    });

    return getFormattedOrder(order);
  }
}
