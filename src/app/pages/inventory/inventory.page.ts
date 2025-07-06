import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../core/services/db.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage {
  products: Product[] = [];
  // Formulario de nuevo producto
  newProduct: Partial<Product> = {
    name: '',
    defaultUnit: 'pcs',
    category: ''
  };
  units = ['kg', 'g', 'l', 'ml', 'pcs'];

  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.db.initDB();
    this.products = await this.db.getAllProducts();
  }

  async addProduct() {
    if (!this.newProduct.name || !this.newProduct.defaultUnit) return;

    const product: Product = {
      id: crypto.randomUUID(),
      name: this.newProduct.name!,
      defaultUnit: this.newProduct.defaultUnit!,
      category: this.newProduct.category || ''
    };
    await this.db.addProduct(product);
    this.products = await this.db.getAllProducts();
    this.newProduct = { name: '', defaultUnit: 'pcs', category: '' };
  }

  async deleteProduct(id: string) {
    await this.db.deleteProduct(id);
    this.products = await this.db.getAllProducts();
  }
}
