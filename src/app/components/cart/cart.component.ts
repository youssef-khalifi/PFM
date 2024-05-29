import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {Cart} from "../../entities/Cart";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CartItem} from "../../entities/CartItem";
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart : Cart = new Cart();
  form! : FormGroup;
  constructor(private service : CartService,
              private userService : UserService,
              private  route : Router,
              private fb : FormBuilder,
              private toastr: ToastrService) {
  }


  showSuccess() {
    this.toastr.success('Your Command Successfully Saved!', 'Success'); // Show a success notification
  }
  showWarning() {
    this.toastr.warning('You should select some product!', 'warning'); // Show a success notification
  }
  showError() {
    this.toastr.error('Try Again!', 'Error'); // Show a success notification
  }

  ngOnInit(): void {
        this.getCart()
    this.service.getAll().subscribe(
      (data) => {
        console.log(data)
      }
    )
    this.cart.date = new Date().toISOString();

    this.form = this.fb.group({
      street: ['', [Validators.required]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
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

  public Next(){
    this.cart.user = this.userService.user
    this.cart.address = this.form.value

    if (this.cart.totalPrice == 0){
      this.showWarning()
    }else {
      setTimeout(() => {
        this.route.navigateByUrl("/auth/cart-details")
      }, 2000);
      this.showSuccess()
    }
  }

  saveAndContinue() {
    this.cart.user = this.userService.user
    this.cart.address = this.userService.user?.adresse

    if (this.cart.totalPrice == 0){
      this.showWarning()
    }else {
      setTimeout(() => {
        this.route.navigateByUrl("/auth/cart-details")
      }, 2000);
      this.showSuccess()
    }
    }

}
