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
  dtOptions: DataTables.Settings = {};
  displayTable: boolean = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: "Suchen:",
        lengthMenu: "Anzeige _MENU_ Produkte",
        info: "Anzeige  _START_ bis _END_ von _TOTAL_ Produkten",
        infoPostFix: "",
        paginate: {
          first: "Erste",
          previous: "Zurück",
          next: "Weiter",
          last: "Letzte"
        }
      }
    };
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
