import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CatalogComponent} from "./components/catalog/catalog.component";
import {CartComponent} from "./components/cart/cart.component";
import {AuthTempComponent} from "./components/auth-temp/auth-temp.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthTempComponent ,canActivate : [AuthGuard],
    children :[
      { path: 'catalog', component: CatalogComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent },
    ] },
];
