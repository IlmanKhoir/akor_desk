window.AkorDeskUI = {
  renderApps(apps, filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('apps-grid');
    if (!grid) return;

    const query = (searchQuery || '').trim().toLowerCase();

    const filtered = apps.filter(app => {
      const matchCat = filterCategory === 'all' || app.category === filterCategory;
      const matchQuery = !query || 
        app.title.toLowerCase().includes(query) ||
        app.subtitle.toLowerCase().includes(query) ||
        app.desc.toLowerCase().includes(query) ||
        app.features.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 36px; color: var(--os-text-muted); margin-bottom: 12px;">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <h3 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">Tidak Ada Aplikasi Ditemukan</h3>
          <p style="font-size: 13px; color: var(--os-text-secondary);">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua Aplikasi.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(app => this.generateCardHTML(app)).join('');
  },

  generateCardHTML(app) {
    const iconContent = app.logo 
      ? `<img src="${app.logo}" alt="${app.title}" style="width: 52px; height: 52px; object-fit: contain;">`
      : `<i class="fa-solid ${app.icon}" style="font-size: 32px; color: #4b5563;"></i>`;

    return `
      <a href="${app.url}" class="minimal-app-icon" data-id="${app.id}" onclick="event.preventDefault(); window.location.assign('${app.url}'); return false;" style="display:flex; flex-direction:column; align-items:center; text-decoration:none; width: 140px; margin: 0 auto; cursor:pointer;">
        <div style="width: 76px; height: 76px; border-radius: 18px; background: #ffffff; border: 1px solid #e5e7eb; display:flex; align-items:center; justify-content:center; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 12px; transition: transform 0.2s ease, box-shadow 0.2s ease;">
          ${iconContent}
        </div>
        <span style="font-size: 13.5px; font-weight: 600; color: #1f2937; text-align: center; line-height: 1.3;">${app.title}</span>
      </a>
    `;
  },

  updateClock() {
    const el = document.getElementById('realtime-clock');
    if (!el) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${hours}:${mins}:${secs}`;
  }
};
