import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = true;
  isAdmin = false;
  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$;
  }
  private authenticationStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isAuthenticated$: Observable<boolean> = this.authenticationStatus.asObservable();

  setAuthenticationStatus(isLoggedIn: boolean) {
    this.authenticationStatus.next(isLoggedIn);
  }
}
