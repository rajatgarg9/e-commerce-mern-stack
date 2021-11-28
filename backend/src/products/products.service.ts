import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';

import { PRODUCTS_COLLECTION } from '@src/mongo/products/products.collection';

import { IProductDao } from '@src/mongo/products/products.dao';

import { CreateProductDTO, PatchProductDTO } from '@src/products/dto';

import { IProductResponse } from '@src/products/interfaces';

import { IUserDao } from '@src/mongo/users/users.dao';

import { getFormattedProductForResponse } from '@src/products/utilities/methods';
import {
  PRODUCT_NOT_FOUND,
  PRODUCT_WRONG_OWNER,
} from '@src/products/utilities/message';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCTS_COLLECTION.name)
    private productModel: Model<IProductDao>,
  ) {}

  async getAllProducts(): Promise<IProductResponse[]> {
    const productList = await this.productModel.find()?.populate<{
      sellerId: IUserDao;
    }>('sellerId');

    return productList?.map((item) => getFormattedProductForResponse(item));
  }

  async patchProduct(
    patchProductDTO: PatchProductDTO,
    productId: string,
    userId: string,
  ): Promise<IProductResponse> {
    if (!MongooseTypes.ObjectId.isValid(productId)) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }

    const product = await this.productModel.findOne({ _id: productId });

    if (!product) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }

    if (product.sellerId.toString() !== userId) {
      throw new BadRequestException(PRODUCT_WRONG_OWNER);
    }

    const { name, price, imageUrl, availableQuantity } = patchProductDTO;

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (imageUrl) {
      product.imageUrl = imageUrl;
    }

    if (availableQuantity) {
      product.availableQuantity = availableQuantity;
    }

    await product.save();

    const populatedProduct = await product?.populate<{ sellerId: IUserDao }>(
      'sellerId',
    );

    return getFormattedProductForResponse(populatedProduct);
  }

  async getProduct(productId: string): Promise<IProductResponse> {
    if (!MongooseTypes.ObjectId.isValid(productId)) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }

    const product = await this.productModel
      .findOne({ _id: productId })
      ?.populate<{ sellerId: IUserDao }>('sellerId');

    if (!product) {
      throw new BadRequestException(PRODUCT_NOT_FOUND);
    }

    return getFormattedProductForResponse(product);
  }

  async createProduct(
    createProductDTO: CreateProductDTO,
    userId: string,
  ): Promise<IProductResponse> {
    const product = await (
      await this.productModel.create({
        ...createProductDTO,
        sellerId: userId,
      })
    ).populate<{ sellerId: IUserDao }>('sellerId');

    return getFormattedProductForResponse(product);
  }

  async deleteProduct(productId: string, userId: string): Promise<void> {
    const product = await this.getProduct(productId);

    if (product.seller.id !== userId) {
      throw new BadRequestException(PRODUCT_WRONG_OWNER);
    }

    await this.productModel.deleteOne({
      _id: productId,
    });
  }
}
