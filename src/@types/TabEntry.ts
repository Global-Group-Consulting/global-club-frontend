export interface TabEntry {
  id: string;
  text: string;
  count?: number;
  unreadCount?: number;
  if?: boolean;
  data?: any;
  buttons?: any[];
}
