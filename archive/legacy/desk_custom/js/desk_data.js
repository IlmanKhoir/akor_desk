/**
 * desk_data.js - Master Registry Modul Aplikasi Proyek AKOR & ERP
 * Tersambung langsung ke Workspaces & DocTypes riil di sistem
 * Max lines < 300
 */

window.AKOR_APPS_DATA = [
  // 1. AKOR
  {
    id: 'akor',
    title: 'AKOR',
    subtitle: 'Sistem Inti Koperasi',
    desc: 'Modul sentral tata kelola administrasi dan operasional Koperasi Akor.',
    category: 'all',
    icon: 'fa-building-columns',
    bgClass: 'bg-emerald',
    logo: '/assets/akor/logo_akasia.png',
    cardBorder: '#e5e7eb',
    tag: 'APLIKASI',
    tagClass: 'badge-primary',
    features: 'Koperasi, Anggota, Transaksi',
    url: '/koperasi'
  },

  // 2. AKOR POS
  {
    id: 'akor-pos',
    title: 'Akor POS',
    subtitle: 'Kasir & Point of Sale',
    desc: 'Aplikasi kasir cepat minimarket toko koperasi, penjualan, dan cetak struk.',
    category: 'operations',
    icon: 'fa-cash-register',
    bgClass: 'bg-indigo',
    logo: '/assets/akor/logo_akasia.png',
    cardBorder: '#e5e7eb',
    tag: 'POS',
    tagClass: 'badge-indigo',
    features: 'Kasir, Struk, Barcode',
    url: '/app/pos'
  },

  // 3. Framework
  {
    id: 'framework',
    title: 'Framework',
    subtitle: 'Frappe Framework System',
    desc: 'Pengaturan arsitektur sistem, DocType kustom, modul integrasi, dan developer tools.',
    category: 'business',
    icon: 'fa-cube',
    bgClass: 'bg-slate',
    cardBorder: '#e5e7eb',
    tag: 'SYSTEM',
    tagClass: 'badge-slate',
    features: 'DocType, Modul, Setup',
    url: '/app/build'
  },

  // 4. Frappe Framework
  {
    id: 'frappe-framework',
    title: 'Frappe Framework',
    subtitle: 'Core Engine Platform',
    desc: 'Konsol administrasi server, pengguna, hak akses peranan (Role & Permissions), dan log audit.',
    category: 'business',
    icon: 'fa-cubes',
    bgClass: 'bg-slate',
    cardBorder: '#e5e7eb',
    tag: 'CORE',
    tagClass: 'badge-slate',
    features: 'User, Role, System Log',
    url: '/app/user'
  },

  // 5. GCG Akor
  {
    id: 'gcg-akor',
    title: 'GCG Akor',
    subtitle: 'Good Corporate Governance',
    desc: 'Workspace kepatuhan, tata kelola, regulasi internal pengurus, dan monitoring koperasi.',
    category: 'finance',
    icon: 'fa-shield-halved',
    bgClass: 'bg-cyan',
    cardBorder: '#e5e7eb',
    tag: 'GOVERNANCE',
    tagClass: 'badge-cyan',
    features: 'Regulasi, Pengawas, Plafon',
    url: '/app/gcg-akor'
  },

  // 6. Lending / Pinjaman Koperasi
  {
    id: 'lending',
    title: 'Lending / Pinjaman',
    subtitle: 'Pinjaman & Pembiayaan',
    desc: 'Pengajuan kredit anggota, agunan/jaminan, kalkulasi denda keterlambatan, dan pencairan.',
    category: 'finance',
    icon: 'fa-landmark',
    bgClass: 'bg-emerald',
    cardBorder: '#e5e7eb',
    tag: 'PINJAMAN',
    tagClass: 'badge-emerald',
    features: 'Plafon, Angsuran, Agunan',
    url: '/app/loan'
  },

  // 7. Store Manager
  {
    id: 'store-manager',
    title: 'Store Manager',
    subtitle: 'Pengelolaan Toko & Inventori',
    desc: 'Katalog etalase barang, harga khusus anggota koperasi, dan stok toko retail.',
    category: 'operations',
    icon: 'fa-store',
    bgClass: 'bg-amber',
    cardBorder: '#e5e7eb',
    tag: 'RETAIL',
    tagClass: 'badge-amber',
    features: 'Katalog, Toko, Mutasi Stok',
    url: '/app/store-manager'
  },

  // 8. ERPNext
  {
    id: 'erpnext',
    title: 'ERPNext',
    subtitle: 'Enterprise Resource Planning',
    desc: 'Modul akuntansi komprehensif, buku besar, neraca saldo, pembelian, dan laporan keuangan.',
    category: 'finance',
    icon: 'fa-chart-pie',
    bgClass: 'bg-blue',
    cardBorder: '#e5e7eb',
    tag: 'ERP',
    tagClass: 'badge-blue',
    features: 'Accounting, Ledger, Journal',
    url: '/app/accounts'
  }
];
