import { Component } from '@angular/core';
import { UnitService } from './state/unit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  city = 'Seattle';
  loading = false;
  error = '';
  current: any = null;
  forecast: any[] = [];

  constructor(public unit: UnitService) {}

  onSearch(city: string) { this.city = city; }
  onWeatherLoaded(evt: { current: any; forecast: any[]; error?: string; loading: boolean }) {
    this.current = evt.current;
    this.forecast = evt.forecast;
    this.error = evt.error ?? '';
    this.loading = evt.loading;
  }
}
