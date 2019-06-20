import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestproviderService } from '../providers/restprovider.service';

@Injectable({
    providedIn: 'root'
})
export class GroupsService {

    private apiUrl: string = environment.apiUrl;
    private limit = 100;

    constructor( public provider: RestproviderService ) {}

    getGroupsCollection( params?: Object ) {

        const endpoint = environment.mock ? environment.mockEndpoints.groups.getGroupsCollection : 'groups';
        const url = this.apiUrl + endpoint;
        return params ? this.provider.doGet( url, params ) : this.provider.doGet( url );
    }

    getGroupById( id: number ) {

        const endpoint = environment.mock ? environment.mockEndpoints.groups.getGroupById : 'groups/' + id;
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }
}
