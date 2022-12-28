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
  products!: Product[];
  product!: Product;
  productFormGroup!: FormGroup;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.findProductById(Number(id));

  }
  public findProductById(id: number): void {
    this.productService.findAll().subscribe({
      next: (data => {
        this.products = data;
        this.product = this.products.find(p => p.id == id)!;
        this.productFormGroup = this.fb.group({
          id: new FormControl(this.product.id, [Validators.required]),
          name: new FormControl(this.product.name, [Validators.required, Validators.minLength(4)]),
          price: new FormControl(this.product.price, [Validators.required, Validators.min(0.1)])
        })
      })
    });
  }

  public updateProduct() {
    let product: Product = {
      id: this.productFormGroup.value.id,
      name: this.productFormGroup.value.name,
      price: this.productFormGroup.value.price
    };
    this.productService.update(product).subscribe({
      next: (data => console.log(data))
    });
    this.router.navigateByUrl("/");
  }
}
