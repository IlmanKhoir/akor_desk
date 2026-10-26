(() => {
  const syncDock = () => {
    if (window.location.pathname !== "/desk" && window.location.pathname !== "/desk/") {
      document.getElementById("akor-ios-dock-wrapper")?.remove();
      return;
    }
    document.querySelectorAll(".desktop-icon").forEach((icon) => {
      const label = (icon.dataset.id || icon.querySelector(".icon-title")?.textContent || "").trim().toLowerCase();
      if (["gcg akor", "akor pos", "portal anggota"].includes(label)) icon.style.setProperty("display", "none", "important");
    });
    if (document.getElementById("akor-ios-dock-wrapper")) return;
    const items = [["Koperasi", "/koperasi", "K"], ["Lending", "/app/lending", "Rp"], ["Akuntansi", null, "A"], ["Store POS", "/app/posapp/pos", "POS"], ["Karyawan", "/app/karyawan", "HR"]];
    const wrapper = document.createElement("div");
    wrapper.id = "akor-ios-dock-wrapper";
    wrapper.className = "akor-ios-dock-wrapper";
    wrapper.innerHTML = `<div class="akor-ios-dock">${items.map(([title, route, icon]) => route ? `<a class="akor-dock-btn" href="${route}" title="Buka ${title}"><div class="akor-dock-icon-box">${icon}</div><span>${title}</span></a>` : `<button class="akor-dock-btn akor-dock-menu-trigger" type="button" aria-expanded="false"><div class="akor-dock-icon-box">${icon}</div><span>${title}</span></button>`).join("")}</div><div class="akor-dock-menu" hidden><a href="/app/accounting">Accounting</a></div>`;
    document.body.appendChild(wrapper);
    const trigger = wrapper.querySelector(".akor-dock-menu-trigger");
    const menu = wrapper.querySelector(".akor-dock-menu");
    trigger.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) { menu.hidden = true; trigger.setAttribute("aria-expanded", "false"); }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", syncDock, { once: true });
  else syncDock();
  frappe.router?.on?.("change", () => setTimeout(syncDock, 0));
})();
