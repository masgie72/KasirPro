/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  stock: number;
  barcode: string;
  category: string;
  imageUrl: string;
  sku?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number; // percentage, e.g. 10 for 10%
}

export interface Transaction {
  id: string;
  invoiceId: string;
  timestamp: string; // ISO string
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    discount: number;
    subtotal: number;
  }[];
  subtotal: number;
  discount: number; // flat value or percent-based calculated
  tax: number; // flat value or percent-based calculated
  total: number;
  paymentMethod: 'CASH' | 'DEBIT' | 'QRIS' | 'E-WALLET';
  paidAmount: number;
  changeAmount: number;
  cashierName: string;
  status: 'SUCCESS' | 'REFUNDED' | 'PENDING';
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}
