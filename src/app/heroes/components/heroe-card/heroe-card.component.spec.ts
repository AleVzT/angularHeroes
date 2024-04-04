import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroeCardComponent } from './heroe-card.component';
import { HeroesService } from '../../services/heroes.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { of } from 'rxjs';


describe('HeroeCardComponent', () => {
  let component: HeroeCardComponent;
  let fixture: ComponentFixture<HeroeCardComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['eliminarHeroe']);
    await TestBed.configureTestingModule({
      declarations: [ HeroeCardComponent ],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeCardComponent);
    component = fixture.componentInstance;
    component.heroe = {
      id: 1,
      nombre: 'Superman',
      poder: 'Volar',
      debilidad: 'Kryptonita',
      aliados: ['Batman', 'Wonder Woman'],
      imageUrl: 'https://example.com/superman.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit heroeSeleccionado event when editHeroe is called', () => {
    spyOn(component.heroeSeleccionado, 'emit');
    
    component.editHeroe();

    expect(component.heroeSeleccionado.emit).toHaveBeenCalledWith(component.heroe.id);
  });

  it('should call eliminarHeroe when deleteHeroe is called and confirmed', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as SweetAlertResult<unknown>));
    mockHeroesService.eliminarHeroe.and.returnValue(of(null));
    
    await component.deleteHeroe();
  
    expect(mockHeroesService.eliminarHeroe).toHaveBeenCalledWith(component.heroe.id);
  });
  
});
