import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {Product} from "../entities/Product";
import {_User} from "../entities/_User";
import {Credential} from "../entities/Credential";
import {Register} from "../entities/Register";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users'; // Assuming your backend runs on localhost:8080

  public user: _User | undefined ;

  constructor(private http: HttpClient) {
  }
  getAllUsers(): Observable<_User[]> {
    return this.http.get<_User[]>(this.baseUrl);
  }

  login(cred: Credential): Observable<_User> {
    return this.getUserByEmail(cred.email).pipe(
      map((user: _User | undefined) => {
        if (!user) {
          throw new Error('User not found');
        }else if (cred.password != user.password){
          throw new Error('User not found');
        }else {
          this.user = user;
          localStorage.setItem("user" , JSON.stringify({
            "email" : user.email , "password" :user.password
          }))
        }

        return user;
      })
    );
  }

  public Register(request : Register): Observable<_User>{
    return this.http
      .post<_User>(`${this.baseUrl}`, request)
      .pipe(map((user: _User) => {
        return user;
      }));
  }

  public update(userData: _User | undefined): Observable<_User> {

    return this.http
      .put<_User>(`${this.baseUrl}/${userData?.id}`, userData)
      .pipe(map((user: _User) => {
        // Update local user if it is the current user
        if (this.user && this.user.id === userData?.id) {
          this.user = user;
        }
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

  getUserByEmail(email: string): Observable<_User | undefined> {
    return this.http.get<_User[]>(`${this.baseUrl}?email=${email}`).pipe(
      map((users: _User[]) => users.length > 0 ? users[0] : undefined),
      catchError(() => of(undefined))
    );
  }
}
