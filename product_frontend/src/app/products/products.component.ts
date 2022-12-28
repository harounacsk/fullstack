import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Product[];
  dtoptions: DataTables.Settings={};
  dttrigger: Subject<any> = new Subject<any>();
  
  constructor(private productService : ProductService, private router: Router) { }

  ngOnInit(): void {
    this.dtoptions={
      pagingType: 'full_numbers',
      pageLength:10
  
    };
    this.loadProduct();
  }
 
public loadProduct():void{
  this.productService.findAll().subscribe({
    next :(data=>{
      this.products=data;      
    }),
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
