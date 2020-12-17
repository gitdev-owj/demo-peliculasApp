import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of  } from 'rxjs';
import { tap , map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetailsResponse } from '../interfaces/pelicula-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor(private http: HttpClient) { }
  
  get params(){
    return {
      api_key: '8e2b0a5ebc529b98993c137530d87ba6',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<Movie[]>{

    if (this.cargando) {
      // cargando peliculas 
      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
     params: this.params
     }).pipe(
       map( (resp) => resp.results ),
     tap( () => {
       this.carteleraPage += 1;
       this.cargando = false;
     })
   );
  }


  buscarPeliculas( texto: string ): Observable<Movie[]> {
    const params = {...this.params, page: '1' , query : texto }
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    );
  }
  resetCarteleraPage() {
    this.carteleraPage = 1; 
  }

  getPeliculaDetalle(id: string){

    return this.http.get<MovieDetailsResponse>(`${ this.baseUrl }/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  }

  getCreditosPelicula(id: string): Observable<Cast[]>{

    return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${id}/credits`, {
      params: this.params
    }).pipe(
       map( resp => resp.cast),
       catchError( err => of([]))
    );
  }

}
