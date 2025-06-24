export interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  room: {
    number: string;
    type: string;
    price: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  bookings?: Booking[];
}
