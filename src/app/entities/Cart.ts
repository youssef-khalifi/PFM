import { CartItem } from './CartItem';
import { _User } from './_User';
import {Adresse} from "./Address";

export class Cart {
  cartId!: number;
  cartItems: CartItem[] = [];
  user!: _User | undefined;
  totalPrice: number = 0.0;
  address: Adresse | undefined;
  date! : string

  constructor() {
  }
  public addItem(shoppingCartItem: CartItem){
    let elem : CartItem | undefined = this.cartItems.find(x => x.product.id == shoppingCartItem.product.id)


    if(elem == undefined){
      this.cartItems.push(shoppingCartItem)
      this.totalPrice += shoppingCartItem.quantity * shoppingCartItem.product.price
    } else {
      //let currentShoppingCartItem = this.itemsProduct[index]
      elem.addProduct(shoppingCartItem)
      this.totalPrice +=  shoppingCartItem.product.price
    }
  }
  public removeItem(shoppingCartItem: CartItem){
    let elem : CartItem | undefined = this.cartItems.find(x => x.product.id == shoppingCartItem.product.id)
    if(elem != undefined){

      elem.subtractProduct(shoppingCartItem)
      this.totalPrice -=  shoppingCartItem.product.price
      if(elem.quantity == 0){
        this.cartItems.splice(this.cartItems.indexOf(shoppingCartItem), 1)
      }
    }
  }

  public remove(shoppingCartItem: CartItem) {
    // Find the index of the shoppingCartItem in the itemsProduct array
    const index = this.cartItems.findIndex(item => item === shoppingCartItem);

    // If the item is found, remove it from the array
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Remove 1 element at the found index
      this.totalPrice -=  shoppingCartItem.product.price * shoppingCartItem.quantity
    }
  }
}
