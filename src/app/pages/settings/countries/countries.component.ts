import { Component, OnInit } from '@angular/core';
import { MiscService } from '../../../providers/misc.service';
import { UtilsService } from 'src/app/providers/utils.service';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

    public country: Object;
    public countries: Array<Object>;

    constructor( private _miscService: MiscService,
                private _utils: UtilsService) {

        this.countries = _miscService.getCountriesCollection();
        this.initForm();
    }

    initForm() {
        this.country = {
            'name': ''
        };
    }

    ngOnInit() {
    }

    createCountry() {
        this.country['idCountry'] = Math.floor((Math.random() * 100) + 1);
        this.countries.push(this.country);
        this.initForm();
    }

    removeCountry( idCountry: number ) {
        this._utils.array.removeItem( this.countries, 'idCountry', idCountry );
    }
}
