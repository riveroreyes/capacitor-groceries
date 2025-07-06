import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'needed',
    loadComponent: () =>
      import('./pages/needed/needed.page').then((m) => m.NeededPage),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./pages/inventory/inventory.page').then((m) => m.InventoryPage),
  },
   {
    path: 'purchases',
    loadComponent: () =>
      import('./pages/purchases/purchases.page').then((m) => m.PurchasesPage),
  },  
];
