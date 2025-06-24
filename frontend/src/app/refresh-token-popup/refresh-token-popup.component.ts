import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-refresh-token-popup',
  templateUrl: './refresh-token-popup.component.html',
})
export class RefreshTokenPopupComponent {
  constructor(
    private dialogRef: MatDialogRef<RefreshTokenPopupComponent>,
    private authService: AuthService
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // On retourne "true" = utilisateur a cliqué "Oui"
  }

  onCancel(): void {
    this.dialogRef.close(false); // On retourne "false" = utilisateur a cliqué "Non"
    this.logout();
  }
  logout() {
    this.authService.logout();
  }
}
