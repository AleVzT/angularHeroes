import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HeroeEventosService } from './heroeEventosService';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl = 'http://localhost:3000/heroes';

  constructor(
    private http: HttpClient,
    private heroeEventosService: HeroeEventosService
  ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error al obtener los héroes:', error);
        return throwError(() => error);
      })
    );
  }

  getHeroeById(heroeId: string): Observable<Heroe> {
    const url = `${this.baseUrl}/${heroeId}`;
    return this.http.get<Heroe>(url);
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
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.heroeEventosService.notificarHeroeEliminado(id);
      }),
      catchError(error => {
        console.error('Error al eliminar el héroe:', error);
        return throwError(() => error);
      })
    );
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

  private verificarNombreRepetido(nombre: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}?nombre=${nombre}`).pipe(
      catchError(error => {
        return throwError(() => new Error('Error al obtener la lista de héroes'));
      }),
      map(heroes => {
        if (heroes && heroes.length > 0) {
          throw new Error('Ya existe un héroe con el mismo nombre');
        }
      })
    );
  }

  agregarHeroe(heroe: Heroe): Observable<any> {
    return this.verificarNombreRepetido(heroe.nombre).pipe(
      switchMap(() => {
        return this.http.post<any>(this.baseUrl, heroe).pipe(
          map(() => ({ agregado: true })),
          catchError(() => {
            return of({ agregado: false, motivo: 'Error al agregar el héroe' });
          })
        );
      }),
      catchError(() => {
        return of({ agregado: false, motivo: 'Ya existe un héroe con el mismo nombre' });
      })
    );
  }

}
