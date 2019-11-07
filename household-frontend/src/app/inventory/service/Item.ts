export interface Item {
  id: string;
  barcode?: string;
  name: string;
  location: string;
  count: number;
  target?: number;
  value?: number;
  description?: string;
}
