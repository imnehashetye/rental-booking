import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    url: string;
  constructor(private authService: AuthService, private router: Router) {}

  private handleAuthState() {
      if (this.loginOrRegister()) {
        this.router.navigate(['/rentals']);
        return false;
      }
      return true;
  }

  private handleNoAuthState() {
    if (this.loginOrRegister()) return true;

    this.router.navigate(['/login']);
    return false;
}

  private loginOrRegister() {
    if (this.url.includes('login') || this.url.includes('register')) return true;
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.url = state.url;
    const isUserAuthenticated = this.authService.isAuthenticated(false);

    if(isUserAuthenticated) {
        return this.handleAuthState();
    }

    return this.handleNoAuthState();
  }
}