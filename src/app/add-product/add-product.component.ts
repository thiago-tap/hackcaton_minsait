import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  /**
   * Grupo de formulario de produto para obter informações sobre o produto
   * @type {FormGroup}
   */
  productForm!: FormGroup;

  /**
   * Imagem do produto
   * @type {string}
   */
  imageSrc!: string;

  /**
   * Cria uma instancia de AddProductComponent
   * @constructor
   * @param {productService} - Instancia do Produto usada para salvar e atualizar os produtos
   * @param {snackbar} - Componente do Material para exibir mensagens ao usuário
   * @param {_data} - Dados do produto injetados no componente
   * @param {dialogRef} - Instancia da modal de dialogo
   */
  constructor(
    private productService: ProductsService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  /**
   * Para buscar os dados do produto
   */
  public get data(): Product {
    return this._data;
  }

  /**
   * Para setar os dados do produto
   */
  public set data(d: Product) {
    this._data = d;
  }

  /**
   * Inicializa o componente e configura o form de produto
   */
  ngOnInit(): void {
    const hasData = this.data && Object.keys(this.data).length;
    this.productForm = new FormGroup({
      title: new FormControl(hasData ? this.data.title : ''),
      description: new FormControl(hasData ? this.data.description : ''),
      price: new FormControl(hasData ? this.data.price : ''),
      category: new FormControl(hasData ? this.data.category : ''),
    });
  }

  /**
   * Metodo de salvar o produto no servidor
   * Se o o produto tiver um ID, atualiza o produto existente
   * Caso contrario, cria um novo produto
   */
  saveProduct() {
    const product = this.productForm.value as Product;
    if (Object.keys(this.data).length) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    }
  }
}
