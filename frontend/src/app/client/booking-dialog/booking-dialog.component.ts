import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css'],
})
export class BookingDialogComponent implements OnInit {
  bookingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { room: any; userId: number }
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkInDate: [null, Validators.required],
      checkOutDate: [null, Validators.required],
    });
  }

  onConfirm(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    const checkInDate: Date = this.bookingForm.get('checkInDate')!.value;
    const checkOutDate: Date = this.bookingForm.get('checkOutDate')!.value;
    const roomId = this.data.room.id;

    const userId = this.data.userId;

    if (!userId || !roomId) {
      console.log(roomId);
      console.log(!userId);

      alert('Identifiants manquants pour la réservation');
      return;
    }

    // ✅ Conversion au format ISO (YYYY-MM-DD)
    const checkInDateStr = checkInDate.toISOString().split('T')[0];
    const checkOutDateStr = checkOutDate.toISOString().split('T')[0];

    this.bookingService
      .createBooking(userId, roomId, checkInDateStr, checkOutDateStr)
      .subscribe({
        next: () => {
          alert('Réservation confirmée');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erreur lors de la réservation', err);
          alert('Erreur lors de la réservation');
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
