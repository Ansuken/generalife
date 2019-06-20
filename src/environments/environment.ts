// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: './assets/mocks/',
    roles: [
        {
            name: 'PEOPLE',
            routes: ['/login', '/users', '/users/new']
        },
        {
            name: 'FINANCIAL',
            routes: []
        }
    ],
    colors: ['#4da1ff', '#fa4251', '#8e24aa', '#0A7EFF', '#00b26f', '#ff8300', '#053F7F'],
    mock: true,
    mockEndpoints:
    {
        authenticate: 'authenticate.json',
        users: {
            getUsersCollection: 'users.json',
            getUserById: 'users/1.json',
            getUserByTeamId: 'teams/1/users.json',
            getUserImputations: 'users/1/imputations.json',
            getLeaves: 'users/1/leave-requests.json'

        },
        misc: {
            getCompaniesCollection: 'companies.json',
            getCountriesCollection: 'countries.json',
            getEnvironmentsCollection: 'environments.json'
        },
        teams: {
            getTeamsCategoriesCollection: 'team-categories.json',
            getImputationProjects: 'imputation-projects.json',
            getTeamsCollection: 'teams.json',
            getTeamsByUserId: 'users/1/teams.json',
            getTeamById: 'teams/1.json'
        },
        billableProfile: {
            getBillableProfiles: 'billable-profile.json'
        },
        projects: {
            getProjectsCollection: 'projects.json',
            getProjectById: 'projects/14.json',
        },
        groups: {
            getGroupsCollection: 'groups.json',
            getGroupById: 'groups/1.json'
        }
    }
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
