// src/app/app.component.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';  
declare const AOS: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'portfolio';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (!navigator.geolocation) { return; }
    navigator.geolocation.getCurrentPosition(pos => {
      const url = `${environment.apiUrl}/api/send-location`;  // em dev vira '/api/send-location'
      this.http.post(url, {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }).subscribe({
        error: err => console.error('Erro ao enviar localização', err)
      });
    });
  }

  ngAfterViewInit() {
    AOS.init();
  }
}
