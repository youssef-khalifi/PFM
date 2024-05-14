import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {_User} from "../../entities/_User";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : _User | undefined;
  constructor(private service : UserService) {
  }

  ngOnInit(): void {
        this.user = this.service.user
    }
}
