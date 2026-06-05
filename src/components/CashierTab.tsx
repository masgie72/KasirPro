/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { 
  Search, Plus, Minus, Trash2, Tag, Barcode, 
  Coffee, Apple, Cookie, ShoppingBag, Grid, 
  CreditCard, QrCode, Wallet, Coins, User, CheckCircle
} from 'lucide-react';

interface CashierTabProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  updateItemDiscount: (productId: string, discount: number) => void;
  clearCart: () => void;
  globalDiscount: number;
  setGlobalDiscount: (amount: number) => void;
  taxRate: number;
  paymentMethod: 'CASH' | 'DEBIT' | 'QRIS' | 'E-WALLET';
  setPaymentMethod: (method: 'CASH' | 'DEBIT' | 'QRIS' | 'E-WALLET') => void;
  paidAmount: number;
  setPaidAmount: (amount: number) => void;
  onCheckout: (cashierName: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function CashierTab({
  products,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  updateItemDiscount,
  clearCart,
  globalDiscount,
  setGlobalDiscount,
  taxRate,
  paymentMethod,
  setPaymentMethod,
  paidAmount,
  setPaidAmount,
  onCheckout,
  activeCategory,
  setActiveCategory
}: CashierTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [cashierName, setCashierName] = useState('Ahmad');
  const [barcodeMessage, setBarcodeMessage] = useState<{ text: string; error: boolean } | null>(null);

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.barcode.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => {
    const priceAfterItemDiscount = item.product.price * (1 - item.discount / 100);
    return sum + (priceAfterItemDiscount * item.quantity);
  }, 0);

  const taxableAmount = Math.max(0, subtotal - globalDiscount);
  const taxAmount = Math.round(taxableAmount * taxRate);
  const totalAmount = taxableAmount + taxAmount;

  // Change amount
  const changeAmount = paymentMethod === 'CASH' ? Math.max(0, paidAmount - totalAmount) : 0;
  const isPaidSufficient = paymentMethod !== 'CASH' || paidAmount >= totalAmount;

  // Categories list with appropriate icons
  const categories = [
    { id: 'all', name: 'Semua', icon: Grid },
    { id: 'minuman', name: 'Minuman', icon: Coffee },
    { id: 'makanan', name: 'Makanan', icon: Apple },
    { id: 'snak', name: 'Snack', icon: Cookie },
    { id: 'sembako', name: 'Sembako', icon: ShoppingBag },
  ];

  // Barcode input simulator handler
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedBarcode.trim()) return;

    const matchedProduct = products.find(p => p.barcode === scannedBarcode.trim());
    if (matchedProduct) {
      if (matchedProduct.stock <= 0) {
        setBarcodeMessage({ text: `Stok ${matchedProduct.name} Habis!`, error: true });
      } else {
        addToCart(matchedProduct);
        setBarcodeMessage({ text: `Sukses scan: ${matchedProduct.name}`, error: false });
      }
    } else {
      setBarcodeMessage({ text: `Produk kode ${scannedBarcode} tidak ditemukan!`, error: true });
    }
    setScannedBarcode('');
    setTimeout(() => setBarcodeMessage(null), 3000);
  };

  // Quick cash buttons for CASH payment
  const quickCashAmounts = [10000, 20000, 50000, 100000];

  const handleQuickCash = (amount: number) => {
    setPaidAmount(amount);
  };

  const setExactAmount = () => {
    setPaidAmount(totalAmount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full" id="cashier-interface">
      {/* LEFT: Product Catalog & Search */}
      <div className="lg:col-span-8 flex flex-col space-y-4" id="catalog-panel">
        {/* Top Control Bar */}
        <div className="bg-slate-850/60 rounded-3xl p-5 border border-slate-700/30 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="bg-slate-900/60 p-2.5 rounded-2xl border border-slate-855/20 text-sky-400">
              <User size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider font-bold">KASIR BERTUGAS</p>
              <select 
                value={cashierName}
                onChange={(e) => setCashierName(e.target.value)}
                className="text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 focus:ring-1 focus:ring-sky-500/50 cursor-pointer outline-none"
              >
                <option value="Ahmad" className="bg-slate-900 text-slate-100">Ahmad Prasetyo</option>
                <option value="Siti" className="bg-slate-900 text-slate-100">Siti Aminah</option>
                <option value="Rian" className="bg-slate-900 text-slate-100">Rian Hidayat</option>
              </select>
            </div>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 max-w-xl">
            {/* Standard Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama produk / barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-700/30 rounded-2xl text-sm bg-slate-900 text-slate-100 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-transparent transition-all"
              />
            </div>

            {/* Simulated Barcode Scanner Bar */}
            <form onSubmit={handleBarcodeSubmit} className="relative sm:w-48 flex">
              <input
                type="text"
                placeholder="Barcode [EAN]"
                value={scannedBarcode}
                onChange={(e) => setScannedBarcode(e.target.value)}
                className="w-full pl-8 pr-12 py-2.5 border border-slate-700/30 rounded-2xl text-xs bg-slate-900 text-slate-100 font-mono focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-transparent"
              />
              <Barcode size={14} className="absolute left-2.5 top-3.5 text-slate-400" />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 px-2.5 py-1.5 bg-sky-650 hover:bg-sky-550 text-slate-950 rounded-xl text-[10px] font-black uppercase transition-all"
              >
                Scan
              </button>
            </form>
          </div>
        </div>

        {/* Scan Message Banner */}
        {barcodeMessage && (
          <div className={`p-3.5 rounded-2xl text-xs font-mono flex items-center space-x-2 border shadow-sm ${
            barcodeMessage.error 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
              : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
          }`}>
            <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
            <span>{barcodeMessage.text}</span>
          </div>
        )}

        {/* Categories Capsule Navigation */}
        <div className="flex overflow-x-auto pb-1 gap-2 scrollbar-none" id="category-scroller">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                id={`cat-${category.id}`}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-sky-500/10 text-sky-400 border-sky-500/30 shadow-md' 
                    : 'bg-slate-800/40 text-slate-400 border-slate-700/20 hover:bg-slate-800/80 hover:text-slate-100'
                }`}
              >
                <IconComponent size={14} className={isActive ? 'text-sky-400' : 'text-slate-400'} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 220px)' }} id="products-catalogue">
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-800/30 rounded-3xl p-12 border border-slate-700/30 text-center flex flex-col items-center justify-center space-y-3 shadow-md backdrop-blur-md">
              <ShoppingBag size={48} className="text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">Tidak ada produk ditemukan</p>
              <p className="text-xs text-slate-400">Silakan tambahkan produk baru di tab Inventori atau ubah filter pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock <= 0;
                const isLowStock = product.stock > 0 && product.stock <= 10;
                
                return (
                  <div
                    key={product.id}
                    id={`product-card-${product.id}`}
                    onClick={() => !isOutOfStock && addToCart(product)}
                    className={`bg-slate-800/60 rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col h-full relative group cursor-pointer shadow-md ${
                      isOutOfStock 
                        ? 'opacity-40 border-slate-800' 
                        : 'border-slate-700/20 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/5'
                    }`}
                  >
                    {/* Compact Image */}
                    <div className="h-32 w-full bg-slate-900/40 overflow-hidden relative border-b border-slate-800/30">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Scan Tag Overlay - quick action */}
                      {!isOutOfStock && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setScannedBarcode(product.barcode);
                            // Auto trigger scan submit simulation
                            setTimeout(() => {
                              const matched = products.find(p => p.id === product.id);
                              if (matched) {
                                addToCart(matched);
                                setBarcodeMessage({ text: `Simulasi scan barcode: ${matched.name}`, error: false });
                                setTimeout(() => setBarcodeMessage(null), 3000);
                              }
                            }, 50);
                          }}
                          title="Simulasikan scan barcode produk ini"
                          className="absolute bottom-2 right-2 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl text-slate-200 shadow-lg hover:bg-sky-500 hover:text-slate-950 transition-all border border-slate-800"
                        >
                          <Barcode size={13} />
                        </button>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tag Category Code */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                            {product.category}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">
                            {product.sku || product.id.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 group-hover:text-sky-400 transition-colors line-clamp-2 min-h-8 mb-1 leading-normal">
                          {product.name}
                        </h4>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800 flex flex-col space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-450 font-medium">Stok:</span>
                          <span className={`font-black font-mono px-1.5 py-0.5 rounded-md text-[9px] ${
                            isOutOfStock 
                              ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20' 
                              : isLowStock 
                                ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' 
                                : 'text-slate-300 bg-slate-900 border border-slate-800'
                          }`}>
                            {product.stock}
                          </span>
                        </div>
                        <p className="text-xs font-black text-sky-400">
                          Rp {product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-xs pointer-events-none">
                        <span className="bg-rose-500/10 text-rose-400 text-[10px] uppercase font-black px-2.5 py-1 rounded-xl border border-rose-500/25 tracking-wider">
                          HABIS
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Transaction Cart Drawer */}
      <div className="lg:col-span-4 bg-slate-900/50 rounded-3xl border border-slate-700/30 p-5 flex flex-col h-full shadow-lg backdrop-blur-md" id="cart-panel">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-2xl p-2 flex items-center justify-center">
              <ShoppingBag size={15} />
            </div>
            <h3 className="text-sm font-black text-slate-100">Keranjang Belanja</h3>
          </div>
          {cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-xs text-rose-450 hover:text-rose-400 font-bold flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Trash2 size={12} />
              <span>Bersihkan</span>
            </button>
          )}
        </div>

        {/* Selected Items List */}
        <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1" style={{ maxHeight: 'calc(100vh - 430px)' }} id="cart-items">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
              <div className="h-12 w-12 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 mb-2">
                <Plus size={18} />
              </div>
              <p className="text-xs font-bold text-slate-350">Keranjang masih kosong</p>
              <p className="text-[10px] text-slate-450">Klik pada produk di katalog untuk mulai memasukkan item.</p>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = (item.product.price * (1 - item.discount / 100)) * item.quantity;
              return (
                <div 
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="bg-slate-900/60 rounded-2xl p-3.5 border border-slate-800/80 hover:border-slate-700/50 transition-colors flex flex-col space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <h5 className="text-xs font-bold text-slate-200 line-clamp-1">{item.product.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Quantity & Item Discount Controls */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                    {/* Item Discount Input capsule */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] text-slate-400 font-bold">Disc%:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount || ''}
                        placeholder="0"
                        onChange={(e) => {
                          const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                          updateItemDiscount(item.product.id, val);
                        }}
                        className="w-12 px-1.5 py-0.5 border border-slate-700/40 bg-slate-950 rounded-lg text-[10px] font-mono text-center text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                      />
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-bold font-mono text-slate-200 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-xs font-bold font-mono text-sky-400 animate-pulse">
                      Rp {itemTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-slate-800 pt-3 mt-auto space-y-2 text-xs" id="pricing-summary">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span className="font-mono font-bold text-slate-300">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>

          {/* Global Discount Input */}
          <div className="flex items-center justify-between text-slate-400">
            <span>Potongan (Diskon Global):</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono text-slate-500">Rp</span>
              <input
                type="number"
                min="0"
                value={globalDiscount || ''}
                placeholder="0"
                onChange={(e) => setGlobalDiscount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24 px-2 py-0.5 border border-slate-700/40 bg-slate-950 rounded-lg text-right text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
              />
            </div>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>PPN ({(taxRate * 100)}%):</span>
            <span className="font-mono font-bold text-slate-300">Rp {taxAmount.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between text-slate-200 font-bold border-t border-dashed border-slate-800 pt-2 text-sm">
            <span>Total Tagihan:</span>
            <span className="font-mono text-base font-black text-sky-400">Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-3 mt-2 border-t border-slate-800" id="payment-methods">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Metode Pembayaran</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'CASH', label: 'Tunai', icon: Coins },
              { id: 'DEBIT', label: 'Debit', icon: CreditCard },
              { id: 'QRIS', label: 'QRIS', icon: QrCode },
              { id: 'E-WALLET', label: 'Wallet', icon: Wallet },
            ].map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  id={`pay-${method.id}`}
                  onClick={() => {
                    setPaymentMethod(method.id as any);
                    if (method.id !== 'CASH') {
                      setPaidAmount(totalAmount);
                    } else {
                      setPaidAmount(0);
                    }
                  }}
                  className={`py-2 px-1 rounded-xl border text-center flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-sm' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-sky-400' : 'text-slate-400'} />
                  <span className="text-[9px] font-bold tracking-tight">{method.label}</span>
                </button>
              );
            })}
          </div>

          {/* If CASH selected: Paid amount inputs */}
          {paymentMethod === 'CASH' && (
            <div className="mt-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800 shadow-inner space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nominal Dibayar (Tunai):</span>
                <button 
                  onClick={setExactAmount}
                  className="text-[9px] py-0.5 px-1.5 bg-slate-800 font-bold text-slate-200 rounded hover:bg-slate-700 border border-slate-700/50 cursor-pointer"
                >
                  Uang Pas
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs font-bold text-slate-550 font-mono">Rp</span>
                <input
                  type="number"
                  min="0"
                  value={paidAmount || ''}
                  onChange={(e) => setPaidAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Masukkan nominal uang"
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-800 bg-slate-950 text-sky-450 font-mono rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-sky-550/50"
                />
              </div>

              {/* Quick Cash Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {quickCashAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleQuickCash(amt)}
                    className="py-1 text-[10px] font-mono font-bold border border-slate-800 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
                  >
                    {amt / 1000}k
                  </button>
                ))}
              </div>

              {/* Kembalian status */}
              <div className="flex justify-between items-center pt-1.5 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400 font-medium">Kembalian:</span>
                <span className={`font-mono font-extrabold ${changeAmount > 0 ? 'text-teal-400 text-sm animate-pulse' : 'text-slate-400'}`}>
                  Rp {changeAmount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}

          {/* Finalize Button */}
          <button
            onClick={() => onCheckout(cashierName)}
            disabled={cart.length === 0 || !isPaidSufficient}
            className={`w-full mt-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              cart.length > 0 && isPaidSufficient
                ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/10 font-black'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/10'
            }`}
          >
            <CheckCircle size={16} />
            <span>Bayar & Cetak Struk</span>
          </button>
          
          {cart.length > 0 && !isPaidSufficient && (
            <p className="text-[10px] text-center text-rose-400 font-mono mt-1.5">
              * Nominal bayar tunai kurang dari total tagihan!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
