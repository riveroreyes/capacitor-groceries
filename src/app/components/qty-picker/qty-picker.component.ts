import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-qty-picker',
  templateUrl: './qty-picker.component.html',
  imports:[IonicModule]
})
export class QtyPickerComponent {
  @Input() units = ['kg', 'g', 'pcs', 'l', 'ml'];
  @Output() picked = new EventEmitter<{ qty: number, unit: string }>();

  qtyList = Array.from({ length: 20 }, (_, i) => i + 1);

  pick(qty: number, unit: string) {
    this.picked.emit({ qty, unit });
  }
}
