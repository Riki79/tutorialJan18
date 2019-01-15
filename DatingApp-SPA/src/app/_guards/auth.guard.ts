import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router,
              private _alertify: AlertifyService) {
  }
  // tslint:disable-next-line:max-line-length
  canActivate(): Observable<boolean> | Promise<boolean> | boolean { // Seperating return types with pipe will allow us to return multiple types
    if (this._authService.loggedIn()) {
      return true;
    }
    this._alertify.error('Cannot get in');
    this._router.navigate(['/home']);
    return false;

  }
}
