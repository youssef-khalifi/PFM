import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductService} from "./service/product.service";
import {Product} from "./entities/Product";
import {Observable} from "rxjs";
import {NgFor, NgForOf, NgIf} from "@angular/common";
import {UserService} from "./service/user.service";
import {_User} from "./entities/_User";
import {CartService} from "./service/cart.service";
import {Cart} from "./entities/Cart";
import {HeaderComponent} from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  products : Product[] = [];
  users : _User[] = [];
  carts! : Cart;
  constructor(private service : ProductService,
              private user : UserService,private cart : CartService  ) {

  }

  ngOnInit(): void {
        this.getProducts()
    this.getUsers()
    this.getCart()

    }

  public getProducts() {
    this.service.getAllProducts().subscribe(
      value => this.products = value
    )
  }

  public getUsers() {
    this.user.getAllUsers().subscribe(
      value => this.users = value
    )
  }

  public getCart() {
    this.cart.getAll().subscribe(
      value => this.carts = value

    )
  }
}
