import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroeFormComponent } from './heroe-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeroeFormComponent', () => {
  let component: HeroeFormComponent;
  let fixture: ComponentFixture<HeroeFormComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroeById', 'actualizarHeroe', 'agregarHeroe']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ HeroeFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formulario', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('nombre')).toBeDefined();
    expect(component.formulario.get('poder')).toBeDefined();
    expect(component.formulario.get('imageUrl')).toBeDefined();
    expect(component.formulario.get('aliados')).toBeDefined();
    expect(component.formulario.get('debilidad')).toBeDefined();
  });
  
  it('should call agregarHeroe when submitting valid form and heroeId is not provided', () => {
    spyOnProperty(component.formulario, 'valid', 'get').and.returnValue(true);
    mockHeroesService.agregarHeroe.and.returnValue(of({ agregado: true }));
  
    component.onSubmit();
  
    expect(mockHeroesService.agregarHeroe).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/heroes']);
  });

});





