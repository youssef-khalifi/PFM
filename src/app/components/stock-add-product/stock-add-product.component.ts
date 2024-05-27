import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../service/product.service";
import {Product} from "../../entities/Product";

@Component({
  selector: 'app-stock-add-product',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './stock-add-product.component.html',
  styleUrl: './stock-add-product.component.css'
})
export class StockAddProductComponent implements OnInit{

  form! : FormGroup;
  product! : Product

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  constructor(private route : Router,
              private productService : ProductService,
              private fb : FormBuilder,
              private toastr: ToastrService) {
  }

  showSuccess() {
    this.toastr.success('Product Created Successfully', 'Success'); // Show a success notification
  }
  showError() {
    this.toastr.error('Try Again!', 'Error'); // Show a success notification
  }

  save() {

    console.log(this.form.value)
    this.productService.saveProduct(this.form.value).subscribe(
      {
        next :()=>  {
          setTimeout(() => {
            this.route.navigateByUrl("/auth/stock")
          }, 2000);
          this.showSuccess()
        },
        error: ()=> this.showError()
      }
    )
  }
}
