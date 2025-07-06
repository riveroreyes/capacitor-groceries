import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DbService } from '../../core/services/db.service';
import { Purchase } from '../../core/models/purchase.model';
import { Product } from '../../core/models/product.model';
import { Receipt } from '../../core/models/receipt.model';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage {
  purchases: (Purchase & { productName?: string; receiptUri?: string })[] = [];

  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.db.initDB();
    await this.loadPurchases();
  }

  async loadPurchases() {
    // Cargar compras y mapear nombres de productos y recibos
    const purchases = await this.db.getAllPurchases();
    const products = await this.db.getAllProducts();
    const receipts = await this.db.getAllReceipts();

    this.purchases = purchases.map(p => {
      const product = products.find(prod => prod.id === p.productId);
      const receipt = receipts.find(r => r.id === p.receiptId);
      return {
        ...p,
        productName: product?.name || 'Unknown',
        receiptUri: receipt?.fileUri,
      };
    });
  }

  async deletePurchase(id: string) {
    await this.db.deletePurchase(id);
    await this.loadPurchases();
  }

  // Opcional: ver imagen del recibo en grande
  selectedReceipt: string | null = null;
  showReceipt(uri: string) {
    this.selectedReceipt = uri;
  }
  closeReceipt() {
    this.selectedReceipt = null;
  }
}
