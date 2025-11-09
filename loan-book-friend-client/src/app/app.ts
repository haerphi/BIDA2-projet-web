import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/layout/navbar/navbar';
import { CustomModal } from '@components/layout/custom-modal/custom-modal.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Navbar, CustomModal],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('loan-book-friend-client');
}
