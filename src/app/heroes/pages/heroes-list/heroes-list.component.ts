import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { LoadingService } from '../../services/loading-service.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
})
export class HeroesListComponent implements OnInit {
  loading: boolean;
  heroes: Heroe[] = [];
  private loadingSubscription: Subscription;

  constructor(
    private heroesServices: HeroesService,
    private router: Router,
    private loadingService: LoadingService,
  ) { 
    this.loadingSubscription = this.loadingService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit() {
    this.getHeroesList();
  }
  
  async getHeroesList(): Promise<void> {
    this.loadingService.showLoading();
    try {
      this.heroesServices.getHeroes().subscribe((heroes: Heroe[]) => {
        this.heroes = heroes;
      }, (error) => {
        console.warn("Ocurrió un error al obtener el listado", error);
      }, () => {
        this.loadingService.hideLoading();
      });
    } catch (err) {
      console.warn("Ocurrió un error al obtener el listado", err);
      this.loadingService.hideLoading();
    }
  }

  

  async searchByHeroes(txtSearch: string): Promise<void> {
    if (txtSearch === '') {
      this.getHeroesList();
    } else {
      try {
        const heroesFiltrados = await this.heroesServices.buscarHeroesExtra(txtSearch);
        this.heroes = heroesFiltrados;
      } catch (error) {
        console.error('Error al buscar héroes:', error);
      }
    }
  }

  onHeroeSeleccionado(id: string) {
    this.router.navigate(['/heroes/new', id]);
  }

  onHeroeEliminado(id: string) {
    this.getHeroesList();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
