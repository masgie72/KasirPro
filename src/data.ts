/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, Transaction } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'all', name: 'Semua Produk', iconName: 'Grid' },
  { id: 'minuman', name: 'Minuman', iconName: 'Coffee' },
  { id: 'makanan', name: 'Makanan / Roti', iconName: 'Apple' },
  { id: 'snak', name: 'Snack', iconName: 'Cookie' },
  { id: 'sembako', name: 'Sembako', iconName: 'ShoppingBag' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kopi Susu Gula Aren',
    price: 15000,
    cost: 8000,
    stock: 42,
    barcode: '8991234560010',
    category: 'minuman',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-2',
    name: 'Keripik Singkong Balado',
    price: 8500,
    cost: 4500,
    stock: 85,
    barcode: '8991234560027',
    category: 'snak',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d20?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-3',
    name: 'Teh Botol Melati 450ml',
    price: 6000,
    cost: 3200,
    stock: 120,
    barcode: '8991234560034',
    category: 'minuman',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-4',
    name: 'Mie Instan Goreng Spesial',
    price: 3500,
    cost: 2400,
    stock: 230,
    barcode: '8991234560041',
    category: 'sembako',
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-5',
    name: 'Minyak Goreng Sawit 1L',
    price: 18500,
    cost: 14000,
    stock: 14,
    barcode: '8991234560058',
    category: 'sembako',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-6',
    name: 'Susu UHT Cokelat 250ml',
    price: 6500,
    cost: 4100,
    stock: 62,
    barcode: '8991234560065',
    category: 'minuman',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-7',
    name: 'Roti Tawar Serat Kupas',
    price: 14500,
    cost: 9500,
    stock: 7,
    barcode: '8991234560072',
    category: 'makanan',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'prod-8',
    name: 'Cokelat Susu Bar 80g',
    price: 12000,
    cost: 7000,
    stock: 35,
    barcode: '8991234560089',
    category: 'snak',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=300&auto=format&fit=crop'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-001',
    invoiceId: 'INV-20260605-001',
    timestamp: '2026-06-05T08:15:00Z',
    items: [
      { productId: 'prod-1', name: 'Kopi Susu Gula Aren', price: 15000, quantity: 2, discount: 0, subtotal: 30000 },
      { productId: 'prod-6', name: 'Susu UHT Cokelat 250ml', price: 6500, quantity: 1, discount: 0, subtotal: 6500 }
    ],
    subtotal: 36500,
    discount: 0,
    tax: 3650, // PPN 10%
    total: 40150,
    paymentMethod: 'QRIS',
    paidAmount: 40150,
    changeAmount: 0,
    cashierName: 'Ahmad',
    status: 'SUCCESS'
  },
  {
    id: 'tx-002',
    invoiceId: 'INV-20260605-002',
    timestamp: '2026-06-05T09:40:00Z',
    items: [
      { productId: 'prod-7', name: 'Roti Tawar Serat Kupas', price: 14500, quantity: 1, discount: 10, subtotal: 13050 },
      { productId: 'prod-3', name: 'Teh Botol Melati 450ml', price: 6000, quantity: 3, discount: 0, subtotal: 18000 }
    ],
    subtotal: 31050,
    discount: 1450,
    tax: 3105,
    total: 34155,
    paymentMethod: 'CASH',
    paidAmount: 50000,
    changeAmount: 15845,
    cashierName: 'Ahmad',
    status: 'SUCCESS'
  },
  {
    id: 'tx-003',
    invoiceId: 'INV-20260605-003',
    timestamp: '2026-06-05T10:12:00Z',
    items: [
      { productId: 'prod-4', name: 'Mie Instan Goreng Spesial', price: 3500, quantity: 10, discount: 5, subtotal: 33250 },
      { productId: 'prod-5', name: 'Minyak Goreng Sawit 1L', price: 18500, quantity: 2, discount: 0, subtotal: 37000 }
    ],
    subtotal: 70250,
    discount: 1750,
    tax: 7025,
    total: 77275,
    paymentMethod: 'DEBIT',
    paidAmount: 77275,
    changeAmount: 0,
    cashierName: 'Siti',
    status: 'SUCCESS'
  },
  {
    id: 'tx-004',
    invoiceId: 'INV-20260530-019',
    timestamp: '2026-06-04T15:20:00Z',
    items: [
      { productId: 'prod-2', name: 'Keripik Singkong Balado', price: 8500, quantity: 4, discount: 0, subtotal: 34000 }
    ],
    subtotal: 34000,
    discount: 0,
    tax: 3400,
    total: 37400,
    paymentMethod: 'E-WALLET',
    paidAmount: 37400,
    changeAmount: 0,
    cashierName: 'Siti',
    status: 'SUCCESS'
  },
  {
    id: 'tx-005',
    invoiceId: 'INV-20260603-045',
    timestamp: '2026-06-03T11:05:00Z',
    items: [
      { productId: 'prod-1', name: 'Kopi Susu Gula Aren', price: 15000, quantity: 4, discount: 0, subtotal: 60000 },
      { productId: 'prod-8', name: 'Cokelat Susu Bar 80g', price: 12000, quantity: 2, discount: 0, subtotal: 24000 }
    ],
    subtotal: 84000,
    discount: 0,
    tax: 8400,
    total: 92400,
    paymentMethod: 'QRIS',
    paidAmount: 92400,
    changeAmount: 0,
    cashierName: 'Ahmad',
    status: 'SUCCESS'
  }
];

