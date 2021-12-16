import { ISinglBaseOrder } from '@src/orders/interfaces';
import { IOrderDao } from '@src/mongo/orders/orders.dao';

export function getFormattedOrder(order: IOrderDao): ISinglBaseOrder {
  const formattedOrder = { ...order.toObject() };
  formattedOrder.id = formattedOrder._id;
  delete formattedOrder.userId;
  delete formattedOrder._id;
  delete formattedOrder.__v;

  return formattedOrder;
}
