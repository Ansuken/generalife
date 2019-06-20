import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RestproviderService } from './restprovider.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl: string = environment.apiUrl;
    private limit = 500;

    constructor( public provider: RestproviderService ) { }

    findUsers( parameters: Object ) {

        const endpoint = environment.mock ? environment.mockEndpoints.users.getUsersCollection : 'users';
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url, parameters );
    }

    getUserById( id: number ) {

        const endpoint = environment.mock ? environment.mockEndpoints.users.getUserById : 'users/' + id;
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }

    saveUser( user: Object ) {

        const url = this.apiUrl + 'users';
        return this.provider.doPost( url, user );
    }

    updateUser( user: Object ) {

        const url = this.apiUrl + 'users';
        return this.provider.doPut( url, user );
    }

    removeUser( userId: number ) {

        const url = this.apiUrl + 'users/' + userId;
        return this.provider.doDelete( url );
    }
}
