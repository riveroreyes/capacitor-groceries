export interface Receipt {
  id: string;
  fileUri: string;
  total?: number;
  store?: string;
  capturedAt: number;
}
