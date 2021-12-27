import { UserBasic } from '@/@types/User';
import { Attachment } from '@/@types/Attachment';
import { MessageTypeEnum } from '@/@enums/message.type.enum';
import { OrderStatusEnum } from '@/@enums/order.status.enum';

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
  };
  
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationAnswerDto {
  message: "";
  attachments?: Attachment[];
}

