import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Cria uma instância do AppComponent
   */
  constructor() {}

  /**
   * Soma dois números e retorna o resultado
   * @param {number} a - primeiro número
   * @param {number} b - segundo número
   * @returns {number} - resultado da soma de a + b
   */
  add(a: number, b: number) {
    return a + b;
  }
}
