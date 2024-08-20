import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  /**
   * Uma lista de itens de menu a serem exibidos na barra de navegação
   * @type {Array<{name: string}}
   */
  menuItems = [{
      name: 'Home'
    }, {
      name: 'Gallery'
    }, {
      name: 'About Us'
    }, {
      name: 'Contact Us'
    }];
  
  /**
   * Cria uma instancia do NavBarComponent
   */
  constructor() { }

  /**
   * Inicializa o componente
   */
  ngOnInit(): void { }
}
