import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../../../providers/groups.service';
import { MiscService } from '../../../providers/misc.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UtilsService } from 'src/app/providers/utils.service';
import { ProjectsService } from '../../../providers/projects.service';

@Component({
    selector: 'app-groups-detail',
    templateUrl: './groups-detail.component.html',
    styleUrls: ['./groups-detail.component.scss']
})
export class GroupsDetailComponent implements OnInit {

    public group: Object;
    public groups: Array<Object>;
    public projects: Array<Object>;
    public environments: Array<Object>;
    public searchGroups = '';
    public fieldsToSearchGroups = ['name'];
    constructor( private activatedRoute: ActivatedRoute,
                private _groupsService: GroupsService,
                private _projectsService: ProjectsService,
                private _miscService: MiscService,
                public ngxSmartModalService: NgxSmartModalService,
                public _utils: UtilsService,
                private _location: Location
                ) {
        this.activatedRoute.params.subscribe( params => {
            _groupsService.getGroupById( params['id'] ).subscribe( groupData => {
                this.group = groupData;
            });
            _projectsService.getProjectsCollection().subscribe( projectData => {
                this.projects = projectData;
            });
            this.environments = _miscService.getEnvironmentsCollection();
        });
    }

    ngOnInit() {
    }

    saveGroup() { console.log('Group saved'); }

    removeGroup() { console.log('Group removed'); }

    goBack() {
        this._location.back();
    }

}
