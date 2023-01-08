import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn = true;
  isAdmin = false;
  private authenticationStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isAuthenticated$: Observable<boolean> = this.authenticationStatus.asObservable();

  setAuthenticationStatus(isLoggedIn: boolean) {
    this.authenticationStatus.next(isLoggedIn);
  }
}
