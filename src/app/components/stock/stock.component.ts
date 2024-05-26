import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../entities/Product";
import {NgForOf} from "@angular/common";
import {map} from "rxjs";

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    NgForOf
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
                private productService : ProductService) {
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
}
