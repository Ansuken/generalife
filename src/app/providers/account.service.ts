import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestproviderService } from '../providers/restprovider.service';

@Injectable()
export class AccountService {

    private apiUrl: string = environment.apiUrl;

    constructor( public provider: RestproviderService ) {}

    public getUID() {

        const user = this.getUserByToken();
        return user.sub;
    }

    public getUserId() {

        const user = this.getUserByToken();
        return user.employeeId;
    }

    public getAuth() {

        const user = this.getUserByToken();
        return user.auth;
    }

    public getExpirationDate() {

        const user = this.getUserByToken();
        return user.exp * 1000;
    }

    public getUserByToken() {

        const token = this.getToken();
        const base64 = this.getBase64( token );
        return JSON.parse(atob(base64));
    }

    private getToken() {

        return JSON.parse( localStorage.getItem('currentUser') ).token;
    }

    private getBase64( token: string ) {

        const base64Url = token.split('.')[1];
        return base64Url.replace('-', '+').replace('_', '/');
    }

    public adminPermission() {

        return this.getAuth() === 'ROLE_PEOPLE'
            || this.getAuth() === 'ROLE_SCRUMMASTER'
            || this.getAuth() === 'ROLE_ADMINISTRATION';
    }

    public superAdminPermission() {

        return this.getAuth() === 'ROLE_PEOPLE'
            || this.getAuth() === 'ROLE_ADMINISTRATION';
    }
}
