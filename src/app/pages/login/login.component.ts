import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor( private _auth: AuthService ) { }

    ngOnInit() {}

    login() {
        this._auth.login( this.username, this.password );
    }
}