export const FILE_STRUCTURE_BLUEPRINT = `
# REACT NATIVE CLI FEATURE-BASED POS ARCHITECTURE

/MyPosApp
├── android/                          # Folder Native Android
├── ios/                              # Folder Native iOS
├── assets/                           # Asset static shareable (peta, PDF, HTML, CSS dll)
├── src/                              # Sumber Kode Aplikasi Utama
│   ├── assets/                       # File media, gambar produk, ikon, animasi Lottie
│   │   ├── images/
│   │   └── animations/
│   ├── components/                   # UI Reusable atomis tanpa State Bisnis yang spesifik
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   ├── CardProduct.tsx
│   │   └── ReceiptModal.tsx
│   ├── constants/                    # Konfigurasi static & value konstan
│   │   ├── theme.ts                  # Skema warna, font ukuran, gaya visual (Tailwind/Custom Style)
│   │   └── config.ts                 # Base API URL, Timeout, default parameter
│   ├── features/                     # Bisnis Logik per MODUL (Fitur Terisolasi)
│   │   ├── auth/                     # Fitur Autentikasi Admin/Kasir
│   │   │   ├── screens/LoginScreen.tsx
│   │   │   ├── screens/RegisterScreen.tsx
│   │   │   └── hooks/useAuthQuery.ts
│   │   ├── cashier/                  # Fitur Utama Kerja Kasir / Transaksi
│   │   │   ├── screens/CashierScreen.tsx
│   │   │   ├── screens/CheckoutScreen.tsx
│   │   │   ├── components/CartList.tsx
│   │   │   ├── components/ScannerModal.tsx
│   │   │   └── hooks/useCart.ts      # Custom hook untuk kelola keranjang belanja
│   │   ├── inventory/                # Fitur Kelola Stok/Gudang (CRUD)
│   │   │   ├── screens/ProductListScreen.tsx
│   │   │   └── screens/EditProductScreen.tsx
│   │   ├── reports/                  # Fitur Laporan Penjualan (Analytics)
│   │   │   ├── screens/SalesDashboard.tsx
│   │   │   └── components/SalesBarChart.tsx
│   │   └── settings/                 # Fitur Setup Toko & Printer Thermal Bluetooth
│   │       ├── screens/SettingScreen.tsx
│   │       └── components/PrinterSelector.tsx
│   ├── hooks/                        # Global custom hooks (e.g. bluetooth, scan)
│   │   ├── useBluetoothPrinter.ts    # Printer thermal handler 
│   │   └── useFirestoreSync.ts       # Handler sinkronisasi data transaksi offline queue
│   ├── navigation/                   # Konfigurasi navigasi (React Navigation)
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── services/                     # Layanan API pihak ketiga & Client Database
│   │   ├── firebase.ts               # Inisialisasi Firebase SDK
│   │   ├── firestoreService.ts       # Query-query Firestore profesional
│   │   └── authService.ts            # Registrasi, sign-in, sign-out
│   ├── store/                        # State Management (Zustand atau Redux Toolkit)
│   │   ├── usePosStore.ts            # Penyimpan State Kasir yang responsif & ringan
│   │   └── index.ts
│   ├── utils/                        # Helper fungsi murni (Pure functions)
│   │   ├── currency.ts               # Format angka ke Rupiah (Rp)
│   │   ├── barcode.ts                # Validasi format EAN/UPC barcode
│   │   └── receiptGenerator.ts       # Format layout ESC/POS untuk dicetak ke thermal printer
│   └── App.tsx                       # Wrapper Root (Provider, Navigation Container, Toast)
├── .env                              # Kunci API Tersembunyi (Disembunyikan dari repo)
├── babel.config.js
├── index.js                          # Registrasi App Registry native
├── package.json
└── tsconfig.json
`;

