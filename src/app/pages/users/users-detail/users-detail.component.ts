import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../providers/users.service';
import { CONFIG } from '../../../configurations/config';
import { MiscService } from '../../../providers/misc.service';
import { UtilsService } from '../../../providers/utils.service';
import { environment } from '../../../../environments/environment';
import { ProjectsService } from '../../../providers/projects.service';
import { TeamsService } from 'src/app/providers/teams.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GroupsService } from 'src/app/providers/groups.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

    private config = CONFIG;
    public colors = environment.colors;
    public user: Object;
    public dataToShow: Array<Object>;
    public companies: Array<Object>;
    public groups: Array<Object>;
    public addUserToAGroupForm = {
        groupId: ''
    };
    public showAddUserToAGroupForm = false;
    public cardBoxType = 'projects';
    public searchGroups = '';
    public fieldsToSearchGroups = ['groupName'];
    constructor( private activatedRoute: ActivatedRoute,
                private _router: Router,
                private _userService: UsersService,
                private _projectsService: ProjectsService,
                private _teamsService: TeamsService,
                private _groupsService: GroupsService,
                private _miscService: MiscService,
                public _utils: UtilsService,
                public ngxSmartModalService: NgxSmartModalService,
                private _location: Location ) {

        this.activatedRoute.params.subscribe( params => {
            _userService.getUserById( params['id'] ).subscribe( userData => {
                this.user = userData;
                this.getCardData();
            });

            this._groupsService.getGroupsCollection().subscribe( data => {
                this.groups = data;
            });

            this.companies = _miscService.getCompaniesCollection();
        });
    }

    ngOnInit() {
    }

    getPictureUrl() {
        return this.config.photoStorageFolder + this.user['uid'] + '.jpg';
    }
    getInlineStyles() {

        if ( this.user ) {

            return {
                // tslint:disable-next-line:max-line-length
                'background-image': 'url(' + this.config.photoStorageFolder + this.user['uid'] + '.jpg), url(../assets/img/' + this.config.defaultProfilePhoto + ')',
                'background-size': 'cover',
                'background-position-x': '50%',
                'background-position-y': '50%',
                'width': '150px',
                'height': '150px',
                'border-radius': '50%',
                'margin': '0 auto'
            };
        }
    }

    getEnvironmentName( environmentId: number ) {
        const environments = this._miscService.getEnvironmentsCollection();
        const env = this._utils.array.selectItem( environments, 'idEnvironment', environmentId );
        return env ? env['environmentName'] : '';
    }
    getEnvironmentColor( environmentId ) {
        const environments = this._miscService.getEnvironmentsCollection();
        const index = environments.findIndex(p => p.idEnvironment === environmentId);
        return {
            'background-color': this.colors[index]
        };
    }

    getCardData() {
        if ( this.cardBoxType === 'projects' ) {
            this.getProjectsByUserId();
        } else if ( this.cardBoxType === 'teams' ) {
            this.getTeamsByUserId();
        }
    }

    getProjectsByUserId() {
        const params = {
            id: this.user['userId']
        };
        this._projectsService.getProjectsCollection( params ).subscribe( data => {
            this.dataToShow = data;
        });
    }

    getTeamsByUserId() {
        const params = {
            id: this.user['userId']
        };
        this._teamsService.getTeamsCollection( params ).subscribe( data => {
            this.dataToShow = data;
        });
    }

    cardBoxToggle() {
        this.cardBoxType = this.cardBoxType === 'projects' ? 'teams' : 'projects';
        this.getCardData();
    }

    addUserToAGroupToggle() {

        this.showAddUserToAGroupForm = !this.showAddUserToAGroupForm;
    }

    handleResultSelected( event ) {
        this.searchGroups = event.groupName;
        this.addUserToAGroup(event);
    }
    addUserToAGroup(event) {
        if ( !this._utils.array.itemExists(this.user['groupSet'], 'idGroup', event['idGroup']) ) {
            this.user['groupSet'].push(event);
        }
        this.showAddUserToAGroupForm = false;
        this.searchGroups = '';
    }

    removeUserFromAGroup( idGroup: number ) {
        this._utils.array.removeItem(this.user['groupSet'], 'idGroup', idGroup );
    }

    saveUser() {

        this._userService.updateUser( this.user ).subscribe( data => {
            this.user = data;
            // this.toastr.success('Empleado actualizado correctamente', '', { positionClass: 'toast-bottom-right' });
        });
    }

    removeUser() {}

    goBack() {
        this._location.back();
    }

}
