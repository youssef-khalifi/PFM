import {Component, OnInit} from '@angular/core';
import {Product} from "../../entities/Product";
import {ProductService} from "../../service/product.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartService} from "../../service/cart.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-catalog',
  standalone: true,
    imports: [
        NgForOf,
        ProductDetailsComponent,
        NgIf,
        NgClass,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent  implements OnInit{

  products : Product[] = [];
  details : boolean ;
  product! : Product ;
  constructor(private service : ProductService,
              private cartService : CartService) {
    this.details = false;
  }
    ngOnInit(): void {
    this.getAll();
    }

    public getAll(){
    this.service.getAllProducts().subscribe(value => this.products = value)
    }

  view(p: Product) {
     if (this.details){
       this.product = p;
     }else {
       this.details = !this.details;
       this.product = p;
     }
  }

  public addToCart(p :Product){
    this.cartService.addToCart(p);
    console.log(this.cartService.getCart())
  }
  public closeDetails(){
    this.details = false;
  }
  selectByCategoryy(category : string){
    this.service.getByCategory(category).
    subscribe(value => this.products = value)
  }
  selectAll(){
    this.service.getAllProducts().subscribe(
      value => this.products = value
    )
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
  public selectByCategory(category : Event){
    const selectedValue = (category.target as HTMLSelectElement).value;

    if (selectedValue === "all"){
      this.service.getAllProducts().subscribe(
        (data)=>{
          this.products = data
        }
      )
      console.log("==")
    }else {
      this.service.getByCategory(selectedValue).subscribe(
        (data)=>{
          this.products = data
        }
      )
    }


  }
}
