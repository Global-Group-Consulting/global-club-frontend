import { User, UserBasic } from '@/@types/User';
import { OrderStatusEnum } from '@/@enums/order.status.enum';

export interface Order {
  user: UserBasic;
  products: OrderProduct[];
  amount: number;
  communication: any; //Communication;
  status: OrderStatusEnum;
  
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProduct {
  product: string;
  
  qta: number;
  
  /*
  Store the product price so if it changes in the meanwhile, we have a reference for the original price,
  the one user saw when adding the product to the cart
   */
  price: number;
}
