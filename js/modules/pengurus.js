/**
 * KOPY Office — Modul Data Pengurus (Tahap 1)
 */

import { KopyStorage } from '../storage.js';
import { escapeHTML, getIcon } from '../helpers.js';
import { navigateTo } from '../router.js';

export function renderPengurus(container) {
  const settings = KopyStorage.getSettings();

  const namaKetua = settings.namaKetua
    ? escapeHTML(settings.namaKetua)
    : '<span style="color: var(--color-text-muted);">Belum diisi di Pengaturan</span>';

  const namaSekretaris = settings.namaSekretaris
    ? escapeHTML(settings.namaSekretaris)
    : '<span style="color: var(--color-text-muted);">Belum diisi di Pengaturan</span>';

  const jabatanTambahan = settings.jabatanPenandatangan
    ? escapeHTML(settings.jabatanPenandatangan)
    : '<span style="color: var(--color-text-muted);">Belum diisi di Pengaturan</span>';

  container.innerHTML = `
    <div class="page-stack">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Data Pengurus Yayasan</h2>
            <p class="card-description">Struktur kepengurusan dan pejabat penandatangan administrasi Yayasan Kosambi Peduli Yatim.</p>
          </div>
          <button type="button" id="btn-edit-pengurus" class="btn btn-secondary">
            ${getIcon('pengaturan')}
            <span>Atur Pejabat Utama</span>
          </button>
        </div>

        <div class="notice-box" style="margin-bottom: 16px;">
          <strong>Sinkronisasi Pengaturan:</strong> Data pejabat penandatangan utama di bawah ini terhubung dengan halaman <strong>Pengaturan</strong>. Pencatatan daftar lengkap seluruh anggota pengurus yayasan akan ditambahkan pada tahap berikutnya.
        </div>

        <table class="info-table">
          <tbody>
            <tr>
              <th>Nama Organisasi</th>
              <td>${escapeHTML(settings.namaYayasan || 'Yayasan Kosambi Peduli Yatim')}</td>
            </tr>
            <tr>
              <th>Ketua Yayasan</th>
              <td>${namaKetua}</td>
            </tr>
            <tr>
              <th>Sekretaris Yayasan</th>
              <td>${namaSekretaris}</td>
            </tr>
            <tr>
              <th>Jabatan Penandatangan Tambahan</th>
              <td>${jabatanTambahan}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Direktori Anggota Pengurus</h3>
            <p class="card-description">Daftar lengkap pembina, pengurus, dan pengawas yayasan.</p>
          </div>
        </div>

        <div class="empty-state">
          <div class="empty-state-icon">${getIcon('pengurus')}</div>
          <p class="empty-state-title">Belum ada data direktori pengurus</p>
          <p class="empty-state-text">Formulir penambahan data anggota pengurus lengkap akan tersedia pada tahap pengembangan selanjutnya.</p>
        </div>
      </section>
    </div>
  `;

  const btnEdit = container.querySelector('#btn-edit-pengurus');
  if (btnEdit) {
    btnEdit.addEventListener('click', () => navigateTo('pengaturan'));
  }
}
