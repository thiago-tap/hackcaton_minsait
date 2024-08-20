import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
/**
 * Mock do componente de barra de navegação
 */
@Component({
  selector: 'app-nav-bar',
  template: `<div></div>`,
})
class MockNavBarComponent {}

/**
 * Mock do componente de produtos
 */
@Component({
  selector: 'app-products',
  template: `<div></div>`,
})
class MockProductsComponent {}

/**
 * Classe para testar as funcionalidades de AppComponent
 */
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  /**
   * Configura o ambiente de teste antes de cada teste
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavBarComponent, MockProductsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  /**
   * Testa se o componente principal foi criado com sucesso
   */
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testa se o componente 'app-navbar' está presente no DOM
   */
  it('should have app-navbar', () => {
    const navBarElement = fixture.debugElement.query(By.css('app-nav-bar'));
    expect(navBarElement).toBeTruthy();
  });

  /**
   * Testa se o componente 'app-navbar' está presente no DOM
   */
  it('should have app-products', () => {
    const productElement = fixture.debugElement.query(By.css('app-products'));
    expect(productElement).toBeTruthy();
  });

  /**
   * Testa a função add(), soma de 2 números
   */
  it('should test sum of two numbers', () => {
    const resultado = component.add(5, 5);
    expect(resultado).toBe(10);
  });
});
