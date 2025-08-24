import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface CurrentWeather {
  name: string;
  country: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  description: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  currentByCity(city: string, units: 'metric' | 'imperial'): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', environment.openWeatherApiKey)
      .set('units', units);

    return this.http.get<any>(`${this.base}/weather`, { params }).pipe(
      map(r => ({
        name: r.name,
        country: r.sys.country,
        temp: r.main.temp,
        feelsLike: r.main.feels_like,
        description: r.weather?.[0]?.description ?? '',
        icon: r.weather?.[0]?.icon ?? '01d',
        humidity: r.main.humidity,
        wind: r.wind.speed
      }))
    );
  }

  // 5-day / 3-hour forecast → reduce to 5 daily mid-day entries
  forecastByCity(city: string, units: 'metric' | 'imperial'): Observable<ForecastItem[]> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', environment.openWeatherApiKey)
      .set('units', units);

    return this.http.get<any>(`${this.base}/forecast`, { params }).pipe(
      map(r => {
        // Pick one item per day around 12:00
        const byDay: Record<string, any[]> = {};
        for (const item of r.list) {
          const day = item.dt_txt.split(' ')[0];
          byDay[day] = byDay[day] || [];
          byDay[day].push(item);
        }
        const result: ForecastItem[] = Object.values(byDay)
          .slice(0, 5) // first 5 days
          .map((items: any[]) => {
            const midday = items.find(i => i.dt_txt.includes('12:00:00')) ?? items[Math.floor(items.length/2)];
            return {
              dt: midday.dt,
              temp: midday.main.temp,
              description: midday.weather?.[0]?.description ?? '',
              icon: midday.weather?.[0]?.icon ?? '01d'
            };
          });
        return result;
      })
    );
  }
}
