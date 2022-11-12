import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product! : Product;
  productFormGroup! : FormGroup;
  constructor(private productService :ProductService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById(Number(id));
  }
  public findById(id:number):void {
    this.productService.findById(id).subscribe({
      next:(data=>{
        this.productFormGroup=this.fb.group({
          id: new FormControl(data.id,[Validators.required]),
          name: new FormControl(data.name,[Validators.required,Validators.minLength(4)]),
          price: new FormControl(data.price,[Validators.required,Validators.min(0.1)])
        })
      }),
      error: (err=>console.log(err))
    })
  }

  public updateProduct(){
    let product :Product={
      id: this.productFormGroup.value.id,
      name: this.productFormGroup.value.name,
      price: this.productFormGroup.value.price
    };
    this.productService.update(product).subscribe({
      next: (data=>console.log(data))
    });
    this.router.navigateByUrl("/");
  }
}
