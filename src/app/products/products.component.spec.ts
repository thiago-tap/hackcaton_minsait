import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

/**
 * Classe para testar as funcionalidades de ProductsComponent
 */
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));

  /**
   * Configura o ambiente de teste antes de cada teste
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  /**
   * Testa se o ProductsComponent é criado com sucesso
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testes para inicialização dos produtos
   */
  describe('should test get products initially', () => {
    /**
     * Testa se os dados dos produtos são buscados com sucesso na inicialização
     */
    it('should get product data initially', () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          title: 'Produto 1',
          price: '1',
          description: 'Descrição 1',
          category: 'Categoria 1',
        },
      ];

      mockProductService.getProducts.and.returnValue(of(mockProducts));

      component.getProducts();
      fixture.detectChanges();

      expect(component.productData).toEqual(mockProducts);
      expect(component.showSpinner).toBeFalse();
    });

    /**
     * Testa o comportamento quando a busca de produto falha
     */
    it('should get product data initially on failure', () => {
      const mockProduct = {
        id: '1',
        title: 'Produto 1',
        price: '1',
        description: 'Descrição 1',
        category: 'Categoria 1',
      };

      component.productData = [mockProduct];
      mockProductService.getProducts.and.returnValue(
        throwError(() => new Error('Falha ao buscar produto'))
      );

      component.getProducts();
      fixture.detectChanges();

      expect(component.productData).toEqual([mockProduct]);
      expect(component.showSpinner).toBeFalse();
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
   * Testa a abertura da modal para adicionar um novo produto
   */
  it('should test openDialog', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      width: '40%',
    });
  });

  /**
   * Testa a abertura da modal para editar um produto existente
   */
  it('should test editDialog', () => {
    const mockProduct = {
      id: '1',
      title: 'Produto 1',
      price: '1',
      description: 'Descrição 1',
      category: 'Categoria 1',
    };
    component.editProduct(mockProduct);
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      data: mockProduct,
      width: '40%',
    });
  });

  /**
   * Testes para a exclusão de produtos
   */
  describe('should test deleteProduct', () => {
    /**
     * Testa a exclusão de um produto com sucesso
     */
    it('should test deleteProduct on success', () => {
      const mockProduct = {
        id: '1',
        title: 'Produto 1',
        price: '1',
        description: 'Descrição 1',
        category: 'Categoria 1',
      };

      mockProductService.deleteProduct.and.returnValue(of({}));
      component.deleteProduct(mockProduct);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
        mockProduct.id
      );
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Deleted Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
    });

    /**
     * Testa o comportamento quando a exclusão de um produto falha
     */
    it('should test deleteProduct on failure', () => {
      const mockProduct = {
        id: '1',
        title: 'Produto 1',
        price: '1',
        description: 'Descrição 1',
        category: 'Categoria 1',
      };

      mockProductService.deleteProduct.and.returnValue(
        throwError(() => new Error('Erro ao excluir o produto'))
      );
      component.deleteProduct(mockProduct);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
        mockProduct.id
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
});
