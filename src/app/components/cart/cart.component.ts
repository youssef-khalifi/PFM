import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {Cart} from "../../entities/Cart";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CartItem} from "../../entities/CartItem";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart : Cart = new Cart();
  constructor(private service : CartService,private userService : UserService) {
  }

  ngOnInit(): void {
        this.getCart()
    this.service.getAll().subscribe(
      (data) => {
        console.log(data)
      }
    )
    }

  public getCart(){
   this.cart =  this.service.getCart()
  }
  public eventAction(event : string , cartItem : CartItem){
    if (event == "add"){
      this.service.addItem(cartItem);
    }else if (event == "sou"){
      this.service.removeItem(cartItem);
    }else{
      this.service.deleteFromCart(cartItem);
    }
  }

  public saveCart(){
    this.cart.user = this.userService.user
    this.service.saveCart(this.service.cart).subscribe(value =>
    console.log(value))
  }

}
