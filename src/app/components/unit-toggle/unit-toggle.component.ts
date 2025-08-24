import { Component, EventEmitter, Output } from '@angular/core';
import { UnitService } from '../../state/unit.service';

@Component({
  selector: 'unit-toggle',
  template: `
    <div class="toggle" role="group" aria-label="Units">
      <button [class.active]="unit.units==='metric'" (click)="set('metric')">°C</button>
      <button [class.active]="unit.units==='imperial'" (click)="set('imperial')">°F</button>
    </div>
  `,
  styles: [`
    .toggle { display:flex; gap:.5rem; }
    button { border:1px solid #ddd; padding:.4rem .7rem; border-radius:.5rem; background:#fff; cursor:pointer; }
    .active { border-color:#1976d2; }
  `]
})
export class UnitToggleComponent {
  @Output() changed = new EventEmitter<void>();
  constructor(public unit: UnitService) {}
  set(u: 'metric' | 'imperial') { this.unit.units = u; this.changed.emit(); }
}
