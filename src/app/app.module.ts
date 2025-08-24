import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { UnitToggleComponent } from './components/unit-toggle/unit-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    UnitToggleComponent
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
