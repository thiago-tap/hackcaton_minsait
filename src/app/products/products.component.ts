import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  /**
   * Armazena os dados do produto recebidos pelo ProductsService
   * @type {Product[]}
   */
  productData!: Product[];

  /**
   * Controla a exibição do spinner na interface
   */
  showSpinner = false;

  /**
   * Cria uma instância de ProductsComponent
   * @param {ProductsService} productService - Instancia do Produto usada para salvar e atualizar os produtos
   * @param {MatDialog} dialog - Instancia da modal de dialogo
   * @param {MatSnackBar} snackbar - Componente do Material para exibir notificações ao usuário
   */
  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  /**
   * Inicializa o componente e faz a busca de produtos
   */
  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Busca a lista de produtos do serviço e atualiza o estado do componente
   */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000,
        });
      },
    });
  }

  /**
   * Abre uma modal para adicionar um novo produto
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

  /**
   * Abre um modal para editar um produto existente
   * @param {Product} product - produto que será editado
   */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
   * Exlui um produto pelo ID, chamando o serviço de exclusão
   * Exibe uma mensagem de sucesso ou erro dependendo do resultado da operação
   * @param {Product} product - produto para exclusão
   */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000,
        });
      },
    });
  }
}
