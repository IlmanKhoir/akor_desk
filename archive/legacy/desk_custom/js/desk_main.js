/**
 * desk_main.js - Event Listeners, State Controller, Shortcuts
 * Under 300 lines
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentCategory = 'all';
  let currentSearch = '';

  // Initial render
  AkorDeskUI.renderApps(window.AKOR_APPS_DATA, currentCategory, currentSearch);

  // Setup Realtime Clock
  AkorDeskUI.updateClock();
  setInterval(() => AkorDeskUI.updateClock(), 1000);

  // Global Click Navigation Handling for Cards and Dock Items
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.minimal-app-icon') || e.target.closest('.app-card');
    if (card) {
      const href = card.getAttribute('href');
      if (href) {
        e.preventDefault();
        e.stopPropagation();
        window.location.assign(href);
        return;
      }
    }

    const dockLink = e.target.closest('a.dock-item');
    if (dockLink) {
      const href = dockLink.getAttribute('href');
      if (href) {
        e.preventDefault();
        e.stopPropagation();
        window.location.assign(href);
        return;
      }
    }
  }, true);

  // Parse Boot user metadata
  try {
    if (window.frappe_boot) {
      const boot = typeof window.frappe_boot === 'string' ? JSON.parse(window.frappe_boot) : window.frappe_boot;
      const nameEl = document.getElementById('user-display-name');
      const initialsEl = document.getElementById('user-initials');
      if (boot.user_fullname && nameEl) {
        nameEl.textContent = boot.user_fullname;
        if (initialsEl) {
          const parts = boot.user_fullname.trim().split(' ');
          initialsEl.textContent = parts.map(p => p[0]).slice(0, 2).join('').toUpperCase();
        }
      }
    }
  } catch (e) {
    console.warn('[AKOR Desktop] Boot parse warning:', e);
  }

  // Category Tabs filtering
  const tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category') || 'all';
      AkorDeskUI.renderApps(window.AKOR_APPS_DATA, currentCategory, currentSearch);
    });
  });

  // Search input filtering
  const searchInput = document.getElementById('akor-desk-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      AkorDeskUI.renderApps(window.AKOR_APPS_DATA, currentCategory, currentSearch);
    });
  }

  // Keyboard shortcut Ctrl + K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  // User Profile Dropdown Toggle
  const userTrigger = document.getElementById('user-profile-trigger');
  const userDropdown = document.getElementById('user-dropdown');
  if (userTrigger && userDropdown) {
    userTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      userDropdown.classList.remove('show');
    });
  }

  // Fullscreen dock trigger
  const fsBtn = document.getElementById('btn-portal-fullscreen');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }
});
