import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from 'src/app/client/user-edit-dialog/user-edit-dialog.component';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;

      this.users.forEach((user) => {
        console.log(user.name);
        console.log(user);

        console.log(`Utilisateur : ${user.name}`);
        console.log('Bookings :', user.bookings);
      });
    });
  }

  editUser(user: User) {
    console.log('user complet envoyé au dialog:', user);
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((updated: User | undefined) => {
      if (updated) {
        this.userService
          .updateUser(updated.id, updated)
          .subscribe(() => this.loadUsers());
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}
