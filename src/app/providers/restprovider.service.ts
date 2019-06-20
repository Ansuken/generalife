import { Injectable } from '@angular/core';
import { Response, Http, Jsonp } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RestproviderService {

    isLoading = false;

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private route: Router ) {}

    showError (error: Object) {

        const status = error['status'];
        let title = '';

        switch (status) {

            case 400: {

                title = 'Bad request';
                break;
            }

            case 401: {

                title = 'You don´t have permissions to see the application';
                this.route.navigate(['/no-auth']);
                break;
            }

            case 403: {

                title = 'Access denied';
                if ( this.route.url !== '/screen-mode' ) {
                    this.route.navigate(['/not-allowed']);
                }
                break;
            }

            case 404: {

                title = 'The resource is not found';
                this.route.navigate(['/home']);
                break;
            }

            case 500: {

                title = 'Internal Server Error';
                if ( this.route.url !== '/screen-mode' ) {
                    this.route.navigate(['/error']);
                }
                break;
            }
        }
    }

    doGet( url: string, params?: any, lazyLoading: boolean = false ) {

        this.isLoading = !lazyLoading;

        return this.http
            .get( url, params || {} )
            .pipe(
                map( (res: Response) => {

                    this.isLoading = false;
                    return res.json();
                }), catchError( (err) => {

                    this.isLoading = false;
                    this.showError(err);
                    return throwError( err );
                })
            );
    }

    doPost( url: string, params: any, lazyLoading: boolean = false  ) {

        this.isLoading = !lazyLoading;

        return this.http.post( url, params )
            .pipe(
                map( res => {

                    this.isLoading = false;
                    return res.json();
                }), catchError( (err) => {

                    this.isLoading = false;
                    this.showError(err);
                    return throwError( err );
                })
            );
    }

    doPut( url: string, params: any, lazyLoading: boolean = false  ) {

        this.isLoading = !lazyLoading;

        return this.http.put( url, params )
            .pipe(
                map( res => {

                    this.isLoading = false;
                    return res.json();
                }), catchError( (err) => {

                    this.isLoading = false;
                    this.showError(err);
                    return throwError( err );
                })
            );
    }

    doDelete( url: string, lazyLoading: boolean = false  ) {

        this.isLoading = !lazyLoading;

        return this.http.delete( url )
            .pipe(
                map( res => {

                    this.isLoading = false;
                    return res.json();
                }), catchError( (err) => {

                    this.isLoading = false;
                    this.showError(err);
                    return throwError( err );
                })
            );
    }

    doJsonp( url: string, lazyLoading: boolean = false ) {

        this.isLoading = !lazyLoading;

        return this.jsonp.get( url )
            .pipe(
                map( res => {

                    this.isLoading = false;
                    return res.json();
                }), catchError( (err) => {

                    this.isLoading = false;
                    this.showError(err);
                    return throwError( err );
                })
            );
    }
}
