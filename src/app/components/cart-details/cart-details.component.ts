import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {Cart} from "../../entities/Cart";
import {NgForOf, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cart : Cart = new Cart();
    ngOnInit(): void {
    this.getCart()
    }

    constructor(private service : CartService,
                private toastr: ToastrService,
                private route : Router) {
    }
  showSuccess() {
    this.toastr.success('Your Command Successfully Saved!', 'Success'); // Show a success notification
  }
  showError() {
    this.toastr.error('Try Again!', 'Error'); // Show a success notification
  }
  public getCart(){
    this.cart =  this.service.getCart()
  }

  pay() {
    this.service.saveCart(this.cart).subscribe(
      {
        next :()=>  {
          setTimeout(() => {
            this.service.cart = new Cart();
            this.route.navigateByUrl("/auth/cart")
          }, 2000);
          this.showSuccess()
        },
        error: ()=> this.showError()
      }
    )
  }
}
