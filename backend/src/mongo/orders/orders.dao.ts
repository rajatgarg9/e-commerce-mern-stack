import { Document } from 'mongoose';

import { ISinglBaseOrder } from '@src/orders/interfaces';

export interface IOrderDao extends ISinglBaseOrder, Document {
  readonly id: string;
  readonly userId: string;
}
