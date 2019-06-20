import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

    constructor( private translate: TranslateService ) {

        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit() {}
}
