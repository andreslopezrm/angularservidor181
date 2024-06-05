import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import {toSignal} from "@angular/core/rxjs-interop";


interface TimeInfo {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string | null;
  dst_offset: number;
  dst_until: string | null;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
}


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

  http = inject(HttpClient);
  
  time = toSignal(
    this.http.get<TimeInfo>('http://worldtimeapi.org/api/timezone/America/Mexico_City'),
  );

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