import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn = false; // à remplacer ensuite par un vrai AuthService
  role: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Ex : vérifier localStorage ou un service plus tard
    this.isLoggedIn = !!localStorage.getItem('token');
    this.role = this.authService.getUserRole() || '';
  }
  logout() {
    localStorage.removeItem('token'); // ou appeler AuthService.logout()
    this.isLoggedIn = false;
    this.router.navigate(['/']); // ou via Router
  }
  openConnexionDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
