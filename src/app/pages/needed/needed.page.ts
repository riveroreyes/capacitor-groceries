import { Component, OnInit } from '@angular/core';
import { DbService } from '../../core/services/db.service';
import { NeededItem } from '../../core/models/needed-item.model';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-needed',
  templateUrl: './needed.page.html',
  styleUrls: ['./needed.page.scss'],
  imports:[
    IonicModule, CommonModule
  ],
  standalone:true
})
export class NeededPage implements OnInit {
  neededItems: NeededItem[] = [];

  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.db.initDB();
    this.neededItems = await this.db.getAllNeededItems();
  }

  async addNeededItem() {
    // Aquí deberías abrir un picker o modal. Ejemplo básico:
    const newItem: NeededItem = {
      id: crypto.randomUUID(),
      productId: 'rice', // Idealmente eliges de una lista real de productos
      requiredQty: 1,
      unit: 'kg',
      addedAt: Date.now(),
    };
    await this.db.addNeededItem(newItem);
    // Actualiza la lista
    this.neededItems = await this.db.getAllNeededItems();
  }  
}
