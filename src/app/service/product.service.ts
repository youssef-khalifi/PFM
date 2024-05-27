import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../entities/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
  getByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.category === category))
    );
  }

  getByQuantity(minQuantity: number): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.quantity <= minQuantity))
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }
  deleteProduct(p: Product): Observable<void> {
    const url = `${this.baseUrl}/${p.id}`;
    return this.http.delete<void>(url);
  }
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

}