export const FIREBASE_CONFIG_CODE = `
/**
 * src/services/firebase.ts
 * Inisialisasi Firebase SDK Professional untuk React Native CLI
 * Menggunakan library resmi: @react-native-firebase/app
 */

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Koneksi akan diinisiliasasi otomatis di Android/iOS menggunakan file konfigurasi:
// Android: android/app/google-services.json
// iOS: ios/GoogleService-Info.plist
//
// Kita hanya perlu mengekspor method instance yang sudah terkonfigurasi.

export const authInstance = auth();
export const db = firestore();
export const storageInstance = storage();

// Aktifkan Offline Persistence untuk Firestore!
// Sangat penting agar kasir tetap bisa transaksi sekalipun tiba-tiba koneksi internet terputus.
export const setupOfflinePersistence = async () => {
  try {
    await db.settings({
      persistence: true,               // Aktifkan penyimpanan offline lokal
      cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED, // Tidak membatasi ukuran cache lokal
    });
    console.log('Firebase Offline Persistence diaktifkan!');
  } catch (error) {
    console.warn('Gagal mengaktifkan Offline Persistence:', error);
  }
};
`;

export const FIRESTORE_SCHEMAS_GUIDE = `
# DESAIN SKEMA FIRESTORE KELAS PROFESIONAL (Denormalisasi & Berbasis Autentikasi Toko)

Dalam sistem kasir ritel profesional, seluruh koleksi harus berelasi dengan Id Toko (\`storeId\`).
Ini untuk memastikan satu akun toko tidak bisa mengakses data toko lain, serta mempermudah Query & Security Rules.

### 1. Koleksi: \`stores\` (Data Toko Utama)
\`\`\`typescript
Path: /stores/{storeId}
{
  ownerId: string,          // UID Admin pemilik (auth.uid)
  name: string,             // Nama Toko (e.g., "Kopi Kenangan")
  address: string,          // Alamat lengkap
  phone: string,            // No Telepon
  subscriptionPlan: 'FREE' | 'PREMIUM',
  createdAt: timestamp,
  updatedAt: timestamp
}
\`\`\`

### 2. Koleksi: \`products\` (Daftar Produk / Inventori)
Koleksi ini menggunakan denormalisasi index \`storeId\` dan \`searchName\` agar pencarian cepat & terisolasi.
\`\`\`typescript
Path: /products/{productId}
{
  storeId: string,          // ID Ref ke toko terkait (WAJIB)
  name: string,             // Nama Produk
  searchName: string[],     // Array lowercase substring kata untuk search index lokal
  price: number,            // Harga Jual (Rp)
  cost: number,             // Harga Modal / HPP (untuk hitung laba bersih)
  stock: number,            // Jumlah stok
  barcode: string,          // Kode Barcode / EAN-13
  category: string,         // Kategori barang (makanan, minuman, dll)
  imageUrl: string,         // URL gambar di Firebase Storage
  sku: string,              // Stock Keeping Unit unik
  active: boolean,          // Status aktif produk
  updatedBy: string,        // UID user yang mengubah produk terakhir
  createdAt: timestamp,
  updatedAt: timestamp
}
\`\`\`

### 3. Koleksi: \`transactions\` (Riwayat Penjualan & Invoice)
Data kasir, subtotal, diskon penjualan, dan list detail disimpan datar (flat) agar transaksi historis aman sekalipun harga produk berubah di masa depan.
\`\`\`typescript
Path: /transactions/{invoiceId}
{
  storeId: string,          // ID Toko terkait
  invoiceId: string,        // Format Invoice: INV-YYYYMMDD-XXXX (Unik)
  cashierId: string,        // UID kasir penginput
  cashierName: string,      // Nama kasir yang bertugas
  items: [                  // List item denormalisasi
    {
      productId: string,
      name: string,
      price: number,        // Harga produk saat terjual (tidak ikut harga update)
      cost: number,         // HPP saat terjual untuk laba kotor
      quantity: number,
      discount: number,     // Diskon persen per item
      subtotal: number
    }
  ],
  subtotal: number,         // Total sebelum diskon & pajak tambahan
  discountAmount: number,   // Diskon langsung pada invoice global (Rp)
  taxAmount: number,        // PPN global (Rp)
  total: number,            // Grand total bersih yang dibayar pelanggan
  paymentMethod: 'CASH' | 'DEBIT' | 'QRIS' | 'E-WALLET',
  paidAmount: number,       // Uang yang dibayar
  changeAmount: number,     // Uang kembalian
  status: 'SUCCESS' | 'REFUNDED',
  createdAt: timestamp      // ServerTimestamp
}
\`\`\`
`;

