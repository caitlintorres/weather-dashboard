import { Component, Input } from '@angular/core';
import { CurrentWeather } from '../../services/weather.service';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  @Input() data!: CurrentWeather;
  @Input() units: 'metric' | 'imperial' = 'metric';

  get tempUnit() { return this.units === 'metric' ? '°C' : '°F'; }
  get windUnit() { return this.units === 'metric' ? 'm/s' : 'mph'; }
}
