import { UserBasic } from '@/@types/User';
import { Attachment } from '@/@types/Attachment';
import { MessageTypeEnum } from '@/@enums/message.type.enum';
import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { OrderProduct } from '@/@types/Order';
import { Product } from '@/@types/Product';

export interface Communication {
  type: string;
  /* Array of messages */
  messages: Message[];
  title: string;
  // All communications from this application will have CLUB as client value
  client: string;
  initiator: UserBasic;
  receivers: UserBasic[];
  watchers: UserBasic[];
  
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  sender: UserBasic;
  attachments: Attachment[];
  content: string;
  type: MessageTypeEnum;
  data?: {
    orderStatus?: OrderStatusEnum;
    productUpdate?: {
      product: Pick<Product, "_id" | "title">;
      diff: any;
      originalData: Partial<OrderProduct>;
    };
    orderProducts?: {
      qta: number;
      price: number;
      product: {
        _id: any;
        title: string;
      };
    }[];
    packChange?: any;
  };
  
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationAnswerDto {
  message: "";
  attachments?: Attachment[];
}

