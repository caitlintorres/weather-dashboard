import { Component, Input } from '@angular/core';
import dayjs from 'dayjs';
import { ForecastItem } from '../../services/weather.service';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input() items: ForecastItem[] = [];
  @Input() units: 'metric' | 'imperial' = 'metric';
  get tempUnit() { return this.units === 'metric' ? '°C' : '°F'; }
  d = (ts: number) => dayjs(ts * 1000).format('ddd, MMM D');
}
