/**
 * KOPY Office — Hash Router (Kompatibel Penuh dengan GitHub Pages)
 */

import { renderDashboard } from './modules/dashboard.js';
import { renderSurat } from './modules/surat.js';
import { renderAgenda } from './modules/agenda.js';
import { renderNotulen } from './modules/notulen.js';
import { renderLaporan } from './modules/laporan.js';
import { renderArsip } from './modules/arsip.js';
import { renderPengurus } from './modules/pengurus.js';
import { renderPengaturan } from './modules/pengaturan.js';

const ROUTES = {
  dashboard: {
    title: 'Dashboard',
    render: renderDashboard
  },
  surat: {
    title: 'Surat Menyurat',
    render: renderSurat
  },
  agenda: {
    title: 'Agenda',
    render: renderAgenda
  },
  notulen: {
    title: 'Notulen',
    render: renderNotulen
  },
  laporan: {
    title: 'Laporan',
    render: renderLaporan
  },
  arsip: {
    title: 'Arsip',
    render: renderArsip
  },
  pengurus: {
    title: 'Data Pengurus',
    render: renderPengurus
  },
  pengaturan: {
    title: 'Pengaturan',
    render: renderPengaturan
  }
};

function parseRouteFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!hash || !ROUTES[hash]) {
    return 'dashboard';
  }
  return hash;
}

export function navigateTo(routeKey) {
  const target = ROUTES[routeKey] ? routeKey : 'dashboard';
  window.location.hash = `#/${target}`;
}

export function renderCurrentRoute(onRouteRendered) {
  const routeKey = parseRouteFromHash();
  const routeConfig = ROUTES[routeKey];
  const contentContainer = document.getElementById('app-content');
  const titleEl = document.getElementById('topbar-page-title');

  if (!contentContainer) return;

  if (titleEl) {
    titleEl.textContent = routeConfig.title;
  }

  document.title = `${routeConfig.title} — KOPY Office`;

  // Perbarui status aktif menu sidebar
  document.querySelectorAll('.nav-link[data-route]').forEach((link) => {
    const isMatch = link.getAttribute('data-route') === routeKey;
    link.classList.toggle('active', isMatch);
    if (isMatch) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Render halaman modul
  contentContainer.innerHTML = '';
  routeConfig.render(contentContainer);
  window.scrollTo({ top: 0, behavior: 'auto' });

  if (typeof onRouteRendered === 'function') {
    onRouteRendered(routeKey);
  }
}

export function initRouter(onRouteRendered) {
  window.addEventListener('hashchange', () => {
    renderCurrentRoute(onRouteRendered);
  });

  if (!window.location.hash) {
    window.location.hash = '#/dashboard';
  } else {
    renderCurrentRoute(onRouteRendered);
  }
}
