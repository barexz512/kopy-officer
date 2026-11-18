/**
 * KOPY Office — Modul Dashboard (Tahap 1)
 */

import { KopyStorage } from '../storage.js';
import { formatTanggalIndonesia, getSapaanWaktu, getIcon, escapeHTML } from '../helpers.js';
import { navigateTo } from '../router.js';

export function renderDashboard(container) {
  const counts = KopyStorage.getSummaryCounts();
  const settings = KopyStorage.getSettings();
  const sapaan = getSapaanWaktu();
  const tanggalHariIni = formatTanggalIndonesia(new Date(), true);
  const namaSekretaris = settings.namaSekretaris
    ? `Sekretariat KOPY (${escapeHTML(settings.namaSekretaris)})`
    : 'Sekretariat KOPY';

  container.innerHTML = `
    <div class="page-stack">
      <!-- Sapaan & Identitas -->
      <section class="welcome-banner" aria-label="Ringkasan Sapaan">
        <div>
          <h2 class="welcome-greeting">${sapaan}, ${namaSekretaris}</h2>
          <p class="welcome-meta">Ruang kerja administrasi internal Yayasan Kosambi Peduli Yatim.</p>
        </div>
        <div class="date-chip" aria-label="Tanggal hari ini">
          ${getIcon('agenda')}
          <span>${tanggalHariIni}</span>
        </div>
      </section>

      <!-- Ringkasan Jumlah Data -->
      <section aria-label="Ringkasan Administrasi">
        <div class="stats-grid">
          <article class="stat-card">
            <div class="stat-top">
              <span class="stat-label">Surat Keluar</span>
              <span class="stat-icon-box">${getIcon('send')}</span>
            </div>
            <div class="stat-value">${counts.suratKeluar}</div>
            <p class="stat-note">Belum ada data surat keluar</p>
          </article>

          <article class="stat-card">
            <div class="stat-top">
              <span class="stat-label">Surat Masuk</span>
              <span class="stat-icon-box">${getIcon('inbox')}</span>
            </div>
            <div class="stat-value">${counts.suratMasuk}</div>
            <p class="stat-note">Belum ada data surat masuk</p>
          </article>

          <article class="stat-card">
            <div class="stat-top">
              <span class="stat-label">Agenda</span>
              <span class="stat-icon-box">${getIcon('agenda')}</span>
            </div>
            <div class="stat-value">${counts.agenda}</div>
            <p class="stat-note">Belum ada data agenda</p>
          </article>

          <article class="stat-card">
            <div class="stat-top">
              <span class="stat-label">Dokumen Arsip</span>
              <span class="stat-icon-box">${getIcon('arsip')}</span>
            </div>
            <div class="stat-value">${counts.arsip}</div>
            <p class="stat-note">Belum ada data arsip</p>
          </article>
        </div>
      </section>

      <!-- Akses Cepat -->
      <section class="card" aria-label="Akses Cepat">
        <div class="card-header">
          <div>
            <h3 class="card-title">Akses Cepat Administrasi</h3>
            <p class="card-description">Buka langsung ruang kerja setiap modul administrasi sekretariat.</p>
          </div>
        </div>
        <div class="quick-actions-grid">
          <button type="button" class="quick-action-btn" data-quick-route="surat">
            ${getIcon('surat')}
            <span>Buat Surat</span>
          </button>
          <button type="button" class="quick-action-btn" data-quick-route="agenda">
            ${getIcon('agenda')}
            <span>Buat Agenda</span>
          </button>
          <button type="button" class="quick-action-btn" data-quick-route="notulen">
            ${getIcon('notulen')}
            <span>Buat Notulen</span>
          </button>
          <button type="button" class="quick-action-btn" data-quick-route="laporan">
            ${getIcon('laporan')}
            <span>Buat Laporan</span>
          </button>
        </div>
      </section>

      <!-- Aktivitas Terbaru & Agenda Mendatang -->
      <div class="two-col-grid">
        <section class="card" aria-label="Aktivitas Administrasi Terbaru">
          <div class="card-header">
            <div>
              <h3 class="card-title">Aktivitas Administrasi Terbaru</h3>
              <p class="card-description">Catatan pencatatan surat, notulen, dan dokumen.</p>
            </div>
          </div>
          <div class="empty-state">
            <div class="empty-state-icon">${getIcon('notulen')}</div>
            <p class="empty-state-title">Belum ada data aktivitas</p>
            <p class="empty-state-text">Riwayat administrasi akan tercatat otomatis setelah fitur pencatatan data diaktifkan pada tahap berikutnya.</p>
          </div>
        </section>

        <section class="card" aria-label="Agenda Mendatang">
          <div class="card-header">
            <div>
              <h3 class="card-title">Agenda Mendatang</h3>
              <p class="card-description">Jadwal kegiatan dan rapat yayasan terdekat.</p>
            </div>
          </div>
          <div class="empty-state">
            <div class="empty-state-icon">${getIcon('agenda')}</div>
            <p class="empty-state-title">Belum ada data agenda</p>
            <p class="empty-state-text">Belum ada jadwal kegiatan yang ditambahkan ke dalam sistem saat ini.</p>
          </div>
        </section>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-quick-route]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-quick-route');
      navigateTo(target);
    });
  });
}
