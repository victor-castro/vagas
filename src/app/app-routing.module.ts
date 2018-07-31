import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':code',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: '**',
    loadChildren: './pages/home/home.module#HomeModule'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }