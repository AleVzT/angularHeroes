import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe';
import Swal from 'sweetalert2'

@Component({
  selector: 'page-heroe-form',
  templateUrl: './heroe-form.component.html',
  styleUrl: './heroe-form.component.css'
})
export class HeroeFormComponent implements OnInit {
  @Input() heroeId: string;
  public formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      poder: ['', Validators.required],
      imageUrl: ['', Validators.required],
      aliados: ['', Validators.required],
      debilidad: ['', Validators.required]
    });

    if (this.heroeId) {
      this.heroesService.getHeroeById(this.heroeId).subscribe((heroe: Heroe) => {
        this.formulario.patchValue(heroe);
      });
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      if(typeof this.formulario.value.aliados === 'string'){
        const aliadosArray = this.formulario.value.aliados.split(',').map(item => item.trim());
        this.formulario.patchValue({ aliados: aliadosArray });
      }
      if(this.heroeId) {
        this.heroesService.actualizarHeroe(this.heroeId, this.formulario.value).subscribe(result => {
          if (result) {
            Swal.fire("Heroe modificado!", "", "success");
            this.router.navigate(['/heroes']);
          } else {
            Swal.fire("Error al actualizar el héroe!", "", "error");
          }
        });
      } else {
        this.heroesService.agregarHeroe(this.formulario.value)
          .subscribe(
            {
              next: response => this.router.navigate(['/heroes']),
              error: error => {
                Swal.fire("Error al crear el heroe!", "", "error");
              }
        });
      }
    }
  }


}
