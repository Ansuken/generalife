import { Component, OnInit } from '@angular/core';
import { MiscService } from '../../../providers/misc.service';
import { UtilsService } from 'src/app/providers/utils.service';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

    public company: Object;
    public companies: Array<Object>;

    constructor( private _miscService: MiscService,
                private _utils: UtilsService) {

        this.companies = _miscService.getCompaniesCollection();
        this.initForm();
    }

    initForm() {
        this.company = {
            'name': ''
        };
    }

    ngOnInit() {
    }

    createCompany() {
        this.company['idCompany'] = Math.floor((Math.random() * 100) + 1);
        this.companies.push(this.company);
        this.initForm();
    }

    removeCompany( idCompany: number ) {
        this._utils.array.removeItem( this.companies, 'idCompany', idCompany );
    }

}
