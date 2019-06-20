import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/configurations/config';
import { ProjectsService } from 'src/app/providers/projects.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/providers/utils.service';
import { MiscService } from 'src/app/providers/misc.service';
import { UsersService } from '../../providers/users.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

    private config = CONFIG;
    public projects: Array<Object>;
    public countries: Array<Object>;
    public environments: Array<Object>;
    public users: Array<Object>;
    private searchTimeout: any;
    public searchProjects = {
        'text': '',
        'environment': '',
        'company': '',
        'country': ''
    };

    constructor( private router: Router,
                public _projectsService: ProjectsService,
                public _miscService: MiscService,
                public _userService: UsersService,
                public _utils: UtilsService ) {

        this.findProjects();
        this.getUsers();
        this.countries = _miscService.getCountriesCollection();
        this.environments = _miscService.getEnvironmentsCollection();

    }

    ngOnInit() {
    }

    getUsers() {
        const params = {};
        this._userService.findUsers( params ).subscribe( data => {
            this.users = data;
        });
    }
    findProjects() {

        if ( this.searchTimeout ) {

            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {

            const params = {};
            /*if ( this.searchUser['text'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
            if ( this.searchUser['environment'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
            if ( this.searchUser['company'] !== 'all' ) { params['companyId.equals'] = this.searchUser['company']; }
            if ( this.searchUser['country'] !== 'all' ) { params['countryId.equals'] = this.searchUser['country']; }*/

            this._projectsService.getProjectsCollection( params ).subscribe( data => {
                this.projects = data;
            });
        }, 300);
    }

    goToProject( user: Object ) {

        this.router.navigate(['/projects', user['id']]);
    }

    removeProject( idProject: number ) {
        if ( idProject ) {
            this._utils.array.removeItem(this.projects, 'idProject', idProject );
        }
    }

    getCountryName( idCountry: number) {
        if ( idCountry ) {
            const country = this._utils.array.selectItem(this.countries, 'idCountry', idCountry );
            return country ? country['name'] : '-';
        }
    }

    getUserName( id: number) {
        if ( id ) {
            const user = this._utils.array.selectItem(this.users, 'id', id );
            return user ? user['firstName'] + ' ' + user['lastName'] : '-';
        }
    }

}
