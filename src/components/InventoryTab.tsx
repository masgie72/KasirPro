/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { 
  Plus, Edit2, Trash2, Search, Package, 
  Tag, Barcode, Check, AlertTriangle, X
} from 'lucide-react';

interface InventoryTabProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function InventoryTab({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}: InventoryTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formCost, setFormCost] = useState(0);
  const [formStock, setFormStock] = useState(0);
  const [formBarcode, setFormBarcode] = useState('');
  const [formCategory, setFormCategory] = useState('minuman');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Search filter
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.barcode.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormPrice(product.price);
    setFormCost(product.cost);
    setFormStock(product.stock);
    setFormBarcode(product.barcode);
    setFormCategory(product.category);
    setFormImageUrl(product.imageUrl);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setFormName('');
    setFormPrice(0);
    setFormCost(0);
    setFormStock(0);
    // Generate a quick dummy barcode
    setFormBarcode('899' + Math.floor(1000000000 + Math.random() * 9000000000));
    setFormCategory('minuman');
    setFormImageUrl('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0 || formStock < 0) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formName,
        price: formPrice,
        cost: formCost,
        stock: formStock,
        barcode: formBarcode,
        category: formCategory,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop'
      });
      setEditingProduct(null);
    } else if (isAdding) {
      const newProduct: Product = {
        id: 'prod-' + (products.length + 1) + '-' + Date.now().toString().slice(-4),
        name: formName,
        price: formPrice,
        cost: formCost,
        stock: formStock,
        barcode: formBarcode,
        category: formCategory,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop'
      };
      onAddProduct(newProduct);
      setIsAdding(false);
    }
  };

  // Image suggestions
  const presetImages = [
    { name: 'Kopi', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&auto=format&fit=crop' },
    { name: 'Keripik', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d20?q=80&w=300&auto=format&fit=crop' },
    { name: 'Botol', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&auto=format&fit=crop' },
    { name: 'Instant', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&auto=format&fit=crop' },
    { name: 'Minyak', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=300&auto=format&fit=crop' },
    { name: 'Roti', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop' }
  ];

  return (
    <div className="flex flex-col space-y-4 h-full text-slate-100" id="inventory-interface">
      {/* Top action indicators */}
      <div className="bg-slate-850/60 rounded-3xl p-5 border border-slate-700/30 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg backdrop-blur-md">
        <div>
          <h3 className="text-sm font-black text-slate-100 flex items-center space-x-2">
            <div className="bg-sky-500/10 text-sky-400 p-1.5 rounded-xl border border-sky-500/20">
              <Package size={15} />
            </div>
            <span>Manajemen Inventori & Stok</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Kelola barang dagangan, cek keuntungan margin kotor, dan atur ketersediaan stok.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto">
          {/* Category Select */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 border border-slate-700/35 bg-slate-900 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
          >
            <option value="all" className="bg-slate-900 text-slate-200">Semua Kategori</option>
            <option value="minuman" className="bg-slate-900 text-slate-200">Minuman</option>
            <option value="makanan" className="bg-slate-900 text-slate-200">Makanan</option>
            <option value="snak" className="bg-slate-900 text-slate-200">Snack</option>
            <option value="sembako" className="bg-slate-900 text-slate-200">Sembako</option>
          </select>

          {/* Search bar */}
          <div className="relative max-md:w-full min-w-56">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari barang / barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-1.5 border border-slate-705/35 bg-slate-900 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-500/55"
            />
          </div>

          <button 
            onClick={handleAddClick} 
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center space-x-1 hover:shadow-lg hover:shadow-sky-500/10 transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Synchronation Alert Banner */}
      <div className="bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-2xl p-4 text-xs flex gap-2.5 font-mono shadow-sm">
        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400 animate-pulse" />
        <div className="space-y-1">
          <span className="font-bold uppercase tracking-wider text-amber-400">PRO ARCHITECTURE INSIGHT: PREVENTING RACE CONDITION TRADING</span>
          <p className="text-[11px] leading-relaxed text-slate-350">
            Di POS kelas profesional, pembaruan stok produk (misal: pengurangan stok setelah checkout) tidak boleh langsung diupdate dari klien jika multi-kasir aktif. Untuk performa tinggi dan data konsisten tanpa tabrakan (concurrency), stok dipotong secara otomatis di server menggunakan <strong>Firebase Cloud Functions</strong> yang dibungkus dengan <strong>Firestore Transactions (runTransaction)</strong>.
          </p>
        </div>
      </div>

      {/* Main split layout / tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table list */}
        <div className={`overflow-x-auto bg-slate-900/40 border border-slate-700/30 rounded-3xl ${editingProduct || isAdding ? 'lg:col-span-7' : 'lg:col-span-12'} shadow-lg`} id="inventory-table-container">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider text-[10px]">
                <th className="p-4 pl-5 font-black">Produk</th>
                <th className="p-4 font-black">Kategori</th>
                <th className="p-4 font-black">SKU / Barcode</th>
                <th className="p-4 text-right font-black">Harga Beli (Cost)</th>
                <th className="p-4 text-right font-black">Harga Jual</th>
                <th className="p-4 text-right font-black">Margin</th>
                <th className="p-4 text-center font-black">Stok</th>
                <th className="p-4 pr-5 text-center font-black">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-500 font-bold font-mono">
                    Tidak ada barang inventori
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const marginPercent = ((product.price - product.cost) / product.price) * 100;
                  const isOutOfStock = product.stock <= 0;
                  const isLowStock = product.stock > 0 && product.stock <= 10;
                  const isEditingThis = editingProduct?.id === product.id;

                  return (
                    <tr 
                      key={product.id}
                      className={`hover:bg-slate-850/30 transition-colors ${isEditingThis ? 'bg-slate-800/40' : ''} text-slate-250`}
                    >
                      <td className="p-4 pl-5 flex items-center space-x-3">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded-xl border border-slate-800/80 shadow-md"
                        />
                        <div>
                          <p className="font-bold text-slate-200 group-hover:text-white leading-normal">{product.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono tracking-tight">{product.id.toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold capitalize text-slate-400">
                        {product.category}
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <Barcode size={12} className="text-slate-500" />
                          <span>{product.barcode}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono text-slate-400">
                        Rp {product.cost.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4 text-right font-mono font-extrabold text-slate-200">
                        Rp {product.price.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4 text-right">
                        <span className="bg-sky-500/10 text-sky-400 text-[10px] px-2 py-0.5 rounded-lg font-mono font-bold border border-sky-500/25">
                          +{marginPercent.toFixed(0)}%
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-mono text-xs font-black px-2.5 py-0.5 rounded-full text-[10px] ${
                          isOutOfStock 
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' 
                            : isLowStock 
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' 
                              : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 text-center pr-5">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="p-1.5 border border-slate-700/60 hover:border-slate-500 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-all cursor-pointer text-slate-300 hover:text-white"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus produk "${product.name}"?`)) {
                                onDeleteProduct(product.id);
                                if (editingProduct?.id === product.id) {
                                  setEditingProduct(null);
                                }
                              }
                            }}
                            className="p-1.5 border border-rose-500/10 hover:border-rose-500 rounded-lg bg-rose-500/5 hover:bg-rose-500/15 transition-all text-rose-400 hover:text-rose-350 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* EDITOR COLUMN */}
        {(editingProduct || isAdding) && (
          <div className="lg:col-span-5 bg-slate-900/50 border border-slate-700/30 rounded-3xl p-5 shadow-lg backdrop-blur-md" id="inventory-editor-panel">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h4 className="font-black text-slate-100 flex items-center space-x-2">
                <Tag size={15} className="text-sky-450" />
                <span>{editingProduct ? 'Ubah Data Produk' : 'Tambah Produk Baru'}</span>
              </h4>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setIsAdding(false);
                }}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs text-slate-200">
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-400 block">Nama Barang:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sari Roti Manis"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              {/* Grid Cost & Pricing */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-400 block">Harga Modal (HPP):</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-slate-500 font-bold font-mono">Rp</span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formCost || ''}
                      onChange={(e) => setFormCost(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-8 pr-3 py-2.5 border border-slate-700 bg-slate-950 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-400 block">Harga Jual:</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-slate-500 font-bold font-mono">Rp</span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formPrice || ''}
                      onChange={(e) => setFormPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-8 pr-3 py-2.5 border border-slate-700 bg-slate-950 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Stock & Category */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-400 block">Kategori:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 font-bold text-xs"
                  >
                    <option value="minuman" className="bg-slate-900">Minuman</option>
                    <option value="makanan" className="bg-slate-900">Makanan / Roti</option>
                    <option value="snak" className="bg-slate-900">Snack</option>
                    <option value="sembako" className="bg-slate-900">Sembako</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-400 block">Inisial Stok:</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    value={formStock || ''}
                    onChange={(e) => setFormStock(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono text-xs font-bold"
                  />
                </div>
              </div>

              {/* Barcode */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-400 block">Kode Barcode [EAN-13 / GTIN]:</label>
                <div className="relative">
                  <Barcode size={14} className="absolute left-2.5 top-3.5 text-slate-500" />
                  <input
                     type="text"
                     required
                     value={formBarcode}
                     onChange={(e) => setFormBarcode(e.target.value)}
                     className="w-full pl-8 pr-3 py-2.5 border border-slate-700 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs tracking-wide font-bold focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Image URL Input */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-400 block">Gambar URL Produk:</label>
                <input
                  type="url"
                  placeholder="HTTP:// atau HTTPS://"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              {/* Preset Image Suggestion chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-450 font-bold block uppercase tracking-wider">Rekomendasi Gambar Preset:</span>
                <div className="flex flex-wrap gap-1.5">
                  {presetImages.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setFormImageUrl(preset.url)}
                      className={`text-[10px] px-2.5 py-1 border rounded-lg transition-all duration-150 cursor-pointer ${
                        formImageUrl === preset.url 
                          ? 'bg-sky-500 text-slate-950 border-sky-500 font-black' 
                          : 'bg-slate-800 text-slate-350 border-slate-700/60 hover:text-white'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions submit */}
              <div className="pt-3 border-t border-slate-800 flex space-x-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAdding(false);
                  }}
                  className="flex-1 py-3 text-center rounded-2xl border border-slate-700/60 font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-105 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-center rounded-2xl font-black bg-sky-500 text-slate-950 hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/10 transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Check size={14} className="stroke-[3]" />
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
