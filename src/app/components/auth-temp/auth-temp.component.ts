import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth-temp',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './auth-temp.component.html',
  styleUrl: './auth-temp.component.css'
})
export class AuthTempComponent {

}
