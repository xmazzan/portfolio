import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


declare var AOS: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'portfolio';
  ngAfterViewInit() {
    AOS.init();
  }
}
