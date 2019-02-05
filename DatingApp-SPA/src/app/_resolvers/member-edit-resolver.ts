import {Injectable} from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private _userService: UserService,
                private _auth: AuthService, private _router: Router, private _alertify: AlertifyService) {}


    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this._userService.getUser(this._auth.decodedToken.nameid).pipe(
            catchError(error => {
                this._alertify.error('Problem retriving data');
                this._router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
