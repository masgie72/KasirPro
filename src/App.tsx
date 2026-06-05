/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Package, ClipboardList, BookOpen, 
  Printer, X, Check, Flame, Signal, Laptop
} from 'lucide-react';
import { Product, CartItem, Transaction } from './types';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS } from './data';
import CashierTab from './components/CashierTab';
import InventoryTab from './components/InventoryTab';
import ReportsTab from './components/ReportsTab';
import GuideTab from './components/GuideTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cashier' | 'inventory' | 'reports' | 'guide'>('cashier');
  
  // Real active states persisting in memory
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Active checkout configuration states
  const [globalDiscount, setGlobalDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'DEBIT' | 'QRIS' | 'E-WALLET'>('CASH');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Receipt Modal State
  const [showReceiptTx, setShowReceiptTx] = useState<Transaction | null>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // CART LOGIC
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIdx !== -1) {
        const currentQty = prevCart[existingIdx].quantity;
        // Check if increments exceed current stock
        if (currentQty >= product.stock) return prevCart;
        
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      }
      return [...prevCart, { product, quantity: 1, discount: 0 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      const idx = prevCart.findIndex(item => item.product.id === productId);
      if (idx === -1) return prevCart;

      const item = prevCart[idx];
      const finalQty = qty > item.product.stock ? item.product.stock : qty;
      
      const nextCart = [...prevCart];
      nextCart[idx].quantity = finalQty;
      return nextCart;
    });
  };

  const updateItemDiscount = (productId: string, discount: number) => {
    setCart(prevCart => {
      const idx = prevCart.findIndex(item => item.product.id === productId);
      if (idx === -1) return prevCart;

      const nextCart = [...prevCart];
      nextCart[idx].discount = Math.min(100, Math.max(0, discount));
      return nextCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setGlobalDiscount(0);
    setPaidAmount(0);
    setPaymentMethod('CASH');
  };

  // CHECKOUT TRANSACTION GENERATION
  const handleCheckout = (cashierName: string) => {
    if (cart.length === 0) return;

    // Calculate final totals
    const subtotal = cart.reduce((sum, item) => {
      const priceAfterDiscount = item.product.price * (1 - item.discount / 100);
      return sum + (priceAfterDiscount * item.quantity);
    }, 0);

    const taxRate = 0.11; // 11% PPN standard Indonesian tax
    const taxableAmount = Math.max(0, subtotal - globalDiscount);
    const taxAmount = Math.round(taxableAmount * taxRate);
    const grandTotal = taxableAmount + taxAmount;

    const actualPaid = paymentMethod === 'CASH' ? paidAmount : grandTotal;
    const change = Math.max(0, actualPaid - grandTotal);

    // 1. Generate new Transaction object
    const dateNow = new Date();
    const YYYYMMDD = dateNow.toISOString().slice(0, 10).replace(/-/g, '');
    const dailyCount = transactions.filter(t => t.timestamp.startsWith(dateNow.toISOString().slice(0, 10))).length + 1;
    const invoiceId = `INV-${YYYYMMDD}-${String(dailyCount).padStart(3, '0')}`;

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      invoiceId,
      timestamp: dateNow.toISOString(),
      items: cart.map(item => {
        const itemPrice = item.product.price * (1 - item.discount / 100);
        return {
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          discount: item.discount,
          subtotal: itemPrice * item.quantity
        };
      }),
      subtotal,
      discount: globalDiscount,
      tax: taxAmount,
      total: grandTotal,
      paymentMethod,
      paidAmount: actualPaid,
      changeAmount: change,
      cashierName,
      status: 'SUCCESS'
    };

    // 2. Reduce the stock of the purchased products in the products state
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        const cartItem = cart.find(item => item.product.id === prod.id);
        if (cartItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartItem.quantity)
          };
        }
        return prod;
      });
    });

    // 3. Append metadata transaction log, clear parameters
    setTransactions(prevTxs => [...prevTxs, newTx]);
    setShowReceiptTx(newTx);
    clearCart();
  };

  // INVENTORY OPERATIONS
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [...prev, newProd]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Reprint triggered from Reports list
  const handleReprintReceipt = (tx: Transaction) => {
    setShowReceiptTx(tx);
  };

  // Simulated print command triggers subtle delay
  const triggerSimulatedPrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      alert("Struk dicetak sukses ke Thermal Printer (Bluetooth ESC/POS 58mm)!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col font-sans text-slate-100 selection:bg-sky-500 selection:text-slate-950" id="main-app">
      {/* Dynamic Status Header */}
      <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 shadow-md" id="app-header">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Logo Title Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-sky-500/10 text-sky-400 border border-sky-500/20 p-2.5 rounded-2xl flex items-center justify-center shadow-inner">
              <Laptop size={18} className="animate-pulse text-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-black tracking-tight text-white uppercase font-sans">
                  SMART<span className="text-sky-400">POS</span>
                </h1>
                <span className="bento-badge-teal tracking-tight flex items-center">
                  <Signal size={8} className="mr-1 animate-ping text-teal-400" />
                  MOCK SYNC ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-normal">DEVELOPER SIMULATED SANDBOX FRAMEWORK</p>
            </div>
          </div>

          {/* Navigation Controls Swappable Tabs */}
          <nav className="flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80" id="tabs-navigation">
            {[
              { id: 'cashier', label: 'Kasir POS', icon: ShoppingBag },
              { id: 'inventory', label: 'Inventori', icon: Package },
              { id: 'reports', label: 'Riwayat Jurnal', icon: ClipboardList },
              { id: 'guide', label: 'React Native Blueprint', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-sm' 
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-sky-400' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Primary Workspace container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6" id="app-workspace">
        {activeTab === 'cashier' && (
          <CashierTab 
            products={products}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            updateItemDiscount={updateItemDiscount}
            clearCart={clearCart}
            globalDiscount={globalDiscount}
            setGlobalDiscount={setGlobalDiscount}
            taxRate={0.11} // Indo 11% standard PPN tax
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paidAmount={paidAmount}
            setPaidAmount={setPaidAmount}
            onCheckout={handleCheckout}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryTab 
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab 
            transactions={transactions}
            products={products}
            onReprintReceipt={handleReprintReceipt}
          />
        )}

        {activeTab === 'guide' && (
          <GuideTab />
        )}
      </main>

      {/* Aesthetic Footer credited simple workspace boundaries */}
      <footer className="bg-slate-950/40 border-t border-slate-900/40 py-6 mt-auto text-center text-xs text-slate-500 font-mono" id="app-footer">
        <p>© 2026 Retailer Cashier POS. Skenario Arsitektur Ritel Pro Indonesia.</p>
      </footer>

      {/* THERMAL REAL RECEIPT INV PRINTER MODAL WINDOWS */}
      {showReceiptTx && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto" id="receipt-modal">
          <div className="bg-slate-900 p-6 rounded-3xl max-w-md w-full relative space-y-4 my-8 shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
            {/* Top Bar commands */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Printer size={15} className="text-sky-400" />
                <span className="text-xs font-semibold tracking-wider font-mono text-slate-300">SIMULASI STRUK THERMAL 58mm</span>
              </div>
              <button 
                onClick={() => setShowReceiptTx(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Structured Thermal Invoice Document paper representation */}
            <div className="bg-white border-t-4 border-dotted border-zinc-300 p-5 shadow-inner text-zinc-900 select-all font-mono leading-relaxed rounded-lg" id="receipt-invoice-doc">
              <div className="text-center space-y-1 pb-4 border-b border-dashed border-zinc-300">
                <h4 className="text-md font-extrabold text-zinc-950 uppercase tracking-tight">TOKO RITEL MANDIRI</h4>
                <p className="text-[10px] text-zinc-600 leading-normal">Jl. Jenderal Sudirman No. 45, Jakarta Pusat</p>
                <p className="text-[10px] text-zinc-500">Telp: 021-99887766</p>
              </div>

              {/* Transaction Metadata header */}
              <div className="py-3 border-b border-dashed border-zinc-300 text-[10px] space-y-1 text-zinc-600">
                <div className="flex justify-between">
                  <span>No Invoice:</span>
                  <span className="font-bold text-zinc-950">{showReceiptTx.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu Tgl:</span>
                  <span>{new Date(showReceiptTx.timestamp).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kasir/User:</span>
                  <span>{showReceiptTx.cashierName} (Staff)</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-emerald-700 font-extrabold uppercase">Lunas ({showReceiptTx.paymentMethod})</span>
                </div>
              </div>

              {/* Items Shopping list table rows */}
              <div className="py-3 border-b border-dashed border-zinc-300 text-[10px] space-y-2">
                {showReceiptTx.items.map((item, idx) => {
                  return (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex justify-between font-bold text-zinc-900">
                        <span className="truncate max-w-56">{item.name}</span>
                        <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-zinc-500 text-[9px]">
                        <span>
                          {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                          {item.discount > 0 && ` (Disc %${item.discount})`}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-red-500">
                            -Rp {Math.round(item.price * (item.discount / 100) * item.quantity).toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cumulative totals invoice calculations */}
              <div className="py-3 border-b border-dashed border-zinc-300 text-[10px] space-y-1.5 text-zinc-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rp {showReceiptTx.subtotal.toLocaleString('id-ID')}</span>
                </div>
                {showReceiptTx.discount > 0 && (
                  <div className="flex justify-between text-red-600 font-medium">
                    <span>Potongan Diskon:</span>
                    <span>-Rp {showReceiptTx.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pajak PPN (11%):</span>
                  <span>Rp {showReceiptTx.tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-zinc-950 font-black text-xs pt-1 border-t border-zinc-200">
                  <span>TOTAL AKHIR:</span>
                  <span>Rp {showReceiptTx.total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Cash Paid / Change status calculations */}
              <div className="py-3 space-y-1 text-[10px] text-zinc-600 border-b border-dashed border-zinc-300">
                <div className="flex justify-between">
                  <span>Jumlah Dibayar:</span>
                  <span>Rp {showReceiptTx.paidAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900">
                  <span>Kembalian Tunai:</span>
                  <span>Rp {showReceiptTx.changeAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Receipt Footer barcodes and greetings */}
              <div className="text-center pt-4 space-y-2">
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">TERIMA KASIH</p>
                <p className="text-[9px] text-zinc-500 leading-normal">Silakan berkunjung kembali ke toko kami!</p>
                
                {/* Visual barcode representation bars */}
                <div className="flex justify-center pt-1.5 opacity-80" title={showReceiptTx.invoiceId}>
                  <div className="h-6 w-32 flex">
                    {[1,2,1,1,3,2,1,3,1,1,2,3,1,2,1,3,2,1,1,2,3].map((bar, i) => (
                      <div 
                        key={i} 
                        style={{ width: `${bar * 2}px` }} 
                        className={`h-full ${i % 2 === 0 ? 'bg-zinc-900' : 'bg-transparent'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                <span className="text-[8px] text-zinc-400 block font-mono">{showReceiptTx.invoiceId}</span>
              </div>
            </div>

            {/* Bottom buttons action sheet */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowReceiptTx(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold text-xs"
              >
                Tutup Struk
              </button>
              
              <button
                onClick={triggerSimulatedPrint}
                disabled={isPrinting}
                className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow-md disabled:bg-slate-800 disabled:text-slate-500"
              >
                {isPrinting ? (
                  <>
                    <span className="h-3 w-3 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></span>
                    <span>Mencetak...</span>
                  </>
                ) : (
                  <>
                    <Printer size={14} />
                    <span>Print Thermal (58mm)</span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-500 font-mono">
              * Tombol Print di atas menyimulasikan output print ESC/POS via driver Bluetooth yang Anda lihat polanya di tab Panduan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