export const ZUSTAND_STORE_CODE = `
/**
 * src/store/usePosStore.ts
 * State Management yang Cepat, Ringan & Mendukung Re-render Cepat
 * Menggunakan Zustand (Modern alternative to Redux, sangat populer di React Native)
 */

import { create } from 'zustand';
import { Product, CartItem } from '../types';

interface PosState {
  cart: CartItem[];
  activeCategory: string;
  searchQuery: string;
  taxRate: number; // e.g. 0.1 for 10%
  globalDiscount: number; // flat discount amount in Rp
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  updateItemDiscount: (productId: string, discountPercent: number) => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setGlobalDiscount: (amount: number) => void;

  // Selectors / Getters secara efisien
  getCartSubtotal: () => number;
  getCartTax: () => number;
  getCartTotal: () => number;
}

export const usePosStore = create<PosState>((set, get) => ({
  cart: [],
  activeCategory: 'all',
  searchQuery: '',
  taxRate: 0.1, // Default PPN 10%
  globalDiscount: 0,

  addToCart: (product: Product) => {
    if (product.stock <= 0) return;
    
    set((state) => {
      const existingIndex = state.cart.findIndex(i => i.product.id === product.id);
      
      if (existingIndex !== -1) {
        const currentQty = state.cart[existingIndex].quantity;
        // Jangan melebihi stok yang tersedia
        if (currentQty >= product.stock) return state;
        
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { cart: updatedCart };
      }
      
      return { cart: [...state.cart, { product, quantity: 1, discount: 0 }] };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      cart: state.cart.filter(item => item.product.id !== productId)
    }));
  },

  updateQuantity: (productId: string, qty: number) => {
    if (qty <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => {
      const item = state.cart.find(i => i.product.id === productId);
      if (!item) return state;
      
      // Batasi dengan stok
      const finalQty = qty > item.product.stock ? item.product.stock : qty;
      
      return {
        cart: state.cart.map(i => i.product.id === productId ? { ...i, quantity: finalQty } : i)
      };
    });
  },

  updateItemDiscount: (productId: string, discountPercent: number) => {
    set((state) => ({
      cart: state.cart.map(i => 
        i.product.id === productId 
          ? { ...i, discount: Math.max(0, Math.min(100, discountPercent)) } 
          : i
      )
    }));
  },

  clearCart: () => set({ cart: [], globalDiscount: 0, searchQuery: '' }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setActiveCategory: (category: string) => set({ activeCategory: category }),
  setGlobalDiscount: (amount: number) => set({ globalDiscount: Math.max(0, amount) }),

  getCartSubtotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => {
      const originalPrice = item.product.price * item.quantity;
      const discountVal = originalPrice * (item.discount / 100);
      return sum + (originalPrice - discountVal);
    }, 0);
  },

  getCartTax: () => {
    const subtotal = get().getCartSubtotal();
    const discount = get().globalDiscount;
    const taxableAmount = Math.max(0, subtotal - discount);
    return Math.round(taxableAmount * get().taxRate);
  },

  getCartTotal: () => {
    const subtotal = get().getCartSubtotal();
    const discount = get().globalDiscount;
    const tax = get().getCartTax();
    return Math.max(0, subtotal - discount + tax);
  }
}));
`;

