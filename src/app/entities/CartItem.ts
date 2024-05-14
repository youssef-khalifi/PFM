import { Product } from "./Product"
import {Cart} from "./Cart";

export class CartItem {
  cartItemId: number;
  product: Product;
  cart: Cart;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.cartItemId = 0;
    this.product = product;
    this.cart = new Cart();
    this.quantity = quantity;
  }

  public addProduct(shoppingCartItem: CartItem) {
    if (this.product.id == shoppingCartItem.product.id) {
      shoppingCartItem.quantity += 1;
      // this.quantity += shoppingCartItem.quantity

    }

  }

  public subtractProduct(shoppingCartItem: CartItem) {
    if (this.product.id == shoppingCartItem.product.id) {
      shoppingCartItem.quantity -= 1;
    }
  }

  public displayProduct() {
    return "Title: " + this.product.name + ", quantity: " + this.quantity
  }
}

