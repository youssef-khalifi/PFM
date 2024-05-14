import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {Credential} from "../../entities/Credential";
import {RegisterComponent} from "../register/register.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    RegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  visible : boolean = true;
  form! : FormGroup;
  credential: Credential = { email: '', password: '' };
  constructor(private route : Router,
              private service : UserService,
              private fb : FormBuilder,
              private toastr: ToastrService) {
  }

  showSuccess() {
    this.toastr.success('Login Success!', 'Success'); // Show a success notification
  }
  showError() {
    this.toastr.error('Bad Credentials!', 'Error'); // Show a success notification
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  auth() {

    this.credential.email = this.form.value.email
    this.credential.password = this.form.value.password

    this.service.logIn(this.credential).subscribe({
      next :()=>  {
        setTimeout(() => {
          this.route.navigateByUrl("/auth/catalog")
        }, 4000);
          this.showSuccess()
      },
      error: ()=> this.showError()
    })
  }

  register() {
    this.visible = !this.visible;
  }
}
