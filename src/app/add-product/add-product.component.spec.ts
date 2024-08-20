import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';

/**
 * Classe para testar as funcionalidades de AddProductComponent
 */
describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);

  /**
   * Configura o ambiente de teste antes de cada teste
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [NoopAnimationsModule, SharedModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ProductsService, useValue: mockProductService },
        { provide: MatSnackBar, useValue: matSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    component.ngOnInit();
  });

  /**
   * Testa se o AddProductComponent é criado com sucesso
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testa se o form do produto é inicializado de forma correta
   */
  it('should init the form', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.controls['title']).toBeDefined();
    expect(component.productForm.controls['description']).toBeDefined();
    expect(component.productForm.controls['price']).toBeDefined();
    expect(component.productForm.controls['category']).toBeDefined();
  });

  /**
   * Descreve os teste para adicionar um produto
   */
  describe('should test add product functionality', () => {
    /**
     * Testa se o metodo saveProduct é chamado para adicionar um novo produto
     */
    it('should call the saveProduct to add new product', () => {
      spyOn(component, 'saveProduct');
      component.saveProduct();
      expect(component.saveProduct).toHaveBeenCalled();
    });

    /**
     * Testa se o tratamento de erro funciona corretamente ao adicionar um novo produto
     */
    it('should test the saveProduct for failure while add a new product', () => {
      const error = new Error('Erro quando salva o produto.');
      mockProductService.saveProduct.and.returnValue(throwError(() => error));
      component.productForm.patchValue({
        title: 'Produto 1',
        description: 'Descrição do produto',
        price: '19.99',
        category: 'Categoria de teste',
      });
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(
        component.productForm.value
      );
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });

  /**
   * Descreve os teste para a funcionalidade de editar produto
   */
  describe('should test edit product functionality', () => {
    /**
     * Teste se os controles do form são definidos corretamente quando os dados são fornecidos
     */
    it('should set the form controls to the correct values when data is provided', () => {
      const data: Product = {
        id: '1',
        title: 'Produto 1',
        description: 'Descrição do produto',
        price: '19.99',
        category: 'Categoria de teste',
      };
      component.data = data;
      component.ngOnInit();
      expect(component.productForm.controls['title'].value).toBe(data.title);
      expect(component.productForm.controls['description'].value).toBe(
        data.description
      );
      expect(component.productForm.controls['price'].value).toBe(data.price);
      expect(component.productForm.controls['category'].value).toBe(
        data.category
      );
    });

    /**
     * Testa se o método saveProduct é chamado para atualizar um produto existente
     */
    it('should call the saveProduct while editing the product', () => {
      const data: Product = {
        id: '1',
        title: 'Produto 1',
        description: 'Descrição do produto',
        price: '19.99',
        category: 'Categoria de teste',
      };
      component.data = data;
      component.productForm.patchValue(data);
      spyOn(component, 'saveProduct');
      component.saveProduct();
      expect(component.saveProduct).toHaveBeenCalled();
    });

    /**
     * Testa se o tratamento de erro funciona correto ao atualizar um produto
     */
    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Produto 1',
        description: 'Descrição do produto',
        price: '19.99',
        category: 'Categoria de teste',
      };
      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue(throwError(() => error));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });
});
