import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl = 'http://localhost:3000/heroes';

  constructor(
    private http: HttpClient,
  ) { }

  getHeroes(): Promise<Heroe[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Heroe[]>(this.baseUrl)
        .pipe(
          catchError(error => {
            reject(error);
            return [];
          })
        )
        .subscribe(response => {
          resolve(response);
        });
    });
  }

  getHeroeById(heroeId: string): Observable<Heroe> {
    const url = `${this.baseUrl}/${heroeId}`;
    return this.http.get<Heroe>(url);
  }

  agregarHeroe(heroe: Heroe): Observable<any> {
    return this.http.post<any>(this.baseUrl, heroe);
  }

  actualizarHeroe(heroeId: string, heroeActualizado: Heroe): Observable<boolean> {
    const url = `${this.baseUrl}/${heroeId}`;
    return this.http.put<any>(url, heroeActualizado).pipe(
      map(response => true),
      catchError(error => {
        console.error('Error al actualizar el héroe:', error);
        return of(false);
      })
    );
  }

  eliminarHeroe(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  /* Esta deberia ser la forma correcta pero no logre hacerla andar */
  buscarHeroes(txtSearch: string): Promise<Heroe[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Heroe[]>(`${this.baseUrl}?nombre=${txtSearch.toUpperCase()}`)
        .pipe(
          catchError(error => {
            reject(error);
            return [];
          })
        )
        .subscribe(response => {
          resolve(response);
        });
    });
  }

  /* Esta no es la forma correcta pero es la que me logro funcionar */
  buscarHeroesExtra(txtSearch: string): Promise<Heroe[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Heroe[]>(this.baseUrl)
        .pipe(
          catchError(error => {
            reject(error);
            return [];
          })
        )
        .subscribe(response => {
          const heroesFiltrados = response.filter(heroe => {
            return heroe.nombre.toLowerCase().includes(txtSearch.toLowerCase());
          });
          resolve(heroesFiltrados);
        });
    });
  }

}
