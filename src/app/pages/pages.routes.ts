import { RouterModule, Routes, ChildrenOutletContexts } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailComponent } from './projects/projects-detail/projects-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthGuardService } from '../providers/auth/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { EnvironmentsComponent } from './settings/environments/environments.component';
import { CountriesComponent } from './settings/countries/countries.component';
import { CompaniesComponent } from './settings/companies/companies.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { GroupsDetailComponent } from './groups/groups-detail/groups-detail.component';
import { TeamsDetailComponent } from './teams/teams-detail/teams-detail.component';

const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        data: {title: 'Home'},
        children: [
            { path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ], data: {title: 'Home', roles: ['ALL']}  },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            // Users
            { path: 'users', component: UsersComponent, canActivate: [ AuthGuardService ], data: {title: 'Users', roles: ['ALL']} },
            { path: 'users/:id', component: UsersDetailComponent, canActivate: [ AuthGuardService ], data: {title: 'Users', roles: ['ALL']} },
            // Projects
            { path: 'projects', component: ProjectsComponent, canActivate: [ AuthGuardService ], data: {title: 'Projects', roles: ['ALL'] }},
            { path: 'projects/:id', component: ProjectsDetailComponent, canActivate: [ AuthGuardService ], data: {title: 'Projects', roles: ['ALL'] }},
            // Groups
            { path: 'groups', component: GroupsComponent, canActivate: [ AuthGuardService ], data: {title: 'Groups', roles: ['ALL'] }},
            { path: 'groups/:id', component: GroupsDetailComponent, canActivate: [ AuthGuardService ], data: {title: 'Groups', roles: ['ALL'] }},
            // Settings
            { path: 'settings',
                component: SettingsComponent,
                canActivate: [ AuthGuardService ],
                canActivateChild: [ AuthGuardService ],
                data: {title: 'Settings', roles: ['ALL'] },
                children: [
                    { path: '', redirectTo: 'environments', pathMatch: 'full'},
                    { path: 'environments',
                        component: EnvironmentsComponent,
                        data: {roles: ['ALL']} },
                    { path: 'companies',
                        component: CompaniesComponent,
                        data: {roles: ['ALL']} },
                    { path: 'countries',
                        component: CountriesComponent,
                        data: {roles: ['ALL']} },
                ]
            },
            { path: 'not-allowed', component: NotAllowedComponent, canActivate: [ AuthGuardService ], data: {title: 'Not Allowed', roles: ['ALL']} },
            // Teams
            { path: 'teams', component: TeamsComponent, canActivate: [ AuthGuardService ], data: {title: 'Teams', roles: ['ALL'] }},
            { path: 'teams/:id', component: TeamsDetailComponent, canActivate: [ AuthGuardService ], data: {title: 'Teams', roles: ['ALL'] }},
        ]
    }
];

export const PAGES_ROUTING = RouterModule.forRoot(PAGES_ROUTES);
