import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  peliculas: Movie[] = [];
  peliculasSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max ) {

        if (this.peliculasServices.cargando) { return; }

        this.peliculasServices.getCartelera().subscribe(movies => {
        this.peliculas.push(...movies);
      });
    }
  }

  constructor(private peliculasServices: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasServices.getCartelera()
    .subscribe( movies => {
     // console.log(rsp);
      this.peliculas = movies;
      this.peliculasSlideShow = movies;
    } );

  }

  ngOnDestroy() {
    this.peliculasServices.resetCarteleraPage();
  }

}
