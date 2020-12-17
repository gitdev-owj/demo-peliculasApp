import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';

const routes: Routes = [
   {path: 'home', component: HomeComponent },
   {path: 'pelicula/:id', component: PeliculasComponent},
   {path: 'buscar/:texto', component: BuscarComponent},
   {path: '**', redirectTo: '/home'}

];


@NgModule({
 imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
