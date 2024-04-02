import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeFormComponent } from './heroe-form.component';

describe('HeroeFormComponent', () => {
  let component: HeroeFormComponent;
  let fixture: ComponentFixture<HeroeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
