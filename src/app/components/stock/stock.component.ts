import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../entities/Product";
import {NgForOf} from "@angular/common";
import {map} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit{

   products : Product[] = [];
   product! : Product ;
    ngOnInit(): void {
      this.getAll()
    }

    constructor(private service : ProductService,
                private productService : ProductService,
                private route : Router) {
    }


  public getAll(){
    this.service.getAllProducts().subscribe(value => this.products = value)
  }

  selectByQuantity(category: Event){
    const selectedValue = (category.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case '1':
        this.products = this.products.filter(product => product.quantity <= 10);
        break;
      case '2':
        this.productService.getAllProducts().subscribe(
          (data)=>{
            this.products = data
          }
        )
        break;
      default:
        console.log("select nothing")
        break;
    }
  }

  public selectByCategory(category : Event){
    const selectedValue = (category.target as HTMLSelectElement).value;

    if (selectedValue === "all"){
      this.productService.getAllProducts().subscribe(
        (data)=>{
          this.products = data
        }
      )
      console.log("==")
    }else {
      this.productService.getByCategory(selectedValue).subscribe(
        (data)=>{
          this.products = data
        }
      )
    }


  }

  Edit(p : Product) {

    this.route.navigate(['/auth/stock-details'], { queryParams: { id: p.id } });
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const p of this.products) {
      if (p.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || p.category.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || p.description.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(p);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getAll();
    }
  }
}
