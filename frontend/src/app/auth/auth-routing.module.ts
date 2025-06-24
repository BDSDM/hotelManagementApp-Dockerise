import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';

const routes: Routes = [
  { path: 'reset-password', component: ConfirmResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
