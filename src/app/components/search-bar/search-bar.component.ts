import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { UnitService } from '../../state/weather.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() defaultCity = 'Seattle';
  @Output() cityChange = new EventEmitter<string>();
  @Output() result = new EventEmitter<{current:any; forecast:any[]; error?:string; loading:boolean}>();

  form = new FormGroup({ city: new FormControl('', [Validators.required, Validators.minLength(2)]) });
  recent: string[] = [];

  constructor(private weather: WeatherService, private unit: UnitService) {}

  ngOnInit() {
    this.form.patchValue({ city: this.defaultCity });
    this.recent = JSON.parse(localStorage.getItem('wd_recent') || '[]');
    this.search();
  }

  private pushRecent(city: string) {
    const list = [city, ...this.recent.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    this.recent = list;
    localStorage.setItem('wd_recent', JSON.stringify(list));
  }

  selectCity(c: string) { this.form.patchValue({ city: c }); this.search(); }

  search() {
    const city = this.form.value.city?.trim();
    if (!city) return;
    this.result.emit({ current: null, forecast: [], loading: true });
    this.cityChange.emit(city);

    this.weather.currentByCity(city, this.unit.units).subscribe({
      next: (current) => {
        this.weather.forecastByCity(city, this.unit.units).subscribe({
          next: (forecast) => {
            this.pushRecent(city);
            this.result.emit({ current, forecast, loading: false });
          },
          error: (e) => this.result.emit({ current: null, forecast: [], error: e?.error?.message || 'Failed to load forecast', loading: false })
        });
      },
      error: (e) => this.result.emit({ current: null, forecast: [], error: e?.error?.message || 'City not found', loading: false })
    });
  }
}
