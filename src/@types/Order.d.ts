import { User, UserBasic } from '@/@types/User';
import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { Communication } from '@/@types/Communication';
import { Product } from '@/@types/Product';
import { Attachment } from '@/@types/Attachment';

export interface Order {
  user: UserBasic;
  products: OrderProduct[];
  amount: number;
  communication: Communication;
  status: OrderStatusEnum;
  notes: string;
  cancelReason?: string;
  
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProduct {
  product: Product;
  
  qta: number;
  
  /*
  Store the product price so if it changes in the meanwhile, we have a reference for the original price,
  the one user saw when adding the product to the cart
   */
  price: number;
  
  repayment: boolean;
}

export interface ReadOrderStatusesDto {
  _id: OrderStatusEnum;
  count: number;
  unreadCount: number;
}

export interface UpdateOrderProductDto {
  qta: number;
  price: number;
  repayment?: boolean;
}

export interface UpdateOrderStatusDto {
  status: OrderStatusEnum;
  reason?: string;
}
