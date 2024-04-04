import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe-new',
  templateUrl: './heroe-new.component.html',
})
export class HeroeNewComponent implements OnInit {
  heroeId: string;
  title = 'Nuevo heroe';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.heroeId = params['id'] ?? null;
      if(this.heroeId) {
        this.title = 'Editando heroe'
      }
    });
  }

}
