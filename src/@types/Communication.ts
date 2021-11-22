import { UserBasic } from '@/@types/User';
import { Attachment } from '@/@types/Attachment';

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
  
  _id: string;
  createdAt: string;
  updatedAt: string;
}
