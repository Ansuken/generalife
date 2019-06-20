import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

    selectedItems: any[] = [];

    checkIfExist ( items: any, fields: any, value: any ) {

        let found = false;
        let strings: any;

        for ( const item of items ) {

            found = false;

            strings = value.split(' ');

            for ( const string of strings ) {

                if ( string.length > 0 ) {

                    for ( const field of fields ) {

                        if ( !isNaN(parseFloat(item[field])) && isFinite(item[field]) ) {

                            found = found || item[field] === parseInt(string, 0);
                        } else {

                            found = found || item[field].toLowerCase().match(string.toLowerCase());
                        }

                        if ( item instanceof Array ) {

                            this.checkIfExist ( item, field, value);
                        }
                    }
                }
            }

            if ( found ) { this.selectedItems.push (item ); }
        }
    }

    transform( items: any[], field: any[], value: any ): any {

        this.selectedItems = [];

        if ( !items ) { return []; }
        if ( value === '' ) { return items; }

        this.checkIfExist( items, field, value );

        return this.selectedItems;
    }
}
