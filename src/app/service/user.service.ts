import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {Product} from "../entities/Product";
import {_User} from "../entities/_User";
import {Credential} from "../entities/Credential";
import {Register} from "../entities/Register";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/user'; // Assuming your backend runs on localhost:8080

  public user: _User | undefined ;

  constructor(private http: HttpClient) {
  }
  getAllUsers(): Observable<_User[]> {
    return this.http.get<_User[]>(this.baseUrl);
  }

  public logIn(credentials : Credential): Observable<_User>{
    return this.http
      .post<_User>(`${this.baseUrl}/auth`, credentials)
      .pipe(map((user: _User) => {
        this.user = user;
        localStorage.setItem("user" , JSON.stringify({
          "email" : user.email , "password" :user.password
        }))
        return user;
      }));
  }

  public Register(request : Register): Observable<_User>{
    return this.http
      .post<_User>(`${this.baseUrl}`, request)
      .pipe(map((user: _User) => {
        return user;
      }));
  }

  public hasRole(role : string) : boolean{
    return this.user!.role.toString().includes(role)
  }

  public isAuthenticated(){
    return this.user != undefined
  }

  public logOut() : Observable<boolean>{
    this.user = undefined
    return of(true)
  }
}