export const BLUETOOTH_PRINTER_SERVICE_CODE = `
/**
 * src/hooks/useBluetoothPrinter.ts
 * Integrasi Hardware Printer Thermal Bluetooth 58mm (ESC/POS Command)
 * Menggunakan library React Native CLI: react-native-bluetooth-escpos-printer
 */

import { useState, useEffect } from 'react';
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { Transaction } from '../types';

export const useBluetoothPrinter = () => {
  const [devices, setDevices] = useState<{ name: string; address: string }[]>([]);
  const [pairedDevices, setPairedDevices] = useState<{ name: string; address: string }[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Minta permission bluetooth di runtime android (Wajib!)
  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          grants['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return true;
  };

  const scanDevices = async () => {
    const allowed = await requestBluetoothPermission();
    if (!allowed) {
      Alert.alert('Izin Dibutuhkan', 'Mohon izinkan bluetooth untuk menyambung printer.');
      return;
    }

    setIsScanning(true);
    try {
      BluetoothManager.scanDevices()
        .then((s: string) => {
          const parsed = JSON.parse(s);
          setDevices(parsed.found || []);
          setPairedDevices(parsed.paired || []);
          setIsScanning(false);
        })
        .catch((e: any) => {
          setIsScanning(false);
          Alert.alert('Error', 'Bluetooth scan gagal: ' + e.message);
        });
    } catch (e) {
      setIsScanning(false);
    }
  };

  const connectToPrinter = async (address: string) => {
    try {
      await BluetoothManager.connect(address);
      setConnectedDevice(address);
      Alert.alert('Koneksi Sukses', 'Printer Bluetooth berhasil terhubung!');
    } catch (e: any) {
      Alert.alert('Koneksi Gagal', e.message || 'Gagal terhubung dengan printer.');
    }
  };

  const disconnectPrinter = async () => {
    if (!connectedDevice) return;
    try {
      await BluetoothManager.disconnect();
      setConnectedDevice(null);
    } catch (e) {}
  };

  // Format cetak struk penjualan profesional 58mm
  const printReceipt = async (tx: Transaction, storeName: string, storeAddress: string) => {
    if (!connectedDevice) {
      Alert.alert('Printer Offline', 'Koneksikan printer bluetooth terlebih dahulu di menu Pengaturan.');
      return;
    }

    try {
      // Setup ukuran lebar kertas (ukuran standar: 58mm, 32 karakter per baris)
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText(storeName + '\\n', { encoding: 'GBK', codepage: 0, widthtimes: 1, heigthtimes: 1, fonttype: 1 });
      await BluetoothEscposPrinter.printText(storeAddress + '\\n', { encoding: 'GBK' });
      await BluetoothEscposPrinter.printText('================================\\n', {});

      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      await BluetoothEscposPrinter.printText('Inv  : ' + tx.invoiceId + '\\n', {});
      await BluetoothEscposPrinter.printText('Tgl  : ' + new Date(tx.timestamp).toLocaleString() + '\\n', {});
      await BluetoothEscposPrinter.printText('Kasir: ' + tx.cashierName + '\\n', {});
      await BluetoothEscposPrinter.printText('================================\\n', {});

      // Cetak item belanjaan
      for (const item of tx.items) {
        await BluetoothEscposPrinter.printText(item.name + '\\n', {});
        
        // Atur posisi colom: (Qty x Rp. Harga Jual) -> kanan rata total subitem
        const priceStr = item.quantity + ' x ' + item.price.toLocaleString('id-ID');
        const subtotalStr = (item.quantity * item.price).toLocaleString('id-ID');
        
        const spacesCount = 32 - priceStr.length - subtotalStr.length;
        const spaces = ' '.repeat(Math.max(1, spacesCount));
        
        await BluetoothEscposPrinter.printText(priceStr + spaces + subtotalStr + '\\n', {});
        
        if (item.discount > 0) {
          await BluetoothEscposPrinter.printText('  Diskon ' + item.discount + '%  -' + (item.quantity * item.price * (item.discount / 100)).toLocaleString('id-ID') + '\\n', {});
        }
      }

      await BluetoothEscposPrinter.printText('--------------------------------\\n', {});
      
      // Total detail kuitansi
      const printRowStr = (label: string, value: number) => {
        const valStr = value.toLocaleString('id-ID');
        const spacesCount = 32 - label.length - valStr.length;
        return label + ' '.repeat(Math.max(1, spacesCount)) + valStr + '\\n';
      };

      await BluetoothEscposPrinter.printText(printRowStr('Subtotal', tx.subtotal), {});
      if (tx.discount > 0) {
        await BluetoothEscposPrinter.printText(printRowStr('Pajak (PPN)', tx.tax), {});
      }
      await BluetoothEscposPrinter.printText(printRowStr('Pajak (PPN)', tx.tax), {});
      await BluetoothEscposPrinter.printText('================================\\n', {});
      await BluetoothEscposPrinter.printText(printRowStr('TOTAL', tx.total), {});
      await BluetoothEscposPrinter.printText(printRowStr('Bayar', tx.paidAmount), {});
      await BluetoothEscposPrinter.printText(printRowStr('Kembali', tx.changeAmount), {});
      
      await BluetoothEscposPrinter.printText('================================\\n', {});
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText('Terima Kasih\\n', {});
      await BluetoothEscposPrinter.printText('Silakan Berkunjung Kembali\\n\\n\\n\\n', {});
      
    } catch (e: any) {
      Alert.alert('Gagal Cetak', 'Terjadi error saat cetak struk: ' + e.message);
    }
  };

  return {
    devices,
    pairedDevices,
    connectedDevice,
    isScanning,
    scanDevices,
    connectToPrinter,
    disconnectPrinter,
    printReceipt
  };
};
`;

