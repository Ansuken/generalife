import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { RestproviderService } from '../providers/restprovider.service';

@Injectable({
    providedIn: 'root'
})
export class MiscService {

    private apiUrl: string = environment.apiUrl;
    private limit = 10;

    constructor( public provider: RestproviderService ) { }

    // Companies
    loadCompaniesCollection() {
        const endpoint = environment.mock ? environment.mockEndpoints.misc.getCompaniesCollection : 'companies';
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }
    getCompaniesCollection() {
        return JSON.parse(localStorage.getItem('companies'));
    }

    // Countries
    loadCountriesCollection() {
        const endpoint = environment.mock ? environment.mockEndpoints.misc.getCountriesCollection : 'countries';
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }
    getCountriesCollection() {
        return JSON.parse(localStorage.getItem('countries'));
    }

    // Environments
    loadEnvironmentsCollection() {
        const endpoint = environment.mock ? environment.mockEndpoints.misc.getEnvironmentsCollection : 'environments';
        const url = this.apiUrl + endpoint;
        return this.provider.doGet( url );
    }
    getEnvironmentsCollection() {
        return JSON.parse(localStorage.getItem('environments'));
    }
}
