import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then((m) => m.RegistroPageModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundPageModule),
  },
  {
    path: 'crear-presupuesto',
    loadChildren: () =>
      import('./crear-presupuesto/crear-presupuesto.module').then((m) => m.CrearPresupuestoPageModule),
  },
  {
    path: 'ver-presupuesto',
    loadChildren: () => import('./ver-presupuesto/ver-presupuesto.module').then((m) => m.VerPresupuestoPageModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
