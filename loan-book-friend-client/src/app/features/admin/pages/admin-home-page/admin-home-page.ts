import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbar } from '@components/layout/admin-navbar/admin-navbar';

@Component({
    selector: 'app-admin-home-page',
    imports: [AdminNavbar, RouterOutlet],
    templateUrl: './admin-home-page.html',
    styleUrl: './admin-home-page.scss',
})
export class AdminHomePage {}
