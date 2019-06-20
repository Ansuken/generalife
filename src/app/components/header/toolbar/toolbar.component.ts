import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth/auth.service';
import { AccountService } from '../../../providers/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    public flag = 'gb';
    public currentUser: Object;
    constructor( private _auth: AuthService,
                public _accountService: AccountService,
                private translate: TranslateService ) {
                    this.currentUser = _accountService.getUserByToken();
                }
    ngOnInit() {}
    logout() {
        this._auth.logout();
    }

    changeLang() {
        if ( this.flag === 'sp' ) {
            this.flag = 'gb';
            this.translate.use('en');
        } else if ( this.flag === 'gb' ) {
            this.flag = 'sp';
            this.translate.use('es');
        }
    }
}
