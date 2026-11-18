/**
 * KOPY Office — Modul Arsip Dokumen Yayasan (Tahap 1)
 */

import { getIcon } from '../helpers.js';

export function renderArsip(container) {
  container.innerHTML = `
    <div class="page-stack">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Arsip Dokumen Yayasan</h2>
            <p class="card-description">Katalog penyimpanan dokumen kelembagaan, legalitas, dan berkas administrasi KOPY.</p>
          </div>
          <span class="badge badge-navy">Tahap 1 • Struktur Modul</span>
        </div>

        <div class="notice-box">
          <strong>Fungsi Modul:</strong> Mengelompokkan dokumen penting yayasan berdasarkan kategori (Legalitas, Surat Keputusan, Laporan, dan Dokumentasi) yang akan didukung penyimpanan lokal IndexedDB serta fitur Backup/Restore JSON pada tahap selanjutnya.
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Daftar Dokumen Arsip</h3>
            <p class="card-description">Status dokumen arsip saat ini.</p>
          </div>
        </div>

        <div class="empty-state">
          <div class="empty-state-icon">${getIcon('arsip')}</div>
          <p class="empty-state-title">Belum ada data arsip</p>
          <p class="empty-state-text">Belum ada berkas atau metadata arsip dokumen yang disimpan ke dalam sistem.</p>
        </div>
      </section>
    </div>
  `;
}
