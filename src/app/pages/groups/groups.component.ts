import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/configurations/config';
import { GroupsService } from 'src/app/providers/groups.service';
import { Router } from '@angular/router';
import { MiscService } from '../../providers/misc.service';
import { environment } from '../../../environments/environment';
import { UtilsService } from 'src/app/providers/utils.service';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

    private config = CONFIG;
    public colors = environment.colors;
    private searchTimeout: any;
    public groups: Array<Object>;
    public searchGroups = {
        'text': '',
        'environment': '',
        'company': 'all'
    };

    constructor( private router: Router,
                public _groupsService: GroupsService,
                public _miscService: MiscService,
                public _utils: UtilsService ) {

                this.findGroups();
    }

    ngOnInit() {
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

    findGroups() {

        if ( this.searchTimeout ) {

            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {

            const params = {};
            /*if ( this.searchUser['text'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
            if ( this.searchUser['environment'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
            if ( this.searchUser['company'] !== 'all' ) { params['companyId.equals'] = this.searchUser['company']; }
            if ( this.searchUser['country'] !== 'all' ) { params['countryId.equals'] = this.searchUser['country']; }*/

            this._groupsService.getGroupsCollection( params ).subscribe( data => {
                this.groups = data;
            });
        }, 300);
    }

    goToGroup( user: Object ) {

        this.router.navigate(['/groups', user['id']]);
    }

    removeGroup( idGroup: number ) {
        this._utils.array.removeItem(this.groups, 'idGroup', idGroup );
    }

}
