import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnitService {
  private key = 'wd_units';
  private _units: 'metric' | 'imperial' =
    (localStorage.getItem(this.key) as 'metric' | 'imperial') || 'metric';

  get units() { return this._units; }
  set units(v: 'metric' | 'imperial') {
    this._units = v;
    localStorage.setItem(this.key, v);
  }
}
