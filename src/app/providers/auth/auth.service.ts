import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { MiscService } from '../misc.service';

@Injectable()
export class AuthService {

    public token: string;
    public userInfo: any;
    private apiUrl: string = environment.apiUrl;

    constructor(private http: Http, private router: Router, private _miscServices: MiscService) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.userInfo = currentUser && currentUser.userInfo;
    }

    public userIsAuthenticated() {

        return localStorage.getItem('currentUser');
    }

    public login( username: string, password: string ) {

        const headers = new Headers({ 'content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        // TODO
        this.loadMasterTables();
        return this.loginOK('');

        /*return this.http.post(this.apiUrl + 'authenticate', JSON.stringify({ 'username': username, 'password': password }), options)
            .pipe(
                map((response: Response) => {
                    return this.loginOK( response );
                }), catchError ( err => {
                    return throwError(err);
                })
            );*/
    }

    private loginOK( response ): boolean {
        // login successful if there's a jwt token in the response
        // const token = response.json() && response.json().id_token;
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvYmVuaXRvIiwiYXV0aCI6IlJPTEVfUEVPUExFIiwiZW1wbG95ZWVJZCI6NjMsImV4cCI6MTU0MTY4NDc2OH0.f5IBSQ3cFbuXsHrGHecmXXkOF2GUm_DgLCa8jvXxqrpJx8i7iCdqE0c8pNUaTbIMG-PCN8kxZI2I91Ntd_Bdow';

        if ( token ) {
            this.loadMasterTables();
            this.token = token;
            localStorage.setItem('currentUser', JSON.stringify({ token: token }));
            this.router.navigate(['/home']);
            return true;
        } else {

            this.router.navigate(['/login']);
            return false;
        }
    }

    public logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('environments');
        localStorage.removeItem('countries');
        localStorage.removeItem('companies');
        this.router.navigate(['/login']);
    }

    private loadMasterTables() {
        this._miscServices.loadEnvironmentsCollection().subscribe( data => {
            localStorage.setItem('environments', JSON.stringify(data));
        });
        this._miscServices.loadCountriesCollection().subscribe( data => {
            localStorage.setItem('countries', JSON.stringify(data));
        });
        this._miscServices.loadCompaniesCollection().subscribe( data => {
            localStorage.setItem('companies', JSON.stringify(data));
        });
    }
}
