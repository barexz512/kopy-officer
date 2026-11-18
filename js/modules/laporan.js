/**
 * KOPY Office — Modul Laporan Administrasi & Kegiatan (Tahap 1)
 */

import { getIcon } from '../helpers.js';

export function renderLaporan(container) {
  container.innerHTML = `
    <div class="page-stack">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Laporan Kegiatan & Rekap Administrasi</h2>
            <p class="card-description">Penyusunan laporan pertanggungjawaban kegiatan yayasan dan rekapitulasi berkala.</p>
          </div>
          <span class="badge badge-navy">Tahap 1 • Struktur Modul</span>
        </div>

        <div class="notice-box">
          <strong>Fungsi Modul:</strong> Menyiapkan kerangka laporan kegiatan sosial, rekapitulasi surat masuk/keluar, serta generator dokumen laporan format PDF pada tahap pengembangan berikutnya.
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Daftar Laporan</h3>
            <p class="card-description">Status data laporan saat ini.</p>
          </div>
        </div>

        <div class="empty-state">
          <div class="empty-state-icon">${getIcon('laporan')}</div>
          <p class="empty-state-title">Belum ada data laporan</p>
          <p class="empty-state-text">Belum ada laporan kegiatan atau rekap administrasi yang tersimpan pada Tahap 1.</p>
        </div>
      </section>
    </div>
  `;
}
