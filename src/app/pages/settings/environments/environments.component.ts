import { Component, OnInit } from '@angular/core';
import { MiscService } from '../../../providers/misc.service';
import { UtilsService } from 'src/app/providers/utils.service';

@Component({
    selector: 'app-environments',
    templateUrl: './environments.component.html',
    styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

    public environment: Object;
    public countries: Array<Object>;
    public environments: Array<Object>;

    constructor( private _miscService: MiscService,
                private _utils: UtilsService) {

        this.countries = _miscService.getCountriesCollection();
        this.environments = _miscService.getEnvironmentsCollection();
        this.initForm();
    }

    initForm() {
        this.environment = {
            'environmentName': '',
            'environmentDescription': '',
            'idCountry': '',
            'sheetName': ''
        };
    }

    ngOnInit() {
    }

    createEnvironment() {
        this.environment['idEnvironment'] = Math.floor((Math.random() * 100) + 1);
        this.environments.push(this.environment);
        this.initForm();
    }

    removeEnvironment( idEnvironment: number ) {
        this._utils.array.removeItem( this.environments, 'idEnvironment', idEnvironment );
    }

    getCountryName( idCountry: number ) {
        const country = this._utils.array.selectItem( this.countries, 'idCountry', idCountry );
        return country ? country['name'] : '';
    }

}
