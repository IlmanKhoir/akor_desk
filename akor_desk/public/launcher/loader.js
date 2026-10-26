(() => {
  const THEME_ID = "akor-desk-theme";
  const LAUNCHER_PATHS = new Set(["/", "/desk", "/desk/"]);
  const ALLOWED_MODULES = new Set([
    "akor",
    "framework",
    "lending",
    "organization",
    "store manager",
    "accounting",
    "assets",
    "buying",
    "manufacturing",
    "projects",
    "quality",
    "selling",
    "stock",
    "subcontracting",
    "erpnext settings",
  ]);
  const DOCK_ITEMS = [
    { title: "Koperasi", route: "/koperasi", icon: "K" },
    { title: "Lending", route: "/app/lending", icon: "Rp" },
    { title: "Akuntansi", icon: "A" },
    { title: "Store POS", route: "/app/posapp/pos", icon: "POS" },
    { title: "Karyawan", route: "/app/karyawan", icon: "HR" },
  ];

  const isLauncher = () => LAUNCHER_PATHS.has(window.location.pathname);
  const setLoading = (loading) => {
    document.documentElement.classList.toggle("akor-launcher-loading", loading);
  };

  // Apply this before DOMContentLoaded: the raw Frappe launcher must never
  // paint before its theme and dock have been initialized.
  if (isLauncher()) setLoading(true);

  const finishLoading = () => {
    if (!isLauncher()) {
      return;
    }

    requestAnimationFrame(() => requestAnimationFrame(() => setLoading(false)));
  };

  const syncTheme = () => {
    let theme = document.getElementById(THEME_ID);

    if (isLauncher()) {
      if (!theme) {
        theme = document.createElement("link");
        theme.id = THEME_ID;
        theme.rel = "stylesheet";
        theme.href = "/assets/akor_desk/theme/css/desk_theme.css?v=20261023_007";
        theme.addEventListener("load", finishLoading, { once: true });
        theme.addEventListener("error", finishLoading, { once: true });
        document.head.appendChild(theme);
      } else if (theme.sheet) {
        finishLoading();
      }
    } else {
      theme?.remove();
      setLoading(false);
    }
  };

  const moduleName = (icon) => {
    return (icon.dataset.id || icon.querySelector(".icon-title")?.textContent || "")
      .trim()
      .toLowerCase();
  };

  const limitModules = () => {
    if (!isLauncher()) {
      return;
    }

    document.querySelectorAll(".desktop-icon").forEach((icon) => {
      icon.classList.toggle("akor-module-hidden", !ALLOWED_MODULES.has(moduleName(icon)));
    });
  };

  const createDockItem = ({ title, route, icon }) => {
    const item = route ? document.createElement("a") : document.createElement("button");
    item.className = "akor-dock-btn";

    if (route) {
      item.href = route;
      item.title = `Buka ${title}`;
    } else {
      item.type = "button";
      item.classList.add("akor-dock-menu-trigger");
      item.setAttribute("aria-expanded", "false");
    }

    const iconBox = document.createElement("div");
    iconBox.className = "akor-dock-icon-box";
    iconBox.textContent = icon;

    const label = document.createElement("span");
    label.textContent = title;
    item.append(iconBox, label);

    return item;
  };

  const createDockMenu = () => {
    const menu = document.createElement("div");
    menu.className = "akor-dock-menu";
    menu.hidden = true;

    const accountingLink = document.createElement("a");
    accountingLink.href = "/app/accounting";
    accountingLink.textContent = "Accounting";
    menu.appendChild(accountingLink);

    return menu;
  };

  let dockOutsideClickHandler;

  const removeDock = () => {
    document.getElementById("akor-ios-dock-wrapper")?.remove();
    if (dockOutsideClickHandler) {
      document.removeEventListener("click", dockOutsideClickHandler);
      dockOutsideClickHandler = undefined;
    }
  };

  const syncDock = () => {
    if (!isLauncher()) {
      removeDock();
      return;
    }

    if (document.getElementById("akor-ios-dock-wrapper")) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.id = "akor-ios-dock-wrapper";
    wrapper.className = "akor-ios-dock-wrapper";
    const dock = document.createElement("div");
    dock.className = "akor-ios-dock";
    DOCK_ITEMS.forEach((item) => dock.appendChild(createDockItem(item)));

    const menu = createDockMenu();
    wrapper.append(dock, menu);
    document.body.appendChild(wrapper);

    const trigger = wrapper.querySelector(".akor-dock-menu-trigger");
    trigger.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
    });

    dockOutsideClickHandler = (event) => {
      if (!wrapper.contains(event.target)) {
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      }
    };
    document.addEventListener("click", dockOutsideClickHandler);
  };

  const sync = () => {
    syncTheme();
    syncDock();
    limitModules();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", sync, { once: true }); else sync();
  frappe.router?.on?.("change", () => setTimeout(sync, 0));
  new MutationObserver(() => limitModules()).observe(document.documentElement, { childList: true, subtree: true });

  // Avoid a permanent overlay if the theme request is interrupted.
  window.setTimeout(finishLoading, 4000);
})();
