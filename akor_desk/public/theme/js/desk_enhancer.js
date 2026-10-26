/**
 * AKOR Desktop Theme — JS Injector & Topbar Enhancer + iOS Floating Dock
 * Max lines < 300
 */

(function () {
  'use strict';

  function injectAkorDeskNav() {
    // Wait until standard navbar is rendered
    const navbar = document.querySelector('.navbar .navbar-collapse') || document.querySelector('.navbar-nav') || document.querySelector('.desktop-navbar');
    if (!navbar || document.getElementById('akor-portal-shortcut')) return;

    const shortcut = document.createElement('a');
    shortcut.id = 'akor-portal-shortcut';
    shortcut.href = '/desk';
    shortcut.className = 'akor-desk-portal-badge';
    shortcut.title = 'Buka Launcher Modul AKOR';
    shortcut.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
      <span>Portal Akor</span>
    `;

    const searchBox = document.querySelector('.search-bar') || document.querySelector('.desktop-search-wrapper') || document.querySelector('.navbar-right');
    if (searchBox && searchBox.parentNode) {
      searchBox.parentNode.insertBefore(shortcut, searchBox);
    }
  }

  /**
   * Inject iOS Style Floating Recommendation Dock at bottom-center of Desktop
   */
  function injectIOSRecommendationDock() {
    // Selalu periksa apakah di halaman desktop atau ada elemen .desktop-wrapper / .desktop-container
    const hasDesktopElem = document.querySelector('.desktop-wrapper') || document.querySelector('.desktop-container') || document.querySelector('.icons');
    const currentRoute = window.location.pathname;
    const isDesktopRoute = currentRoute === '/app' || currentRoute === '/desk' || (window.frappe && frappe.get_route_str && frappe.get_route_str() === 'desktop');
    
    const existingDock = document.getElementById('akor-ios-dock-wrapper');
    if (!hasDesktopElem && !isDesktopRoute) {
      if (existingDock) existingDock.remove();
      return;
    }

    if (existingDock) return; // Sudah terpasang

    const dockWrapper = document.createElement('div');
    dockWrapper.id = 'akor-ios-dock-wrapper';
    dockWrapper.className = 'akor-ios-dock-wrapper';

    // Daftar Modul Rekomendasi Utama (Akses Cepat Elegan)
    const recommendations = [
      {
        title: 'Koperasi',
        route: '/app/koperasi',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"/></svg>`,
        badge: 'Utama'
      },
      {
        title: 'Lending',
        route: '/app/lending',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
        badge: 'Kredit'
      },
      {
        title: 'Akuntansi',
        route: '/app/accounting',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>`,
        badge: 'Keuangan'
      },
      {
        title: 'Store POS',
        route: '/app/store-manager',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
        badge: 'Kasir'
      },
      {
        title: 'Karyawan',
        route: '/app/data-karyawan-akor',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        badge: 'HR'
      }
    ];

    let itemsHtml = recommendations.map(item => `
      <a class="akor-dock-btn" href="${item.route}" title="Buka ${item.title}">
        <div class="akor-dock-icon-box">
          ${item.icon}
        </div>
        <span>${item.title}</span>
      </a>
    `).join('');

    dockWrapper.innerHTML = `
      <div class="akor-ios-dock-label">Rekomendasi Pintar</div>
      <div class="akor-ios-dock">
        ${itemsHtml}
      </div>
    `;

    document.body.appendChild(dockWrapper);
  }

  /**
   * Enforce Desktop Grid Layout (Maksimal 4 Kolom Horizontal)
   */
  function applyDesktopGridLayout() {
    // Daftarkan template desktop_icon jika belum ada di template cache frappe
    if (window.frappe && frappe.templates && !frappe.templates["desktop_icon"]) {
      frappe.templates["desktop_icon"] = `
        <a class="desktop-icon" data-id="{{ icon.label }}" data-logo="{{ icon.logo_url }}" data-icon="{{ icon.icon }}" data-type="{{ icon.type }}" style="text-decoration:none">
          {% if (frappe.utils.get_desktop_icon && frappe.utils.get_desktop_icon(icon.label, frappe.boot.desktop_icon_style) && icon.icon_type != "Folder") { %}
            <div class="icon-container">
              <img class="app-icon" src="{{ frappe.utils.get_desktop_icon(icon.label, frappe.boot.desktop_icon_style) }}" alt="{{ icon.label }}" />
            </div>
          {% } else if (icon.logo_url || icon.icon_image) { %}
            <div class="icon-container">
              <img class="app-icon" src="{{ icon.logo_url || icon.icon_image }}" alt="{{ icon.label }}" />
            </div>
          {% } else if (icon.icon_type == "Folder") { %}
            <div class="icon-container folder-icon"></div>
          {% } else { %}
            {%= frappe.utils.desktop_icon(icon.label, icon.bg_color || "gray") %}
          {% } %}
          {% if (!in_folder) { %}
          <div class="icon-caption">
            <div class="icon-title" data-toggle="tooltip" data-original-title="{{ frappe.utils.escape_html(__(icon.label)) }}">{{ frappe.utils.escape_html(__(icon.label)) }}</div>
          </div>
          {% } %}
          {% if (!icon.in_folder && !icon.restrict_removal) { %}
          <div class="hide-button" data-mode="hide">
            {%= frappe.utils.icon("x") %}
          </div>
          {% } %}
        </a>
      `;
    }

    // 1. Suntikkan style absolut berkekuatan tinggi langsung ke HEAD
    if (!document.getElementById('akor-force-grid-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'akor-force-grid-style';
      styleEl.innerHTML = `
        /* Paksa container desktop melebar penuh dan berada di tengah */
        .desktop-wrapper,
        #page-desktop,
        .page-container {
          width: 100% !important;
          max-width: 100% !important;
        }

        .desktop-container {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 auto !important;
          padding: 20px 20px 100px 20px !important;
          box-sizing: border-box !important;
        }

        .icons-container {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          max-width: 900px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          box-sizing: border-box !important;
        }

        /* SUSUNAN 6 KOLOM HORIZONTAL (MENYAMPING) */
        .icons,
        .desktop-container .icons,
        .icons-container .icons {
          display: grid !important;
          grid-template-columns: repeat(6, 140px) !important;
          grid-template-rows: auto !important;
          grid-auto-flow: row !important;
          justify-content: center !important;
          justify-items: center !important;
          align-content: start !important;
          align-items: start !important;
          gap: 28px 24px !important;
          width: 100% !important;
          max-width: 1080px !important;
          margin: 0 auto !important;
          padding: 10px 0 !important;
          box-sizing: border-box !important;
        }

        @media (max-width: 1024px) {
          .icons,
          .desktop-container .icons,
          .icons-container .icons {
            grid-template-columns: repeat(4, 135px) !important;
          }
        }

        @media (max-width: 768px) {
          .icons,
          .desktop-container .icons,
          .icons-container .icons {
            grid-template-columns: repeat(3, 130px) !important;
            gap: 20px 14px !important;
          }
        }

        @media (max-width: 480px) {
          .icons,
          .desktop-container .icons,
          .icons-container .icons {
            grid-template-columns: repeat(2, 120px) !important;
            gap: 16px 12px !important;
          }
        }

        .desktop-icon {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          width: 140px !important;
          height: 126px !important;
          margin: 0 !important;
          padding: 10px !important;
          box-sizing: border-box !important;
          float: none !important;
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // 2. Langsung manipulasi inline CSS elemen di DOM setiap loop
    const iconGrids = document.querySelectorAll('.icons, .desktop-container .icons, .icons-container .icons');
    iconGrids.forEach(function (grid) {
      grid.style.setProperty('display', 'grid', 'important');
      if (window.innerWidth >= 1024) {
        grid.style.setProperty('grid-template-columns', 'repeat(6, 140px)', 'important');
      } else if (window.innerWidth >= 768) {
        grid.style.setProperty('grid-template-columns', 'repeat(4, 135px)', 'important');
      } else {
        grid.style.setProperty('grid-template-columns', 'repeat(3, 120px)', 'important');
      }
      grid.style.setProperty('grid-auto-flow', 'row', 'important');
      grid.style.setProperty('justify-content', 'center', 'important');
      grid.style.setProperty('justify-items', 'center', 'important');
      grid.style.setProperty('align-content', 'start', 'important');
      grid.style.setProperty('align-items', 'start', 'important');
      grid.style.setProperty('gap', '28px 24px', 'important');
      grid.style.setProperty('max-width', '1080px', 'important');
      grid.style.setProperty('width', '100%', 'important');
      grid.style.setProperty('margin', '0 auto', 'important');
    });

    const dContainers = document.querySelectorAll('.desktop-container');
    dContainers.forEach(function (el) {
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('flex-direction', 'column', 'important');
      el.style.setProperty('align-items', 'center', 'important');
      el.style.setProperty('width', '100%', 'important');
    });

    const iContainers = document.querySelectorAll('.icons-container');
    iContainers.forEach(function (el) {
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('flex-direction', 'column', 'important');
      el.style.setProperty('align-items', 'center', 'important');
      el.style.setProperty('max-width', '900px', 'important');
      el.style.setProperty('width', '100%', 'important');
    });

    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(function (icon) {
      icon.style.setProperty('display', 'flex', 'important');
      icon.style.setProperty('flex-direction', 'column', 'important');
      icon.style.setProperty('align-items', 'center', 'important');
      icon.style.setProperty('width', '140px', 'important');
      icon.style.setProperty('height', '126px', 'important');
      icon.style.setProperty('flex', '0 0 140px', 'important');
      icon.style.setProperty('margin', '0', 'important');
    });
  }

  // Hook into frappe routing & initialization
  $(document).on('app_ready toolbar_setup page_change desktop_screen', function () {
    injectAkorDeskNav();
    injectIOSRecommendationDock();
    applyDesktopGridLayout();
  });

  // Watch route change in Frappe router
  if (window.frappe && frappe.router) {
    frappe.router.on('change', function () {
      setTimeout(function () {
        injectIOSRecommendationDock();
        applyDesktopGridLayout();
      }, 100);
      setTimeout(function () {
        injectIOSRecommendationDock();
        applyDesktopGridLayout();
      }, 400);
    });
  }

  // Polling loop interval to guarantee rendering on SPA transitions
  setInterval(function () {
    injectAkorDeskNav();
    injectIOSRecommendationDock();
    applyDesktopGridLayout();
  }, 1000);
})();
