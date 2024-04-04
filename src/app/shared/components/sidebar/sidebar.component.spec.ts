import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let componente: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería contener un enlace al listado de héroes', () => {
    const compiled = fixture.nativeElement;
    const linkElement = compiled.querySelector('li[routerLink="heroes"]');
    expect(linkElement).toBeTruthy();
  });
  
  it('debería contener un enlace para crear un nuevo héroe', () => {
    const compiled = fixture.nativeElement;
    const linkElement = compiled.querySelector('li[routerLink="heroes/new"]');
    expect(linkElement).toBeTruthy();
  });
  
});

