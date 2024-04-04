import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let componente: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería emitir el valor correctamente', () => {
    const valorEmitted = 'prueba';
    let valorRecibido: string | undefined;

    componente.onValue.subscribe((value: string) => {
      valorRecibido = value;
    });

    componente.emitValue(valorEmitted);
    expect(valorRecibido).toEqual(valorEmitted);
  });
});
