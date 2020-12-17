import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetailsResponse } from '../../interfaces/pelicula-response';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  public pelicula: MovieDetailsResponse;
  totalstar = 10;
  public cast: Cast[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
   const id  = this.activateRoute.snapshot.params.id;

   combineLatest([
    this.peliculasService.getPeliculaDetalle(id),
    this.peliculasService.getCreditosPelicula( id )
   ]).subscribe( ([pelicula, cast]) => {

    if (!pelicula){
      this.router.navigateByUrl('/home');
      return;
   }
    this.pelicula = pelicula;
    this.cast = cast.filter(actor  => actor.profile_path != null);
   });

  /* this.peliculasService.getPeliculaDetalle(id).subscribe(pelicula => {
     if (!pelicula){
        this.router.navigateByUrl('/home');
       return;
     }
     this.pelicula = pelicula;
   });

   this.peliculasService.getCreditosPelicula( id ).subscribe( cast => {
   //  console.log(cast);
     this.cast = cast.filter(actor  => actor.profile_path != null);
   } );
  }*/
  }

   // tslint:disable-next-line: typedef
  onRegresar() {
   this.location.back();
  }

}
