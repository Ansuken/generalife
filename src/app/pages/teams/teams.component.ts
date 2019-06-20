import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/configurations/config';
import { TeamsService } from 'src/app/providers/teams.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/providers/utils.service';
import { MiscService } from 'src/app/providers/misc.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

    private config = CONFIG;
    public teams: Array<Object>;
    public environments: Array<Object>;
    private searchTimeout: any;
    public searchTeams = {
        'text': '',
        'environment': ''
    };

    constructor( private router: Router,
        public _teamsService: TeamsService,
        public _miscService: MiscService,
        public _utils: UtilsService ) {

        this.findTeams();
        this.environments = _miscService.getEnvironmentsCollection();
    }

    ngOnInit() {
    }

    findTeams() {

        const params = {};
        /*if ( this.searchUser['text'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
        if ( this.searchUser['environment'] !== '' ) { params['fullName.contains'] = this.searchUser['text']; }
        if ( this.searchUser['company'] !== 'all' ) { params['companyId.equals'] = this.searchUser['company']; }
        if ( this.searchUser['country'] !== 'all' ) { params['countryId.equals'] = this.searchUser['country']; }*/

        this._teamsService.getTeamsCollection( params ).subscribe( data => {
            this.teams = data;
        });
    }

    removeTeam( id: number ) {
        if ( id ) {
            this._utils.array.removeItem(this.teams, 'id', id );
        }
    }

}
