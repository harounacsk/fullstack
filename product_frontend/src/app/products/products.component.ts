import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  displayTable: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  public loadProduct(): void {
    this.productService.findAll().subscribe({
      next: (data => {
        this.products = data;
        this.displayTable = true;
      })
    });
  }
  public delete(id: number) {
    this.productService.delete(id).subscribe({
      next: (data) => {
        console.log(data);
      }
    })
    this.router.navigateByUrl("/");
  }

}
