import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { RoomService } from 'src/app/core/services/room.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  userId: number = 0;
  rooms: any[] = [];
  bookings: any[] = [];

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || '';
    this.userId = this.authService.getUserId();
    this.loadRoomsAndBookings();
  }

  isSameOrAfter(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() > date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() &&
        (date1.getMonth() > date2.getMonth() ||
          (date1.getMonth() === date2.getMonth() &&
            date1.getDate() >= date2.getDate())))
    );
  }

  isSameOrBefore(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() < date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() &&
        (date1.getMonth() < date2.getMonth() ||
          (date1.getMonth() === date2.getMonth() &&
            date1.getDate() <= date2.getDate())))
    );
  }

  loadRoomsAndBookings(): void {
    this.bookingService.getAllBookings().subscribe((bookings) => {
      this.bookings = bookings;
      console.log('Réservations récupérées :', this.bookings);

      this.roomService.getAllRooms().subscribe((rooms) => {
        console.log('Chambres récupérées :', rooms);

        this.rooms = rooms.map((room) => {
          const activeBooking = this.bookings.find((booking) => {
            if (!booking || !booking.room) return false;

            console.log(
              `Booking ID: ${booking.id}, Booking Room ID: ${booking.room.id}, Room actuel ID: ${room.id}, Status: ${booking.status}`
            );

            // Comparaison souple des IDs (string vs number)
            const sameRoom = booking.room.id == room.id;
            const confirmed = booking.status?.toUpperCase() === 'CONFIRMED';

            return sameRoom && confirmed;
          });

          return {
            ...room,
            available: room.available,
            bookingId: activeBooking ? activeBooking.id : null,
            userId: activeBooking?.user?.id ?? null,
          };
        });

        console.log('Chambres mises à jour :', this.rooms);
      });
    });
  }

  openBookingDialog(room: any): void {
    if (!this.userId) {
      alert('Utilisateur non identifié, veuillez vous reconnecter.');
      return;
    }

    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '400px',
      data: { room: room, userId: this.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRoomsAndBookings();
      }
    });
  }

  cancelBooking(bookingId: number | null): void {
    if (bookingId === null) {
      console.error('bookingId est null, annulation impossible.');
      return;
    }

    if (confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        this.loadRoomsAndBookings();
      });
    }
  }
}
