import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productFormGroup !: FormGroup;
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      price: new FormControl(0, [Validators.required, Validators.min(0.1)])
    })
  }

  public saveProduct(): void {
    let message: string;
    let product: Product = {
      id: 0,
      name: this.productFormGroup.value.name,
      price: this.productFormGroup.value.price
    };

    this.productService.save(product).subscribe({
      next: data => {
        message = data;
        console.log(message);
      }
    });
    this.router.navigateByUrl("/");
  }


}
