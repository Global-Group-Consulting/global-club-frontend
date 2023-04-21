export interface GlobalEvent {
  _id: string;
  title: string;
  content: string;
  coverImg: string;
  coverImgUrl: string;
  startAt: string;
  seats: number;
  reservedSeats: number;
}

export interface GlobalEventReservation {
  _id: string;
  eventId: string;
  userId: string;
  user?: any;
  status: 'pending' | 'accepted' | 'rejected';
  statusUpdatedAt: string;
  companions: { firstName: string; lastName: string }[];
  created_at: string;
  updated_at: string;
}

export interface UpsertEventReservationDto {
  userId: number;
  status: 'pending' | 'accepted' | 'rejected';
  companions: { firstName: string; lastName: string }[];
  
}
