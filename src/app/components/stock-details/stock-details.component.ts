import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product } from "../../entities/Product";
import { ProductService } from "../../service/product.service";
import { CommonModule } from '@angular/common';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule // Required for common directives
  ],
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  product!: Product;
  productId!: string | null;
  form!: FormGroup;
  loading = true; // Add a loading state

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private service: ProductService,
              private toastr: ToastrService,
              private router : Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.getById();
      }
    });

    // Initialize the form with empty values
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  showSuccess() {
    this.toastr.success('Product updated successfully!', 'Success'); // Show a success notification
  }
  showError() {
    this.toastr.error('Try Again!', 'Error'); // Show a success notification
  }

  getById(): void {
    this.service.getProductById(Number(this.productId)).subscribe(
      (data) => {
        this.product = data;
        this.initializeForm();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching product data', error);
        this.loading = false;
      }
    );
  }

  initializeForm(): void {
    if (this.product) {
      this.form.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category,
        quantity: this.product.quantity,
        description: this.product.description,
      });
    }
  }

  onSubmit(): void {
    this.product.name = this.form.value.name
    this.product.price = this.form.value.price
    this.product.category = this.form.value.category
    this.product.quantity = this.form.value.quantity
    this.product.description = this.form.value.description

    this.service.updateProduct(this.product).subscribe(
      {
        next :()=>  {
          setTimeout(() => {
           this.router.navigateByUrl("/auth/stock")
          }, 2000);
          this.showSuccess()
        },
        error: ()=> this.showError()
      }
    )
  }
}
