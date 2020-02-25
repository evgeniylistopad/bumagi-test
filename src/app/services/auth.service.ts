import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(public router: Router, private http: HttpClient) {
    this._user = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this._user.asObservable();
  }

  public get token() {
    const user = JSON.parse(localStorage.getItem("user"));
    return (user && user.token) ? user.token : null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public get userValue() {
    return this._user.value;
  }

  login(login: string, password: string) {
    const url = "https://bumagi-frontend-test.herokuapp.com/auth";
    return this.http
      .post<any>(url, { login, password }, { observe: "response" })
      .pipe(
        map(res => {
          const token = res.headers.get("Authorization");
          const user = {
            ...res.body,
            token
          }
          localStorage.setItem("user", JSON.stringify(user));
          this._user.next(user);
          return user;
        }),
        catchError(err => of(err))
      );
  }

  logout() {
    localStorage.removeItem("user");
    this._user.next(null);
  }
}
