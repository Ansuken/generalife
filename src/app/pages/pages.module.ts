import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Pages Components
import { PagesComponent } from './pages.component';

// HOME
import { HomeComponent } from './home/home.component';

// USERS
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';

// TEAMS
import { TeamsComponent } from './teams/teams.component';

// PROJECTS
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailComponent } from './projects/projects-detail/projects-detail.component';

// GROUPS
import { GroupsComponent } from './groups/groups.component';

// SETTINGS
import { SettingsComponent } from './settings/settings.component';
import { NotAllowedComponent } from '../pages/not-allowed/not-allowed.component';

// Components
import { LoadingComponent } from '../components/loading/loading.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { NavbarComponent } from '../components/header/navbar/navbar.component';
import { ToolbarComponent } from '../components/header/toolbar/toolbar.component';

// Pipes
import { OrderbyPipe } from '../pipes/orderby.pipe';
import { SearchfilterPipe } from '../pipes/searchfilter.pipe';

import { PAGES_ROUTING } from './pages.routes';

// External libraries
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { EnvironmentsComponent } from './settings/environments/environments.component';
import { CountriesComponent } from './settings/countries/countries.component';
import { CompaniesComponent } from './settings/companies/companies.component';
import { GroupsDetailComponent } from './groups/groups-detail/groups-detail.component';
import { TeamsDetailComponent } from './teams/teams-detail/teams-detail.component';

@NgModule({

    declarations: [
        PagesComponent,
        LoadingComponent,
        HomeComponent,
        SidebarComponent,
        HeaderComponent,
        NavbarComponent,
        ToolbarComponent,
        OrderbyPipe,
        SearchfilterPipe,
        UsersComponent,
        UsersDetailComponent,
        TeamsComponent,
        ProjectsComponent,
        GroupsComponent,
        ProjectsDetailComponent,
        SettingsComponent,
        EnvironmentsComponent,
        CountriesComponent,
        CompaniesComponent,
        NotAllowedComponent,
        GroupsDetailComponent,
        TeamsDetailComponent
    ],
    exports: [
        LoadingComponent,
        HomeComponent,
        SidebarComponent,
        HeaderComponent,
        NavbarComponent,
        ToolbarComponent,
        OrderbyPipe,
        SearchfilterPipe
    ],
    // Don't forget to add the component to entryComponents section
    entryComponents: [
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgxTypeaheadModule,
        NgxSmartModalModule.forRoot(),
        TranslateModule,
        PAGES_ROUTING
    ],
    providers: []
})

export class PagesModule {}
