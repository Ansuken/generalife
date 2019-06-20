import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestproviderService } from '../providers/restprovider.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    private apiUrl: string = environment.apiUrl;
    private limit = 100;

    constructor( public provider: RestproviderService ) {}

    getProjectsCollection( params?: Object ) {

        const endpoint = environment.mock ? environment.mockEndpoints.projects.getProjectsCollection : 'projects';
        const url = this.apiUrl + endpoint;
        return params ? this.provider.doGet( url, params ) : this.provider.doGet( url );
    }

    getProjectById( id: number ) {

        const endpoint = environment.mock ? environment.mockEndpoints.projects.getProjectById : 'projects/' + id;
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }
}
