import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../service/user.service";
import {CartService} from "../../service/cart.service";
import {Cart} from "../../entities/Cart";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public authService: UserService,
              private router : Router,
              private service : CartService) {
  }

  public logOut(){
    this.authService.logOut().subscribe({
      next :()=> this.router.navigateByUrl("/login")
    })
    this.service.cart = new Cart();
  }
}
