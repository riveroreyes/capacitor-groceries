import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteDBConnection,
  SQLiteConnection,
} from '@capacitor-community/sqlite';
import { NeededItem } from '../models/needed-item.model';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { Receipt } from '../models/receipt.model';

@Injectable({ providedIn: 'root' })
export class DbService {
  private sqlite!: SQLiteConnection;          // wrapper instance
  private db: SQLiteDBConnection | null = null;

  async initDB(): Promise<void> {
    debugger
    /* ---------- WEB bootstrap (jeep-sqlite) ---------- */
    if (Capacitor.getPlatform() === 'web') {
      // 1. wait until the custom element is upgraded
      await customElements.whenDefined('jeep-sqlite');
      // 2. build the wrapper *after* the element is ready
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      // 3. mandatory in web: open the IndexedDB backing store
      await this.sqlite.initWebStore();
    } else {
      // Native: just create the wrapper
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }

    /* ---------- Create/Get the connection ---------- */
    // reuse an existing connection if it was already opened
    const isConn = (await this.sqlite.isConnection('grocerydb', false)).result;
    if (isConn) {
      this.db = await this.sqlite.retrieveConnection('grocerydb', false);
    } else {
      this.db = await this.sqlite.createConnection(
        'grocerydb',          // database name
        false,                // not encrypted
        'no-encryption',      // mode
        1,                    // version
        false                 // read-write
      );
    }

    await this.db.open();     // <— no error now
    await this.createTables();
  }


  private async createTables() {
    await this.db?.execute(`
      CREATE TABLE IF NOT EXISTS product (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        defaultUnit TEXT,
        category TEXT
      );
      CREATE TABLE IF NOT EXISTS needed_item (
        id TEXT PRIMARY KEY,
        productId TEXT,
        requiredQty REAL,
        unit TEXT,
        addedAt INTEGER
      );
      CREATE TABLE IF NOT EXISTS purchase (
        id TEXT PRIMARY KEY,
        productId TEXT,
        neededId TEXT,
        qty REAL,
        unit TEXT,
        price REAL,
        purchasedAt INTEGER,
        receiptId TEXT
      );
      CREATE TABLE IF NOT EXISTS receipt (
        id TEXT PRIMARY KEY,
        fileUri TEXT,
        total REAL,
        store TEXT,
        capturedAt INTEGER
      );
    `);
  }

  async addNeededItem(item: NeededItem) {
    await this.db?.run(
      'INSERT INTO needed_item (id, productId, requiredQty, unit, addedAt) VALUES (?,?,?,?,?)',
      [item.id, item.productId, item.requiredQty, item.unit, item.addedAt]
    );
  }

  async getAllNeededItems(): Promise<NeededItem[]> {
    const res = await this.db?.query('SELECT * FROM needed_item');
    return res?.values as NeededItem[] || [];
  }

async addProduct(product: Product) {
  await this.db?.run(
    'INSERT INTO product (id, name, defaultUnit, category) VALUES (?,?,?,?)',
    [product.id, product.name, product.defaultUnit, product.category]
  );
}

async getAllProducts(): Promise<Product[]> {
  const res = await this.db?.query('SELECT * FROM product');
  return res?.values as Product[] || [];
}

async deleteProduct(id: string) {
  await this.db?.run('DELETE FROM product WHERE id=?', [id]);
}

// db.service.ts

async getAllPurchases(): Promise<Purchase[]> {
  const res = await this.db?.query('SELECT * FROM purchase ORDER BY purchasedAt DESC');
  return res?.values as Purchase[] || [];
}

async getAllReceipts(): Promise<Receipt[]> {
  const res = await this.db?.query('SELECT * FROM receipt');
  return res?.values as Receipt[] || [];
}

async deletePurchase(id: string) {
  await this.db?.run('DELETE FROM purchase WHERE id=?', [id]);
}


}
