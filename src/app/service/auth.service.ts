import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {_User} from "../entities/_User";
import {catchError, find, map, Observable, of, sample} from "rxjs";
import {Credential} from "../entities/Credential";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: _User | undefined ;
  users: _User[] = [];

  constructor(private http: HttpClient,private service : UserService) {
  }

  login(cred: Credential): Observable<_User> {
    return this.service.getUserByEmail(cred.email).pipe(
      map((user: _User | undefined) => {
        if (!user) {
          throw new Error('User not found');
        }
        localStorage.setItem("user" , JSON.stringify({
          "email" : user.email , "password" :user.password
        }))
        return user;
      })
    );
  }



}
