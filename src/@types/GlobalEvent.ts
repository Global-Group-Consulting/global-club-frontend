export interface GlobalEvent {
  _id: string;
  title: string;
  content: string;
  coverImg: string;
  coverImgUrl: string;
  startAt: string;
  seats: number;
  remainingSeats: number;
  active: boolean;
  bookable: boolean;
  city: string;
  place: string;
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
  passUrl?: string;
}

export interface UpsertEventReservationDto {
  userId: number;
  status: 'pending' | 'accepted' | 'rejected';
  companions: { firstName: string; lastName: string }[];
  
}
