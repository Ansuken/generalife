import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { AccountService } from '../../providers/account.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor( private router: Router,
            private _auth: AuthService,
            public _accountService: AccountService ) { }

    canIAccess( roles: Array<string> ) {

        const myRole = this._accountService.getAuth();

        if ( roles && roles.length > 0 ) {

            for ( const role of roles ) {

                if ( role === 'ALL' || myRole === role ) {
                    return true;
                }
            }
        }

        return false;
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

        const url: string = state.url;
        const roles = route.data['roles'] as Array<string>;

        if ( this._auth.userIsAuthenticated() ) {
            if (this.canIAccess( roles )) {
                return true;
            } else {
                this.router.navigate(['/not-allowed']);
            }
        } else {
            this.router.navigate(['/login']);
        }

        return false;
    }

    canActivateChild ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

        const url: string = state.url;
        const roles = route.data['roles'] as Array<string>;

        if ( this._auth.userIsAuthenticated() ) {
            if (this.canIAccess( roles )) {
                return true;
            } else {
                this.router.navigate(['/not-allowed']);
            }
        } else {
            this.router.navigate(['/login']);
        }

        this.router.navigate(['/not-allowed']);
        return false;
    }
}
