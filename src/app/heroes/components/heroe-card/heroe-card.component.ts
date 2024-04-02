import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrl: './heroe-card.component.css'
})
export class HeroeCardComponent implements OnInit {
  @Input() heroe: any = {};

  @Output() heroeSeleccionado: EventEmitter<number> = new EventEmitter();
  @Output() refreshList: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router,
    private heroesService: HeroesService,
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
            this.refreshList.emit(true);
          },
          error: error => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo borrar el heroe!",
            });
          }
        });
      }
    });
  }

}
