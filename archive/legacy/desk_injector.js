(function () {
  'use strict';

  // 1. Intercept navigasi modul Koperasi
  $(document).on('click', '.desktop-icon[data-id="AKOR"], .desktop-icon[data-id="Koperasi"], .app-item, .app-card', function (e) {
    var id = $(this).attr('data-id') || '';
    var text = $(this).text().trim();
    if (id === 'AKOR' || id === 'Koperasi' || text.includes('AKOR') || text.includes('Koperasi')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.href = '/koperasi';
      return false;
    }
  });

  // Pemetaan Kategori Aplikasi untuk Filter
  var appCategories = {
    'AKOR': 'koperasi',
    'Lending': 'koperasi',
    'Accounting': 'finance',
    'Assets': 'finance',
    'Buying': 'supplychain',
    'Selling': 'supplychain',
    'Stock': 'supplychain',
    'Manufacturing': 'supplychain',
    'Subcontracting': 'supplychain',
    'Store Manager': 'koperasi',
    'Projects': 'corporate',
    'Quality': 'corporate',
    'Organization': 'corporate',
    'Framework': 'governance',
    'ERPNext Settings': 'governance'
  };

  // 2. Render Corporate Executive Command Center Layout
  function isTargetWorkspace() {
    return false; // Nonaktifkan injeksi override agar tampilan depan kembali seperti sebelumnya
  }

  function getWorkspaceContainer() {
    // 1. Cek EditorJS container di Workspace Frappe v16
    var $wsEditor = $('#page-Workspaces .editor-js-container, .page-container[data-page-route="Workspaces"] .editor-js-container, .layout-main-section .editor-js-container');
    if ($wsEditor.length && $wsEditor.is(':visible')) {
      return $wsEditor.first();
    }

    // 2. Cek layout main section di Workspace
    var $layoutMain = $('#page-Workspaces .layout-main-section, .page-container[data-page-route="Workspaces"] .layout-main-section, .layout-main-section');
    if ($layoutMain.length && $layoutMain.is(':visible')) {
      return $layoutMain.first();
    }

    // 3. Fallback jika desk klasik atau launcher desktop
    var $desktopContainer = $('.desktop-wrapper .desktop-container, #page-desktop .desktop-container, .desktop-container');
    if ($desktopContainer.length) {
      return $desktopContainer.first();
    }

    return null;
  }

  function renderExecutivePortal() {
    if (!isTargetWorkspace()) {
      $('.corp-executive-showcase').remove();
      return;
    }

    var $target = getWorkspaceContainer();
    if (!$target || !$target.length) return;

    if ($('.corp-executive-showcase').length) {
      organizeDesktopGrid();
      return;
    }

    // Bangun Executive Showcase Header & Corporate KPI Strip
    var showcaseHtml = `
      <div class="corp-executive-showcase">
        <!-- Banner Hero Eksekutif Korporat -->
        <div class="corp-hero-card">
          <div class="corp-hero-bg-glow"></div>
          
          <div class="corp-hero-content">
            <div class="corp-entity-badge">
              <span class="corp-pulse-dot"></span>
              <span class="corp-badge-text">PT AKASIA UTAMA TBK &bull; KOPERASI KARYAWAN INTEGRATED ECOSYSTEM</span>
              <span class="corp-tier-pill"><i class="fa fa-shield"></i> GRADE AAA SEHAT</span>
            </div>

            <div class="corp-hero-row">
              <div class="corp-hero-title-group">
                <h1 class="corp-hero-title">
                  Portal Eksekutif <span class="corp-gradient-title">Koperasi & Bisnis</span>
                </h1>
                <p class="corp-hero-subtitle">
                  Pusat kendali terpadu layanan simpan pinjam anggota, integrasi payroll, supply chain ritel karyawan, dan tata kelola korporat GCG terstandarisasi.
                </p>
              </div>

              <div class="corp-quick-actions">
                <a href="/koperasi" class="corp-btn-primary">
                  <i class="fa fa-university"></i>
                  <span>Buka Portal Anggota</span>
                </a>
                <a href="/app/gcg-dashboard" class="corp-btn-secondary">
                  <i class="fa fa-bar-chart"></i>
                  <span>Analisis Eksekutif & GCG</span>
                </a>
              </div>
            </div>

            <!-- Strip KPI Mini Koperasi Korporat -->
            <div class="corp-kpi-grid">
              <div class="corp-kpi-card">
                <div class="corp-kpi-icon blue"><i class="fa fa-users"></i></div>
                <div class="corp-kpi-meta">
                  <span class="kpi-label">Total Anggota Karyawan</span>
                  <div class="kpi-value-row">
                    <span class="kpi-num">1.480+</span>
                    <span class="kpi-trend positive"><i class="fa fa-arrow-up"></i> 100% PT Staff</span>
                  </div>
                </div>
              </div>

              <div class="corp-kpi-card">
                <div class="corp-kpi-icon emerald"><i class="fa fa-shield"></i></div>
                <div class="corp-kpi-meta">
                  <span class="kpi-label">Likuiditas & Kesehatan</span>
                  <div class="kpi-value-row">
                    <span class="kpi-num">98.4%</span>
                    <span class="kpi-trend prime">Sangat Sehat</span>
                  </div>
                </div>
              </div>

              <div class="corp-kpi-card">
                <div class="corp-kpi-icon indigo"><i class="fa fa-money"></i></div>
                <div class="corp-kpi-meta">
                  <span class="kpi-label">Penyaluran Pinjaman</span>
                  <div class="kpi-value-row">
                    <span class="kpi-num">Auto Payroll</span>
                    <span class="kpi-trend positive"><i class="fa fa-check-circle"></i> Potong Gaji</span>
                  </div>
                </div>
              </div>

              <div class="corp-kpi-card">
                <div class="corp-kpi-icon amber"><i class="fa fa-shopping-basket"></i></div>
                <div class="corp-kpi-meta">
                  <span class="kpi-label">Unit Ritel Koperasi</span>
                  <div class="kpi-value-row">
                    <span class="kpi-num">POS Terpadu</span>
                    <span class="kpi-trend positive"><i class="fa fa-link"></i> Live Kasir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 1: Bento Layanan Unggulan Koperasi PT -->
        <div class="corp-section-header">
          <div class="section-title-wrap">
            <span class="section-tag">SERVICES</span>
            <h2 class="section-heading">Layanan Strategis Koperasi PT</h2>
          </div>
          <div class="section-note">Akses langsung fasilitas prioritas pengurus dan anggota</div>
        </div>

        <div class="corp-bento-grid">
          <!-- Bento 1: Portal Koperasi & Pendaftaran -->
          <a href="/koperasi" class="corp-bento-card bento-feature">
            <div class="bento-badge">PRIORITAS UTAMA</div>
            <div class="bento-icon-box blue-grad">
              <i class="fa fa-building-o"></i>
            </div>
            <div class="bento-content">
              <h3>Portal Koperasi Digital Karyawan</h3>
              <p>Self-service registrasi anggota, simulasi pinjaman bunga flat, transaksi simpanan, dan verifikasi instan.</p>
              <div class="bento-footer">
                <span class="bento-link-text">Akses Portal Mandiri <i class="fa fa-arrow-right"></i></span>
              </div>
            </div>
          </a>

          <!-- Bento 2: Buku Simpanan Anggota -->
          <a href="/app/simpanan-transaksi" class="corp-bento-card">
            <div class="bento-icon-box emerald-grad">
              <i class="fa fa-database"></i>
            </div>
            <div class="bento-content">
              <h3>Buku Tabungan & Simpanan</h3>
              <p>Simpanan Pokok, Wajib, Sukarela, dan Berjangka dengan cetak mutasi digital.</p>
              <div class="bento-footer">
                <span class="bento-link-text">Kelola Simpanan <i class="fa fa-arrow-right"></i></span>
              </div>
            </div>
          </a>

          <!-- Bento 3: Pengajuan Pinjaman & Pembiayaan -->
          <a href="/app/pengajuan-pinjaman" class="corp-bento-card">
            <div class="bento-icon-box amber-grad">
              <i class="fa fa-file-text-o"></i>
            </div>
            <div class="bento-content">
              <h3>Pembiayaan & Pinjaman</h3>
              <p>Alur persetujuan pengurus, plafon berbasis gaji, dan skema potong gaji bulanan.</p>
              <div class="bento-footer">
                <span class="bento-link-text">Daftar Pengajuan <i class="fa fa-arrow-right"></i></span>
              </div>
            </div>
          </a>

          <!-- Bento 4: Unit Ritel & Toko Karyawan -->
          <a href="/app/store-manager" class="corp-bento-card">
            <div class="bento-icon-box indigo-grad">
              <i class="fa fa-shopping-cart"></i>
            </div>
            <div class="bento-content">
              <h3>Toko & Konsinyasi PT</h3>
              <p>Manajemen kasir retail karyawan, sembako murah, dan potongan belanja payroll.</p>
              <div class="bento-footer">
                <span class="bento-link-text">Buka Store Manager <i class="fa fa-arrow-right"></i></span>
              </div>
            </div>
          </a>
        </div>

        <!-- Section 2: Toolbar Navigasi Modul Enterprise -->
        <div class="corp-section-header margin-top">
          <div class="section-title-wrap">
            <span class="section-tag">ENTERPRISE SUITE</span>
            <h2 class="section-heading">Seluruh Modul Operasional & ERP</h2>
          </div>
          
          <div class="corp-toolbar-filter">
            <button class="corp-tab-btn active" data-filter="all">
              <i class="fa fa-th"></i> Semua Modul
            </button>
            <button class="corp-tab-btn" data-filter="koperasi">
              <i class="fa fa-university"></i> Koperasi & Toko
            </button>
            <button class="corp-tab-btn" data-filter="finance">
              <i class="fa fa-line-chart"></i> Keuangan PT
            </button>
            <button class="corp-tab-btn" data-filter="supplychain">
              <i class="fa fa-cubes"></i> Logistik & Supply Chain
            </button>
            <button class="corp-tab-btn" data-filter="governance">
              <i class="fa fa-sliders"></i> Tata Kelola & Sistem
            </button>
          </div>
        </div>
      </div>
    `;

    $target.prepend(showcaseHtml);

    // Tata ulang grid ikon asli Frappe atau workspace blocks
    organizeDesktopGrid();

    // Event filter tab
    $(document).off('click', '.corp-tab-btn').on('click', '.corp-tab-btn', function () {
      $('.corp-tab-btn').removeClass('active');
      $(this).addClass('active');

      var filter = $(this).data('filter');
      filterIcons(filter);
    });

    // Render Quick Link ke Portal Koperasi di Top Navbar Frappe jika belum ada
    renderNavbarPortalButton();
  }

  // Quick Button di Navbar Frappe (sebelah kanan searchbar / awesombar)
  function renderNavbarPortalButton() {
    if ($('.kd-navbar-portal-link').length) return;
    var $navbarContainer = $('.navbar .navbar-collapse, .navbar .vertical-bar').first().parent();
    if (!$navbarContainer.length) {
      $navbarContainer = $('.navbar .container, .navbar').first();
    }
    if ($navbarContainer.length) {
      var btnHtml = `
        <a href="/koperasi" class="kd-navbar-portal-link" style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg, #1e40af, #2563eb);color:#fff;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;text-decoration:none;margin-left:12px;box-shadow:0 2px 6px rgba(37,99,235,0.3);z-index:1000;" title="Buka Portal Koperasi & Bisnis Karyawan">
          <i class="fa fa-university"></i>
          <span>Portal Koperasi</span>
        </a>
      `;
      if ($('.navbar .navbar-nav').length) {
        $('.navbar .navbar-nav').first().before(btnHtml);
      } else {
        $navbarContainer.append(btnHtml);
      }
    }
  }

  // Tata kategori icon bawaan
  function organizeDesktopGrid() {
    $('.desktop-icon').each(function () {
      var id = $(this).attr('data-id') || $(this).find('.icon-title').text().trim();
      var assigned = 'supplychain';

      for (var key in appCategories) {
        if (id.toLowerCase().includes(key.toLowerCase())) {
          assigned = appCategories[key];
          break;
        }
      }
      $(this).attr('data-corp-category', assigned);
    });
  }

  function filterIcons(filter) {
    organizeDesktopGrid();
    $('.desktop-icon').each(function () {
      var cat = $(this).attr('data-corp-category') || 'supplychain';
      if (filter === 'all' || cat === filter) {
        $(this).css({ 'display': 'flex', 'opacity': '1' });
      } else {
        $(this).css({ 'display': 'none', 'opacity': '0' });
      }
    });
  }

  // Dock macOS Bawah untuk Quick Action Eksekutif
  function renderCorporateDock() {
    return;
  }

  // 3. Lifecycle Hooks
  function initSuite() {
    renderExecutivePortal();
  }

  $(document).ready(function () {
    initSuite();

    $(document).on('desktop_screen page-change workspace-rendered', function () {
      setTimeout(initSuite, 50);
      setTimeout(initSuite, 200);
      setTimeout(initSuite, 500);
    });

    if (window.frappe && frappe.router) {
      frappe.router.on('change', function () {
        var r = frappe.get_route_str();
        var route = frappe.get_route();
        var isHomeWs = false;

        if (r === 'desktop' || r === '' || r === 'app') {
          isHomeWs = true;
        } else if (route && route[0] === 'Workspaces') {
          var wsName = (route[1] === 'private' ? route[2] : route[1]) || '';
          wsName = wsName.toLowerCase();
          if (!wsName || wsName === 'home' || wsName === 'lending' || wsName === 'akor' || wsName === 'build') {
            isHomeWs = true;
          }
        }

        if (isHomeWs) {
          $('.corp-executive-dock').show();
          setTimeout(initSuite, 50);
          setTimeout(initSuite, 250);
          setTimeout(initSuite, 600);
        } else {
          $('.corp-executive-dock').hide();
          $('.corp-executive-showcase').remove();
        }
      });
    }

    // Observer untuk mendeteksi inject saat EditorJS selesai dimuat atau SPA berganti rute
    var attempts = 0;
    var timer = setInterval(function () {
      attempts++;
      if (getWorkspaceContainer()) {
        initSuite();
      }
      if (attempts > 50) {
        clearInterval(timer);
      }
    }, 400);

    // MutationObserver untuk memastikan UI tetap bertahan saat EditorJS re-render
    var bodyObs = new MutationObserver(function (mutations) {
      if (isTargetWorkspace() && !$('.corp-executive-showcase').length && getWorkspaceContainer()) {
        initSuite();
      }
    });

    bodyObs.observe(document.body, { childList: true, subtree: true });
  });

})();

