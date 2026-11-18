/**
 * KOPY Office — Modul Agenda Kegiatan (Tahap 1)
 */

import { getIcon } from '../helpers.js';

export function renderAgenda(container) {
  container.innerHTML = `
    <div class="page-stack">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Agenda Kegiatan Yayasan</h2>
            <p class="card-description">Pengelolaan jadwal kegiatan sosial, penyaluran santunan, dan rapat internal pengurus KOPY.</p>
          </div>
          <span class="badge badge-navy">Tahap 1 • Struktur Modul</span>
        </div>

        <div class="notice-box">
          <strong>Fungsi Modul:</strong> Mencatat tanggal pelaksanaan, waktu, lokasi, penanggung jawab, serta status keterlaksanaan setiap kegiatan yayasan. Pada tahap pengembangan selanjutnya, modul ini akan terhubung dengan kalender kegiatan dan ringkasan Dashboard.
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Daftar Agenda</h3>
            <p class="card-description">Status data agenda saat ini.</p>
          </div>
        </div>

        <div class="empty-state">
          <div class="empty-state-icon">${getIcon('agenda')}</div>
          <p class="empty-state-title">Belum ada data agenda</p>
          <p class="empty-state-text">Formulir pencatatan agenda dan tampilan kalender kegiatan akan ditambahkan pada tahap pengembangan berikutnya.</p>
        </div>
      </section>
    </div>
  `;
}
