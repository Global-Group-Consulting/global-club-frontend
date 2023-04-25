import { bool } from 'yup'

export interface TabEntry {
  id: string;
  text: string;
  count?: number;
  unreadCount?: number;
  if?: boolean;
  data?: any;
  expired?: boolean;
  buttons?: any[];
  reloadAsap?: boolean;
}
