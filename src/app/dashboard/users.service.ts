import { Injectable } from "@angular/core";
import { timer } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { concatMap, map } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "../models/user";
import { Status } from "../models/status.enum";

const API_URL = "https://bumagi-frontend-test.herokuapp.com";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

  private getUsers(status: Status) {
    const _status = status != null ? `?status=${status}` : "";
    return this.http.get(API_URL + "/users" + _status);
  }

  updateUser(user: User) {
    let url = API_URL + "/users" + `/${user.id}`;
    return this.http.patch(url, user);
  }

  getUsersWithReload(status: Status) {
    return timer(0, 5000).pipe(concatMap(_ => this.getUsers(status)));
  }

  getAvatar(userUrl: string) {
    // const url = API_URL + userUrl;
    // return this.http.get(url,  { responseType: 'blob' })
    // .pipe(
    //   map(
    //     e => {
    //       return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))
    //     }
    //   )
    // )
  }
}
