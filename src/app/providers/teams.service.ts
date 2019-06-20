import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestproviderService } from '../providers/restprovider.service';

@Injectable({
    providedIn: 'root'
})
export class TeamsService {

    private apiUrl: string = environment.apiUrl;
    private limit = 100;

    constructor( public provider: RestproviderService ) {}

    getTeamsCategoriesCollection() {

        const endpoint = environment.mock ? environment.mockEndpoints.teams.getTeamsCategoriesCollection : 'team-categories';
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }

    getTeamsCollection( params?: Object ) {

        const endpoint = environment.mock ? environment.mockEndpoints.teams.getTeamsCollection : 'teams';
        const url = this.apiUrl + endpoint;
        return params ? this.provider.doGet( url, params ) : this.provider.doGet( url );
    }

    getTeamById( id: number ) {

        const endpoint = environment.mock ? environment.mockEndpoints.teams.getTeamById : 'teams/' + id;
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }
}
