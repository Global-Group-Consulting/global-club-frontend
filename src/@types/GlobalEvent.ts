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
  isPast: boolean;
}

export interface GlobalEventReservation {
  _id: string;
  eventId: string;
  userId: string;
  user?: any;
  status: 'pending' | 'accepted' | 'rejected';
  statusUpdatedAt: string;
  companions: { firstName: string; lastName: string; email: string; passCode: string; passUrl: string; passQr: string }[];
  created_at: string;
  updated_at: string;
  passUrl?: string;
  passQr?: string;
  passCode?: string;
}

export interface UpsertEventReservationDto {
  userId: number;
  userName: string;
  guestUser: boolean;
  email: string;
  referenceAgent: string;
  status: 'pending' | 'accepted' | 'rejected';
  companions: { firstName: string; lastName: string; email: string }[];
}

export interface EventPass {
  passCode?: string;
  passUrl?: string;
  passQr?: string;
  firstName: string;
  lastName: string;
  email: string;
  isCompanion?: boolean;
}
