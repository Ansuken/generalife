import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthService } from './providers/auth/auth.service';
import { AuthGuardService } from './providers/auth/auth-guard.service';

// Pages Components
import { LoginComponent } from './pages/login/login.component';
import { NoAuthComponent } from './pages/no-auth/no-auth.component';

// Routes
import { APP_ROUTING } from './app.routes';

// Services
import { AccountService } from './providers/account.service';
import { UtilsService } from './providers/utils.service';
import { ProjectsService } from './providers/projects.service';
import { RestproviderService } from './providers/restprovider.service';
import { MiscService } from './providers/misc.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NoAuthComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        JsonpModule,
        FormsModule,
        PagesModule,
        APP_ROUTING,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        RestproviderService,
        AuthService,
        AuthGuardService,
        AccountService,
        ProjectsService,
        MiscService,
        UtilsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
