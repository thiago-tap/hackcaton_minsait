import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';

/**
 * Classe para testar as funcionalidades de ProductsService
 */
describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  /**
   * Configura o ambiente de teste antes de cada teste
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  /**
   * Testa se o ProductService é criado com sucesso
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Testa o método getProducts do ProductsService
   */
  it('should test getProducts', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Produto 1',
        description: 'Descrição 1',
        price: '1.99',
        category: 'Categoria 1',
      },
      {
        id: '2',
        title: 'Produto 2',
        description: 'Descrição 2',
        price: '2.99',
        category: 'Categoria 2',
      },
    ];
    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpController.expectOne(`${service.baseAPI}products`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
    httpController.verify();
  });

  /**
   * Testa o método saveProducts do ProductsService
   */
  it('should test saveProducts', () => {
    const newProduct: Product = {
      title: 'Novo Produto',
      description: 'Descrição do novo produto',
      price: '0.99',
      category: 'Nova Categoria',
    };

    service.saveProduct(newProduct).subscribe((savedProduct) => {
      expect(savedProduct).toEqual({ id: '1', ...newProduct });
    });

    const req = httpController.expectOne(`${service.baseAPI}products`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush({ id: '1', ...newProduct });
    httpController.verify();
  });

  /**
   * Testa o método updateProduct do ProductsService
   */
  it('should test updateProduct', () => {
    const updatedProduct: Product = {
      id: '1',
      title: 'Produto Atualizado',
      description: 'Descrição atualizada',
      price: '20.99',
      category: 'Categoria Atualizada',
    };

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpController.expectOne(
      `${service.baseAPI}products/${updatedProduct.id}`
    );
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
    httpController.verify();
  });

  /**
   * Testa o método deleteProduct do ProductsService
   */
  it('should test deleteProduct', () => {
    const productId = '1';

    service.deleteProduct(parseFloat(productId)).subscribe((deletedProduct) => {
      expect(deletedProduct.id).toBe(productId.toString());
    });

    const req = httpController.expectOne(
      `${service.baseAPI}products/${productId}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush({ id: productId });
    httpController.verify();
  });
});
