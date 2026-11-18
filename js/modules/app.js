/**
 * KOPY Office — Main Application Entry Point
 */

import { initRouter } from './router.js';
import { getIcon } from './helpers.js';
import { KopyStorage } from './storage.js';

function hydrateSidebarIcons() {
  document.querySelectorAll('.nav-icon[data-icon]').forEach((el) => {
    const iconName = el.getAttribute('data-icon');
    el.innerHTML = getIcon(iconName);
  });
}

function hydrateBrandLogo() {
  const settings = KopyStorage.getSettings();
  const sidebarLogo = document.getElementById('sidebar-logo');
  if (sidebarLogo && settings.logoDataUrl) {
    sidebarLogo.src = settings.logoDataUrl;
  }
}

function setupMobileNavigation() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const openBtn = document.getElementById('sidebar-open-btn');
  const closeBtn = document.getElementById('sidebar-close-btn');

  if (!sidebar || !backdrop || !openBtn || !closeBtn) {
    return () => {};
  }

  function openDrawer() {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-visible');
    openBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  return closeDrawer;
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateSidebarIcons();
  hydrateBrandLogo();
  const closeMobileDrawer = setupMobileNavigation();

  initRouter(() => {
    closeMobileDrawer();
  });
});
