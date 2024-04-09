import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeEventosService } from '../../services/heroeEventosService';
import Swal from 'sweetalert2'

@Component({
  selector: 'heroe-card',
  templateUrl: './heroe-card.component.html',
})
export class HeroeCardComponent implements OnInit {
  @Input() heroe: any = {};

  @Output() heroeSeleccionado: EventEmitter<string> = new EventEmitter();
  @Output() heroeEliminado: EventEmitter<string> = new EventEmitter();


  constructor(
    private heroesService: HeroesService,
    private heroeEventosService: HeroeEventosService
  ) { }

  ngOnInit(): void { }

  editHeroe() {
    this.heroeSeleccionado.emit(this.heroe.id);
  }

  deleteHeroe() {
    Swal.fire({
      title: "¿Seguro quieres eliminar el heroe?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.eliminarHeroe(this.heroe.id).subscribe({
          next: () => {
            Swal.fire("Heroe borrado!", "", "success");
            this.heroeEventosService.notificarHeroeEliminado(this.heroe.id);
          },
          error: error => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo borrar el heroe!",
            });
          },
        });
        this.heroeEliminado.emit(this.heroe.id);
      }
    });
  }

}
