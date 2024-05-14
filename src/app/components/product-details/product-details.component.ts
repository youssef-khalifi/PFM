import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../entities/Product";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter;
  @Output() add = new EventEmitter;



  public closeDetails(){
    this.close.emit(false);
  }
  public addToCart(p : Product){
    this.add.emit(p);
  }
}
