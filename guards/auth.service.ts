import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;

  private authenticationStatus: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.authenticationStatus.asObservable();

  setAuthenticationStatus(isLoggedIn: boolean) {
    this.authenticationStatus.next(isLoggedIn);
  }
}
