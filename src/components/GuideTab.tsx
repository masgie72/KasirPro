/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FolderTree, Flame, Database, ShoppingBag, 
  ShieldCheck, Printer, CheckCircle, Copy, Info, ExternalLink
} from 'lucide-react';
import { 
  FILE_STRUCTURE_BLUEPRINT,
  FIREBASE_CONFIG_CODE,
  FIRESTORE_SCHEMAS_GUIDE,
  ZUSTAND_STORE_CODE,
  BLUETOOTH_PRINTER_SERVICE_CODE,
  FIRESTORE_RULES_PRO_CODE
} from '../data';

export default function GuideTab() {
  const [activeSubTab, setActiveSubTab] = useState<'structure' | 'firebase' | 'schema' | 'zustand' | 'rules' | 'printer'>('structure');
  const [copied, setCopied] = useState(false);

  const getCodeToCopy = () => {
    switch(activeSubTab) {
      case 'structure': return FILE_STRUCTURE_BLUEPRINT;
      case 'firebase': return FIREBASE_CONFIG_CODE;
      case 'schema': return FIRESTORE_SCHEMAS_GUIDE;
      case 'zustand': return ZUSTAND_STORE_CODE;
      case 'rules': return FIRESTORE_RULES_PRO_CODE;
      case 'printer': return BLUETOOTH_PRINTER_SERVICE_CODE;
      default: return '';
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeToCopy());
    setCopied(true);
    setTimeout(() => setCopied(false), 2005);
  };

  const getTitle = () => {
    switch(activeSubTab) {
      case 'structure': return 'Arsitektur Folder Feature-Based (Skala Menengah - Atas)';
      case 'firebase': return 'Inisialisasi Firebase SDK Native (@react-native-firebase)';
      case 'schema': return 'Desain Skema Firestore Ritel Profesional (Denormalisasi)';
      case 'zustand': return 'Logika Keranjang Zustand State Store (Kinerja Tinggi)';
      case 'rules': return 'Keamanan Berlapis Firestore Rules (Zero-Trust ABAC)';
      case 'printer': return 'Integrasi Printer Thermal Bluetooth 58mm (Command ESC/POS)';
    }
  };

  const getDescription = () => {
    switch(activeSubTab) {
      case 'structure': return 'Inilah struktur direktori standar industri yang memisahkan kode berdasarkan fitur bisnis (misal: "cashier", "inventory"), bukan sekadar folder global teknikal (misal: "screens", "components"). Struktur ini mempermudah debugging dan mencegah konflik kode saat dikerjakan oleh banyak developer.';
      case 'firebase': return 'Inisialisasi Firebase resmi menggunakan library native berkinerja tinggi. Konfigurasi ini menyertakan script inisialisasi luring (Offline Persistence) dengan memori cache tak terbatas yang memastikan kasir bisa terus melayani pembeli sekalipun toko mati lampu / internet terputus.';
      case 'schema': return 'Di dalam Firestore (NoSQL), prinsip relational diganti dengan denormalisasi taktis. Contohnya: detail items di-flatten masuk ke document transaksi. Ini agar ketika harga produk di inventori dirubah admin di masa depan, data kuitansi yang tercatat di masa lalu tetap akurat. Gunakan storeId di setiap level.';
      case 'zustand': return 'State store menggunakan Zustand yang sangat kecil, modular, dan memiliki overhead re-rendering yang minimal (lebih baik dari React Context atau Redux di React Native). Dilengkapi auto-validasi ketersediaan stok produk dan update diskon parsial yang responsif.';
      case 'rules': return 'Security rules yang aman menutup semua jalan bagi penipuan kasir (fraud). Melakukan validasi tipe data statis, mengonfirmasi kepemilikan data toko, membatasi ukuran input karakter (mencegah Denial of Wallet), dan melarang keras pengeditan atau penghapusan data transaksi historis.';
      case 'printer': return 'Pengendalian printer struk thermal bluetooth portabel berdiameter kertas 58mm (32 karakter kolom horizontal). Mengirimkan command bit native ESC/POS seperti pengaturan perataan teks, pencetakan spasi pembagi kolerasi, serta umpan kertas akhir (paper feed).';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-200" id="guide-tab-container">
      {/* SIDEBAR SELECTOR CODES */}
      <div className="lg:col-span-4 space-y-4" id="guide-sidebar">
        <div className="bg-slate-900/60 rounded-3xl border border-slate-700/30 p-5 shadow-lg space-y-1.5 backdrop-blur-md">
          <span className="text-[9px] uppercase font-mono font-black text-rose-400 tracking-widest block">BLUEPRINT HUB</span>
          <h3 className="text-sm font-black text-slate-100">React Native CLI + Firebase</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pusat instruksi, struktur folder modular, dan kode-kode siap pakai kelas produksi untuk membangun aplikasi kasir mobile pro.
          </p>
        </div>

        {/* Buttons List */}
        <div className="flex flex-col gap-2" id="blueprint-tabs">
          {[
            { id: 'structure', label: '1. Struktur Folder Ritel', icon: FolderTree, accent: 'text-slate-400' },
            { id: 'firebase', label: '2. Firebase SDK Setup', icon: Flame, accent: 'text-rose-400' },
            { id: 'schema', label: '3. Skema Basis Data', icon: Database, accent: 'text-amber-400' },
            { id: 'zustand', label: '4. Zustand Cart Store', icon: ShoppingBag, accent: 'text-teal-400 font-bold' },
            { id: 'rules', label: '5. Aturan Firestore Rules', icon: ShieldCheck, accent: 'text-sky-400' },
            { id: 'printer', label: '6. Printer Thermal Bluetooth', icon: Printer, accent: 'text-purple-400' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`btn-guide-${tab.id}`}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`py-3.5 px-4.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-sky-500/10 border-sky-500/35 text-sky-400 font-bold shadow-md' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs">
                  <Icon size={16} className={isSelected ? 'text-sky-400' : tab.accent} />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pro Tips Box */}
        <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 p-5 space-y-2 text-xs backdrop-blur-md">
          <div className="flex items-center space-x-1.5 text-slate-350 font-black">
            <Info size={14} className="text-sky-400" />
            <span>Developer Tip:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-450">
            Untuk menyambungkan React Native CLI ke Firebase resmi, unduh file <code>google-services.json</code> Anda dari Firebase Console dan tempatkan di folder <code>android/app/</code>. Untuk iOS, impor <code>GoogleService-Info.plist</code> ke Xcode workspace Anda.
          </p>
          <div className="pt-2.5 border-t border-slate-805/80 flex items-center justify-between">
            <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wide">Dukungan: Firebase v11+</span>
            <a 
              href="https://rnfirebase.io/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] text-slate-300 hover:text-sky-400 hover:underline inline-flex items-center space-x-0.5 font-bold cursor-pointer"
            >
              <span>Dokumentasi Resmi</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      {/* CODE VIEW AREA */}
      <div className="lg:col-span-8 bg-slate-900/40 border border-slate-700/30 rounded-3xl overflow-hidden shadow-lg flex flex-col h-full backdrop-blur-md" id="guide-viewer">
        <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="space-y-1.5 flex-1 select-none">
            <h4 className="text-sm font-black text-white">{getTitle()}</h4>
            <p className="text-[11px] text-slate-450 leading-relaxed">{getDescription()}</p>
          </div>
          <button
            onClick={handleCopyCode}
            className={`px-3.5 py-1.5 rounded-xl border text-[11px] font-bold shrink-0 cursor-pointer flex items-center space-x-1.5 transition-all duration-200 ${
              copied 
                ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' 
                : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle size={13} className="text-teal-405" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Salin Kode</span>
              </>
            )}
          </button>
        </div>

        {/* CODE WINDOWS */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-950/80" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          <pre className="font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap select-text">
            <code>{getCodeToCopy().trim()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
export {};
