import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {_User} from "../../entities/_User";
import {Register} from "../../entities/Register";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Output() visible = new EventEmitter;
  form! : FormGroup;
  request : Register = {firstName: '', lastName: '' ,email :'' , image :'' , password :'' };
  user! : _User;
  constructor(private route : Router,
              private service : UserService,
              private fb : FormBuilder,
              private toastr: ToastrService) {
  }

  showSuccess() {
    this.toastr.success('Account Created!', 'Success'); // Show a success notification
  }
  showError() {
    this.toastr.error('Account Not Created!', 'Error'); // Show a success notification
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      image: ['https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png']
    });
  }

  register() {
      this.request.firstName = this.form.value.firstName
      this.request.lastName = this.form.value.lastName
      this.request.email = this.form.value.email
      this.request.password = this.form.value.password
      this.request.image = this.form.value.image

      console.log(this.request)
        this.service.Register(this.request).subscribe({
          next: (data: _User) => {
            if (data == null){
              this.showError()
              setTimeout(() => {
                this.form.reset()
              }, 2000);
            }else {
              this.showSuccess();
              setTimeout(() => {
                this.route.navigateByUrl("/login")
              }, 3000);

            }
          },
        })
    }


  visibility() {
    this.visible.emit(false)
  }
}
