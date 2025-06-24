import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from 'src/app/core/models/room.model';
import { RoomService } from 'src/app/core/services/room.service';
import { RoomDialogComponent } from './room-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  openDialog(room?: Room): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '400px',
      data: room ? { ...room } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.roomService.updateRoom(result).subscribe(() => {
            this.snackBar.open('Chambre mise à jour', 'Fermer', {
              duration: 3000,
            });
            this.getRooms();
          });
        } else {
          this.roomService.addRoom(result).subscribe(() => {
            this.snackBar.open('Chambre ajoutée', 'Fermer', { duration: 3000 });
            this.getRooms();
          });
        }
      }
    });
  }

  deleteRoom(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette chambre ?')) {
      this.roomService.deleteRoom(id).subscribe(() => {
        this.snackBar.open('Chambre supprimée', 'Fermer', { duration: 3000 });
        this.getRooms();
      });
    }
  }
}
