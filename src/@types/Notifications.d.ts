import { User } from '@/@types/User'

export interface NotificationData {
  title: string;
  content: string;
  app: string;
  type: string;
  platforms: string[];
  extraData: any;
  receiver: Pick<User, '_id' | 'firstName' | 'lastName' | 'email'>;
}

export interface Notification {
  _id: string;
  id: string;
  type: string;
  data: NotificationData;
  read_at: string | null;
  notifiable_id: string;
  notifiable_type: string;
  updated_at: string;
  created_at: string;
}
