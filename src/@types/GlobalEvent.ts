export interface GlobalEvent {
  _id: string;
  title: string;
  content: string;
  coverImg: string;
  coverImgUrl: string;
  startAt: string;
  seats: number;
}

export interface GlobalEventReservation {
  _id: string;
  eventId: string;
  userId: string;
  user?: any;
  status: 'pending' | 'accepted' | 'rejected';
  users: any[];
}

export interface UpsertEventReservationDto {
  userId: number;
  status: 'pending' | 'accepted' | 'rejected';
  companions: { firstName: string; lastName: string }[];
  
}
