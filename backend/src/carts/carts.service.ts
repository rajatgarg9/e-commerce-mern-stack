import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsService } from '@src/products/products.service';

import { CARTS_COLLECTION } from '@src/mongo/carts/carts.collection';
import { ICartDao } from '@src/mongo/carts/carts.dao';

import { IAddProductDto } from '@src/carts/dto';

import { ICartResponse } from '@src/carts/interfaces';

import { PRODUCT_OUT_OF_STOCK } from '@src/carts/utilities/message';

import { getFormattedCartResponse } from '@src/carts/utilities/methods';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(CARTS_COLLECTION.name) private cartsModel: Model<ICartDao>,
    private readonly productsService: ProductsService,
  ) {}
  async getCart(userId: string): Promise<ICartResponse> {
    let cart = await this.cartsModel.findOne({ userId });

    if (!cart) {
      cart = await this.createCart(userId);
    }

    const cartWithProductPopulate = await cart.populate('products.id');

    const cartWithSellerPopulate = await cartWithProductPopulate.populate(
      'products.id.sellerId',
    );

    const products = cart?.products;

    const newProducts = [];
    let isProductListUpdatetd = false;

    for (let i = 0; i < products?.length; ++i) {
      if (cartWithProductPopulate?.products[i]?.id) {
        newProducts.push(products[i]);
      } else {
        isProductListUpdatetd = true;
      }
    }

    cart.products = newProducts as any;

    if (isProductListUpdatetd) {
      await cart.save();
    }

    return getFormattedCartResponse(cartWithSellerPopulate);
  }

  async createCart(userId: string) {
    const cart = await this.cartsModel.create({
      userId,
      products: [],
    });

    return cart;
  }

  async addProduct(
    addProductDto: IAddProductDto,
    productId: string,
    userId: string,
  ): Promise<ICartResponse> {
    if (!(await this.productsService.isProductInStock(productId))) {
      throw new NotFoundException(PRODUCT_OUT_OF_STOCK);
    }

    let cart = await this.cartsModel.findOne({ userId });

    if (!cart) {
      cart = await this.createCart(userId);
    }
    const products = cart?.products;
    let isProductAlreadyExist = false;

    for (let i = 0; i < products.length; ++i) {
      if (products[i].id.toString() === productId) {
        isProductAlreadyExist = true;
        products[i].selectedQuantity = addProductDto.selectedQuantity;
      }
    }

    if (!isProductAlreadyExist) {
      products.push({
        id: productId,
        selectedQuantity: addProductDto.selectedQuantity,
      } as any);
    }

    cart.lastUpdatedAt = new Date();

    const cartWithProductPopulate = await cart.populate('products.id');

    const cartWithSellerPopulate = await cartWithProductPopulate.populate(
      'products.id.sellerId',
    );

    const newProducts = [];

    for (let i = 0; i < products?.length; ++i) {
      if (cartWithProductPopulate?.products[i]?.id) {
        newProducts.push(products[i]);
      }
    }

    cart.products = newProducts as any;

    await cart.save();

    return getFormattedCartResponse(cartWithSellerPopulate);
  }

  async emptyCart(userId: string): Promise<ICartResponse> {
    let cart = await this.cartsModel.findOne({ userId });

    if (!cart) {
      cart = await this.createCart(userId);
    }
    cart.delete;

    cart.products = [] as any;

    await cart.save();

    return this.getCart(userId);
  }
}
