import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroeEventosService {
  private heroeEliminadoSubject = new Subject<string>();
  heroeEliminado$ = this.heroeEliminadoSubject.asObservable();

  notificarHeroeEliminado(id: string) {
    this.heroeEliminadoSubject.next(id);
  }
}
