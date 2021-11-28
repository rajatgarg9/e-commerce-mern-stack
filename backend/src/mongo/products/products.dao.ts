import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

import { IBaseProduct } from '@src/products/interfaces';
export interface IProductDao extends Document, IBaseProduct {
  readonly id: string;
  sellerId: typeof ObjectID;
}
