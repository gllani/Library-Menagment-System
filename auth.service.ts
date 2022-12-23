import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn = true;
  isAdmin = false;
  constructor() {}
}