export const FIRESTORE_RULES_PRO_CODE = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 1. CATCH-ALL SAFETY NET: Tolak semua akses secara default
    match /{document=**} {
      allow read, write: if false;
    }

    // Fungsi Pembantu Validasi Global (Reusable, Aman & Terverifikasi)
    function isSignedIn() {
      return request.auth != null;
    }

    function isMyStore(storeId) {
      return isSignedIn() && exists(/databases/$(database)/documents/stores/$(storeId)) && 
        get(/databases/$(database)/documents/stores/$(storeId)).data.ownerId == request.auth.uid;
    }

    function isValidId(id) {
      return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\\\-]+$');
    }

    // 2. ATURAN AKSES KOLEKSI TOKO
    match /stores/{storeId} {
      allow read: if isSignedIn() && resource.data.ownerId == request.auth.uid;
      allow create: if isSignedIn() && request.resource.data.ownerId == request.auth.uid 
                     && isValidId(storeId);
      allow update: if isSignedIn() && resource.data.ownerId == request.auth.uid 
                     && request.resource.data.ownerId == request.auth.uid
                     && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['name', 'address', 'phone', 'updatedAt']);
      allow delete: if false; // Keamanan Ekstrim: Melarang penghapusan instan toko tanpa peninjauan admin manual
    }

    // 3. ATURAN AKSES KOLEKSI PRODUK
    match /products/{productId} {
      allow read: if isSignedIn() && isMyStore(resource.data.storeId);
      
      allow create: if isSignedIn() && isMyStore(request.resource.data.storeId)
                     && isValidId(productId)
                     && request.resource.data.name is string && request.resource.data.name.size() <= 100
                     && request.resource.data.price is number && request.resource.data.price >= 0
                     && request.resource.data.cost is number && request.resource.data.cost >= 0
                     && request.resource.data.stock is number && request.resource.data.stock >= 0;

      allow update: if isSignedIn() && isMyStore(resource.data.storeId)
                     && request.resource.data.storeId == resource.data.storeId
                     && request.resource.data.price is number && request.resource.data.price >= 0
                     && request.resource.data.stock is number;

      allow delete: if isSignedIn() && isMyStore(resource.data.storeId);
    }

    // 4. ATURAN AKSES KOLEKSI TRANSAKSI (HANYA BOLEH CREATE & READ. MODIFIKASI/DELETE DILARANG UNTUK MENCEGAH FRAUD KASIR)
    match /transactions/{invoiceId} {
      allow read: if isSignedIn() && isMyStore(resource.data.storeId);
      allow list: if isSignedIn() && resource.data.storeId != null && isMyStore(resource.data.storeId);
      
      allow create: if isSignedIn() && isMyStore(request.resource.data.storeId)
                     && isValidId(invoiceId)
                     && request.resource.data.total is number && request.resource.data.total >= 0
                     && request.resource.data.items is list
                     && request.resource.data.paidAmount is number && request.resource.data.paidAmount >= request.resource.data.total
                     && request.resource.data.cashierId == request.auth.uid;

      // ATURAN INTEGRITAS KELAS DUNIA: Riwayat penjualan tidak bisa sengaja diedit/dihapus oleh kasir.
      // Jika terjadi kesalahan penginputan, harus buat invoice pembatalan/retur baru untuk pembukuan yang sah (Fraud Prevention).
      allow update: if false; 
      allow delete: if false;
    }
  }
}
`;
