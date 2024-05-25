import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {_User} from "../../entities/_User";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";

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

  ngOnInit(): void {
    this.user = this.service.user
  }
  constructor(private service : UserService) {
  }

  onSubmit(form : NgForm) {
    console.log(form.value)
  }
}
