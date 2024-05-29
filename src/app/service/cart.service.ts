import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../entities/Product";
import {Cart} from "../entities/Cart";
import {CartItem} from "../entities/CartItem";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsEndpoint = '/products';
  private baseUrl2 = 'http://localhost:3000';
  private baseUrl = 'http://localhost:3000/carts'; // Assuming your backend runs on localhost:8080

  cart :  Cart ;
  constructor(private http: HttpClient,private service : ProductService) {
    this.cart = new Cart();
    this.cart.date = Date.now().toString()
  }
  getAll(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl);
  }

  public saveCart(cart : Cart) : Observable<Cart>{
    cart.cartItems.forEach((item) => {
      item.product.quantity-= item.quantity
      this.service.updateProduct(item.product)
        .subscribe(
          (data)=>{
            console.log(data)
          }
        );
    });

    return this.http.post<Cart>(this.baseUrl , cart);
  }

  public addToCart(p : Product){

    let elem : CartItem | undefined = this.cart.cartItems
      .find(value => value.product.id == p.id);

    if (elem == undefined){
      let newItem = new CartItem(p , 1);
      this.cart.addItem(newItem);
    }else {
      this.cart.addItem(elem);
    }
  }

  public addItem(cartItem : CartItem){
    this.cart.addItem(cartItem);
  }
  public getCart() : Cart{
    return this.cart;
  }

  public deleteFromCart(cartItem:CartItem){
    this.cart.remove(cartItem);
  }

  public removeItem(cartItem : CartItem){
    this.cart.removeItem(cartItem);
  }
}
