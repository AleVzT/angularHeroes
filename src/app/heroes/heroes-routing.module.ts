import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { HeroeNewComponent } from './pages/heroe-new/heroe-new.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesListComponent
  },
  {
    path: 'new/:id',
    component: HeroeNewComponent
  },
  {
    path: 'new',
    component: HeroeNewComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }