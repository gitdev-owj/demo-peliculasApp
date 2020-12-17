import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public peliculas: Movie[] = [];
  public valorBuscado = '';

  constructor(private activateRoute: ActivatedRoute , 
              private  peliculasService: PeliculasService ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      console.log( params );
      this.valorBuscado = params.texto;
      this.peliculasService.buscarPeliculas( params.texto )
     .subscribe ( movies => {
       //console.log(movies);
       this.peliculas = movies;
     });
    });
  }

}
