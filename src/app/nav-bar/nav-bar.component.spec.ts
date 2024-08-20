import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';
import { MatButton } from '@angular/material/button';

/**
 * Classe para testar as funcionalidades de NavBarComponent
 */
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  /**
   * Configura o ambiente de teste antes de cada teste
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Testa se o NavBarComponent é criado com sucesso
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testa se o array 'menuItems' é inicializado corretamente
   */
  it('should check menuItems array is initialized', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  /**
   * Testa se todos os itens estão renderizados corretamente
   */
  it('should check menuItem is rendered', () => {
    const menuItemElements = fixture.debugElement.queryAll(
      By.directive(MatButton)
    );
    console.log(menuItemElements);

    expect(menuItemElements.length - 2).toBe(component.menuItems.length);
  });
});
