import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-admin-navbar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './admin-navbar.html',
    styleUrl: './admin-navbar.scss',
})
export class AdminNavbar {}
