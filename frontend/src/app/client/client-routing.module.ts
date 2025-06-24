import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms.component';
import { RoomsGuard } from '../core/guards/rooms.guard';
import { HomeGuard } from '../core/guards/home.guard';
import { WindowGuard } from '../core/guards/window.guard';

const routes: Routes = [
  { path: 'rooms', component: RoomsComponent, canActivate: [RoomsGuard] },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
