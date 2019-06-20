import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from '../../../providers/teams.service';
import { MiscService } from '../../../providers/misc.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UtilsService } from 'src/app/providers/utils.service';


@Component({
    selector: 'app-teams-detail',
    templateUrl: './teams-detail.component.html',
    styleUrls: ['./teams-detail.component.scss']
})
export class TeamsDetailComponent implements OnInit {

    public team: Object;
    constructor( private activatedRoute: ActivatedRoute,
                private _teamsService: TeamsService,
                private _miscService: MiscService,
                public ngxSmartModalService: NgxSmartModalService,
                public _utils: UtilsService,
                private _location: Location
                ) {
        this.activatedRoute.params.subscribe( params => {
            _teamsService.getTeamById( params['id'] ).subscribe( groupData => {
                this.team = groupData;
            });
        });
    }

    ngOnInit() {
    }

    saveTeam() { console.log('Team saved'); }

    removeTeam() { console.log('Team removed'); }

    goBack() {
        this._location.back();
    }

}
