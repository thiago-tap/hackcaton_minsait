import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Classe de serviço responsável por gerenciar as interações com a API de produtos
 */
export class ProductsService {
  /**
   * A URL base da API
   */
  public baseAPI = environment.baseAPI;

  /**
   * Cria uma instância do ProductsService
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtém a lista de produtos
   * @returns {Observable<Product[]>}
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
   * Salva um novo produto
   * @param {Product} product
   * @returns {Observable<Product>}
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.baseAPI}products`, product);
  }

  /**
   * Exclui um produto
   * @param {Product} product
   * @returns {Observable<Product>}
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /**
   * Atualiza um produto
   * @param {Product} product
   * @returns {Observable<Product>}
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
