import { Component } from '@angular/core';

interface MenuItem {
    path: string;
    ico: string;
    name: string;
    parent_id?: string;
    description: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    public menuItems: MenuItem[] = [];

    constructor() {}

    menuHasChilds( menuItem: MenuItem ) {

        return menuItem['childs'] && menuItem['childs'].length > 0;
    }
}
