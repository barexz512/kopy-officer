/**
 * KOPY Office — Modul Notulen Rapat (Tahap 1)
 */

import { getIcon } from '../helpers.js';

export function renderNotulen(container) {
  container.innerHTML = `
    <div class="page-stack">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Notulen Rapat Sekretariat</h2>
            <p class="card-description">Dokumentasi resmi pembahasan rapat pengurus, daftar hadir, dan poin keputusan rapat.</p>
          </div>
          <span class="badge badge-navy">Tahap 1 • Struktur Modul</span>
        </div>

        <div class="notice-box">
          <strong>Fungsi Modul:</strong> Menyimpan risalah rapat yayasan secara terstruktur meliputi hari/tanggal rapat, pimpinan rapat, peserta hadir, pokok bahasan, dan tindak lanjut keputusan.
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Daftar Notulen Rapat</h3>
            <p class="card-description">Status data notulen saat ini.</p>
          </div>
        </div>

        <div class="empty-state">
          <div class="empty-state-icon">${getIcon('notulen')}</div>
          <p class="empty-state-title">Belum ada data notulen</p>
          <p class="empty-state-text">Fitur penyusunan notulen rapat dan arsip risalah akan diaktifkan pada tahap pengembangan berikutnya.</p>
        </div>
      </section>
    </div>
  `;
}
