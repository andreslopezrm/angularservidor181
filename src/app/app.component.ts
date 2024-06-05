import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SsrCookieService],
})
export class AppComponent {
  initial = signal('inicio')
  value = signal(this.cookieService.get('Test'))
  constructor(
    private cookieService: SsrCookieService
  ) {}
  generate() {
    this.cookieService.set('Test', 'Hello World');
  }
}


/*
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SsrCookieService],
})
export class AppComponent {
  initial = signal('inicio')
  value = signal(this.cookieService.get('Test'))
  constructor(private cookieService: SsrCookieService) {}
  generate() {
    this.cookieService.set('Test', 'Hello World');
  }
}

*/