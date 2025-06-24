import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RequestResetPasswordComponent } from './request-reset-password.component';
import { ResetRequestPasswordComponent } from './reset-request-password/reset-request-password.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RequestResetPasswordComponent,
    ResetRequestPasswordComponent,
    ConfirmResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class AuthModule {}
