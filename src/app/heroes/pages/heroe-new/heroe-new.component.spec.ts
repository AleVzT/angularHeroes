import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { HeroeNewComponent } from './heroe-new.component';

describe('HeroeNewComponent', () => {
  let component: HeroeNewComponent;
  let fixture: ComponentFixture<HeroeNewComponent>;

  const fakeActivatedRoute = {
    paramMap: of(convertToParamMap({})),
    params: of({ id: '1' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title to "Editando heroe" if heroeId is provided', () => {
    component.heroeId = '1';
    fixture.detectChanges();

    expect(component.title).toBe('Editando heroe');
  });
});

