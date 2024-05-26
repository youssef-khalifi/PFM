import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {_User} from "../../entities/_User";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : _User | undefined;
  form! : FormGroup;

  ngOnInit(): void {
    this.user = this.service.user

    this.form = this.fb.group({
      email: [this.user?.email, [Validators.required, Validators.email]],
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      phoneNumber: [this.user?.phoneNumber, Validators.required],
      city: [this.user?.adresse.city, Validators.required],
      state: [this.user?.adresse.state, Validators.required],
      country: [this.user?.adresse.country, Validators.required],
      postalCode: [this.user?.adresse.postalCode, Validators.required],
      street: [this.user?.adresse.street, Validators.required],
    });
  }
  constructor(private service : UserService,
              private fb : FormBuilder,
              private toastr: ToastrService,
              private route : Router) {
  }

  showSuccess() {
    this.toastr.success('Profile updated Successfully', 'Success'); // Show a success notification
  }
  showError() {
    this.toastr.error('Try Again!', 'Error'); // Show a success notification
  }

  onSubmit() {

    this.user!.email = this.form.value.email
    this.user!.firstName = this.form.value.firstName
    this.user!.lastName = this.form.value.lastName
    this.user!.phoneNumber = this.form.value.phoneNumber
    this.user!.adresse.city = this.form.value.city
    this.user!.adresse.state = this.form.value.state
    this.user!.adresse.country = this.form.value.country
    this.user!.adresse.postalCode = this.form.value.postalCode
    this.user!.adresse.street = this.form.value.street

    this.service.update(this.user).subscribe(
      {
        next :()=>  {
          setTimeout(() => {
            this.route.navigateByUrl('/auth/profile')
          }, 2000);
          this.showSuccess()
        },
        error: ()=> this.showError()
      }
    )




  }
}
