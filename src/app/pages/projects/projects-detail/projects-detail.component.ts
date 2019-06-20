import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../providers/projects.service';
import { MiscService } from '../../../providers/misc.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UtilsService } from 'src/app/providers/utils.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit {

    public project: Object;
    public projects: Array<Object>;
    public countries: Array<Object>;
    public users: Array<Object>;
    public environments: Array<Object>;
    public showSubprojectForm = false;
    public showUserForm = false;
    public searchProject = '';
    public searchUser = '';
    public fieldsToSearchProjects = ['name'];
    public fieldsToSearchUsers = ['firstName', 'lastName'];
    constructor( private activatedRoute: ActivatedRoute,
                private _projectsService: ProjectsService,
                private _miscService: MiscService,
                private _userService: UsersService,
                public ngxSmartModalService: NgxSmartModalService,
                public _utils: UtilsService,
                private _location: Location
                ) {
        this.activatedRoute.params.subscribe( params => {
            _projectsService.getProjectById( params['id'] ).subscribe( projectData => {
                this.project = projectData;
            });
            _projectsService.getProjectsCollection().subscribe( projectData => {
                this.projects = projectData;
            });
            _userService.findUsers( params ).subscribe( data => {
                this.users = data;
            });
            this.countries = _miscService.getCountriesCollection();
            this.environments = _miscService.getEnvironmentsCollection();
        });
    }

    ngOnInit() {
    }

    /* Add Project functions */
    addSubprojectToggle() {
        this.showSubprojectForm = !this.showSubprojectForm;
    }
    handleProjectResultSelected( event ) {
        this.searchProject = event.groupName;
        this.addProjectToAGroup(event);
    }
    addProjectToAGroup(event) {
        if ( !this.project['subProjects'] ) {
            this.project['subProjects'] = [];
        }
        if ( !this._utils.array.itemExists(this.project['subProjects'], 'idProject', event['idProject']) ) {
            this.project['subProjects'].push(event);
        }
        this.showSubprojectForm = false;
        this.searchProject = '';
    }
    removeSubproject( idProject: number ) {
        this._utils.array.removeItem(this.project['subProjects'], 'idProject', idProject );
    }

    /* Add User functions */
    addUserToggle() {
        this.showUserForm = !this.showUserForm;
    }
    handleUserResultSelected( event ) {
        this.searchUser = event.firstName;
        this.addUserToAGroup(event);
    }
    addUserToAGroup(event) {
        if ( !this.project['users'] ) {
            this.project['users'] = [];
        }
        if ( !this._utils.array.itemExists(this.project['users'], 'id', event['id']) ) {
            this.project['users'].push(event);
        }
        this.showUserForm = false;
        this.searchUser = '';
    }
    removeUser( id: number ) {
        this._utils.array.removeItem(this.project['users'], 'id', id );
    }

    saveProject() { console.log('Project saved'); }

    removeProject() { console.log('Project removed'); }

    goBack() {
        this._location.back();
    }

}
