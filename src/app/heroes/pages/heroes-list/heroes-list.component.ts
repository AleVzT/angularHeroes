import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { LoadingService } from '../../services/loading-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
      this.heroes = await this.heroesServices.getHeroes();
    } catch (err) {
      console.warn("Ocurrio un al obtener el listado", err);
    } finally {
      this.loadingService.hideLoading();
    }
  }

  async searchByHeroes( txtSearch: string): Promise<void> {
    if(txtSearch === '') {
      this.getHeroesList();
    }
    this.heroes = await this.heroesServices.buscarHeroesExtra(txtSearch);
  }

  onRefreshList(refresh: boolean) {
    if (refresh) {
      this.getHeroesList();
    }
  }

  onHeroeSeleccionado(id: number) {
    this.router.navigate(['/heroes/new', id]);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
