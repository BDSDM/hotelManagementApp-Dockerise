import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  room: {
    id: number;
  };
  user: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) {}

  createBooking(
    userId: number,
    roomId: number,
    checkInDate: string,
    checkOutDate: string
  ): Observable<Booking> {
    const url = `${
      this.baseUrl
    }/create/${userId}/${roomId}/${encodeURIComponent(
      checkInDate
    )}/${encodeURIComponent(checkOutDate)}`;
    return this.http.post<Booking>(url, null); // Pas besoin de corps
  }
  cancelBooking(bookingId: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/cancel/${bookingId}`, null, {
      responseType: 'text',
    });
  }
  // ✅ Nouvelle méthode pour récupérer les réservations d’un utilisateur
  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${userId}`);
  }
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
