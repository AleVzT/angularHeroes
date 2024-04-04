import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { HeroeCardComponent } from './components/heroe-card/heroe-card.component';
import { HeroeFormComponent } from './components/heroe-form/heroe-form.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { HeroeNewComponent } from './pages/heroe-new/heroe-new.component';
import { UpperCaseDirective } from './directive/upper-case.directive';



@NgModule({
  declarations: [
    HeroeCardComponent,
    HeroeFormComponent,
    HeroesListComponent,
    HeroeNewComponent,
    UpperCaseDirective,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class HeroesModule { }
