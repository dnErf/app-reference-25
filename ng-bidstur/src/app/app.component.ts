import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeadComponent } from './components/head/head.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeadComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    ngOnInit() {
        initFlowbite();
    }
}
