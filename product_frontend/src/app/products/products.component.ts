import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] | undefined;

  constructor(private productService : ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe({
      next :(data=>{this.products=data;}),
      error: (err=>console.log(err))
    });
  }
 

  public delete(id:number){
    this.productService.delete(id).subscribe({
      next:(data)=>{
        console.log(data);
      }
    })
    this.router.navigateByUrl("/");
  }

}
