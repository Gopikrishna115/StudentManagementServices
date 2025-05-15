import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('login');
    if (isAuthenticated) {
      return true;
    } else {
      alert('please login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}