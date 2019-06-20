import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../providers/users.service';
import { CONFIG } from '../../configurations/config';
import { MiscService } from '../../providers/misc.service';
import { ProjectsService } from '../../providers/projects.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    private config = CONFIG;
    public teams: Array<Object>;
    public companies: Array<Object>;
    public environments: Array<Object>;
    public projects: Array<Object>;
    public users: Array<Object>;
    public countries: Array<Object>;
    private usersToShow: Array<Object>;
    public searchUser = {
        'text': '',
        'environment': '',
        'company': '',
        'project': ''
    };
    private searchTimeout: any;

    constructor( private router: Router,
                private _projectsService: ProjectsService,
                private _userService: UsersService,
                private _miscService: MiscService ) {

                    this.companies = _miscService.getCompaniesCollection();
                    this.environments = _miscService.getEnvironmentsCollection();
                    this.searchUsers();
                    this.findProjects();
    }

    ngOnInit() {
    }

    searchUsers() {

        if ( this.searchTimeout ) {

            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {

            const params = {};
            /*if ( this.searchUser['text'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
            if ( this.searchUser['environment'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
            if ( this.searchUser['company'] !== 'all' ) { params['companyId.equals'] = this.searchUser['company']; }
            if ( this.searchUser['country'] !== 'all' ) { params['countryId.equals'] = this.searchUser['country']; }*/

            this._userService.findUsers( params ).subscribe( data => {
                this.users = data;
            });
        }, 300);
    }

    findProjects() {
        this._projectsService.getProjectsCollection().subscribe( data => {
            this.projects = data;
        });
    }

    goToUser( user: Object ) {

        this.router.navigate(['/users', user['id']]);
    }

    getInlineStyles( user: any ) {

        if ( user ) {

            let photo = this.config.defaultProfilePhoto;
            let grayScale = 'grayscale(0)';
            let opacity = 1;

            if ( user && user.uid && user.uid !== '' ) {

                photo = user.uid + '.jpg';
            }

            if ( user.deleted ) {

                grayScale = 'grayscale(1)';
                opacity = 0.3;
            }

            return {
                // tslint:disable-next-line:max-line-length
                'background-image': 'url(' + this.config.photoStorageFolder + photo + '), url(../../assets/img/' + this.config.defaultProfilePhoto + ')',
                'filter': grayScale,
                'opacity': opacity
            };
        }
    }

}
