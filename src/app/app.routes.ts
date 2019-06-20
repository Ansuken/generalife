import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NoAuthComponent } from './pages/no-auth/no-auth.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'no-auth', component: NoAuthComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
