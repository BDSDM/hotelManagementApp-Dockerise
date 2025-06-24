import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Accueil public avec Layout général
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule),
      },
    ],
  },

  // Routes client sécurisées
  {
    path: 'client-secure',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule),
      },
    ],
  },

  // Routes admin sécurisées
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },

  // Module d'authentification (login/register/reset) avec LayoutComponent ici
  {
    path: 'auth',
    component: LayoutComponent, // <-- ajouté ici
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // Redirection pour toute route inconnue
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
