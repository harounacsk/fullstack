import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private producturl = 'http://localhost:8345/product/';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.producturl}all`);
  }

  public findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.producturl}detail?id=` + id);
  }

  public save(product: Product): Observable<string> {
    return this.http.post<string>(`${this.producturl}add`, product);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.producturl}delete/${id}`);
  }

  public update(product: Product): Observable<string> {
    return this.http.put<string>(`${this.producturl}update`, product);
  }
}
