export interface Purchase {
  id: string;
  productId: string;
  neededId?: string;
  qty: number;
  unit: string;
  price?: number;
  purchasedAt: number;
  receiptId?: string;
}
