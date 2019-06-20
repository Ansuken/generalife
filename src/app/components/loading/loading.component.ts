import { Component } from '@angular/core';
import { RestproviderService } from '../../providers/restprovider.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    constructor( public _rp: RestproviderService ) {}
}
