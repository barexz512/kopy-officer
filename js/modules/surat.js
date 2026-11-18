/**
 * KOPY Office — Modul Surat Menyurat (Fondasi Tahap 1)
 */

import { KopyStorage } from '../storage.js';
import { formatTanggalIndonesia, getBulanRomawi, escapeHTML, getIcon } from '../helpers.js';
import { navigateTo } from '../router.js';

export function renderSurat(container) {
  const settings = KopyStorage.getSettings();
  const now = new Date();
  const tanggalSurat = formatTanggalIndonesia(now, false);
  const bulanRomawi = getBulanRomawi(now);
  const tahun = now.getFullYear();

  const logoSrc = settings.logoDataUrl || './assets/logo.svg';
  const namaYayasan = escapeHTML(settings.namaYayasan || 'YAYASAN KOSAMBI PEDULI YATIM');
  const alamatText = settings.alamatLengkap
    ? escapeHTML(settings.alamatLengkap)
    : 'Alamat lengkap yayasan belum diisi (atur melalui menu Pengaturan)';

  const kontakParts = [];
  if (settings.nomorTelepon) kontakParts.push(`Telp: ${escapeHTML(settings.nomorTelepon)}`);
  if (settings.email) kontakParts.push(`Email: ${escapeHTML(settings.email)}`);
  const kontakText = kontakParts.length > 0
    ? kontakParts.join(' • ')
    : 'Nomor telepon dan email resmi belum diisi';

  container.innerHTML = `
    <div class="page-stack">
      <!-- Status Tahap 1 -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Fondasi Administrasi Surat Menyurat</h2>
            <p class="card-description">Struktur standar surat masuk, surat keluar, penomoran, dan kop surat Yayasan Kosambi Peduli Yatim.</p>
          </div>
          <span class="badge badge-amber">Tahap 1 • Struktur Siap</span>
        </div>

        <div class="notice-box">
          <strong>Status Pengembangan:</strong> Halaman ini menyiapkan standar tata naskah dan pratinjau kop surat resmi KOPY. Fitur pembuatan dokumen surat otomatis, penyimpanan arsip surat masuk/keluar, dan ekspor PDF disiapkan untuk pengembangan tahap berikutnya.
        </div>

        <div class="scope-list">
          <div class="scope-item">
            <span class="scope-bullet">1</span>
            <span><strong>Surat Masuk & Surat Keluar:</strong> Struktur pencatatan register surat keluar dan disposisi surat masuk siap dihubungkan ke penyimpanan lokal.</span>
          </div>
          <div class="scope-item">
            <span class="scope-bullet">2</span>
            <span><strong>Nomor Surat & Tanggal Otomatis:</strong> Menggunakan format baku instansi dengan bulan Romawi otomatis (contoh struktur: <code>001/SEK-KOPY/${bulanRomawi}/${tahun}</code>) dan tanggal surat otomatis.</span>
          </div>
          <div class="scope-item">
            <span class="scope-bullet">3</span>
            <span><strong>Template & Kop Surat Resmi:</strong> Terhubung langsung dengan identitas yayasan pada menu Pengaturan.</span>
          </div>
        </div>
      </section>

      <!-- Pratinjau Standar Kop Surat & Penandatangan -->
      <section class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Pratinjau Standar Kop Surat & Penandatangan</h3>
            <p class="card-description">Data kop surat dan nama penandatangan diambil dari menu Pengaturan.</p>
          </div>
          <button type="button" id="btn-go-pengaturan" class="btn btn-secondary">
            ${getIcon('pengaturan')}
            <span>Lengkapi Data Kop</span>
          </button>
        </div>

        <!-- Pilihan Simulasi Penandatangan -->
        <div class="form-grid" style="margin-bottom: 16px;">
          <div class="form-group">
            <label for="select-jenis-surat" class="form-label">Simulasi Jenis Surat</label>
            <select id="select-jenis-surat" class="form-control">
              <option value="SEK">Surat Administrasi / Undangan (SEK-KOPY)</option>
              <option value="KET">Surat Keputusan / Eksternal Utama (KOPY)</option>
              <option value="SKT">Surat Keterangan / Tugas (SKT-KOPY)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="select-penandatangan" class="form-label">Pilihan Penandatangan</label>
            <select id="select-penandatangan" class="form-control">
              <option value="sekretaris">Sekretaris Yayasan</option>
              <option value="ketua">Ketua Yayasan</option>
              <option value="keduanya">Ketua & Sekretaris (Mengetahui)</option>
              <option value="lainnya">Pengurus yang Diberi Kewenangan</option>
            </select>
          </div>
        </div>

        <!-- Lembar Pratinjau Kop Surat -->
        <div class="kop-preview-box">
          <div class="kop-header">
            <img src="${logoSrc}" alt="Logo Yayasan" class="kop-logo">
            <div class="kop-identity">
              <div class="kop-org-name">${namaYayasan}</div>
              <div class="kop-org-detail">${alamatText}</div>
              <div class="kop-org-detail">${kontakText}</div>
            </div>
          </div>

          <div class="kop-body-preview">
            <table class="letter-meta-table">
              <tr>
                <td style="width: 90px;">Nomor</td>
                <td style="width: 14px;">:</td>
                <td><strong id="preview-nomor-surat">.../SEK-KOPY/${bulanRomawi}/${tahun}</strong> <em>(Format Struktur)</em></td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td>Kabupaten Tangerang, ${tanggalSurat}</td>
              </tr>
              <tr>
                <td>Perihal</td>
                <td>:</td>
                <td><em>(Akan diisi saat modul editor surat aktif)</em></td>
              </tr>
            </table>

            <div id="preview-signatory-area" class="signatory-box"></div>
          </div>
        </div>
      </section>
    </div>
  `;

  const btnGoPengaturan = container.querySelector('#btn-go-pengaturan');
  if (btnGoPengaturan) {
    btnGoPengaturan.addEventListener('click', () => navigateTo('pengaturan'));
  }

  const selectJenis = container.querySelector('#select-jenis-surat');
  const selectPenandatangan = container.querySelector('#select-penandatangan');
  const nomorEl = container.querySelector('#preview-nomor-surat');
  const signatoryArea = container.querySelector('#preview-signatory-area');

  function updatePreview() {
    const kode = selectJenis.value;
    const role = selectPenandatangan.value;
    nomorEl.textContent = `.../${kode}-KOPY/${bulanRomawi}/${tahun}`;

    const namaKetua = escapeHTML(settings.namaKetua) || '(Nama Ketua belum diisi di Pengaturan)';
    const namaSekretaris = escapeHTML(settings.namaSekretaris) || '(Nama Sekretaris belum diisi di Pengaturan)';
    const jabatanLain = escapeHTML(settings.jabatanPenandatangan) || 'Pengurus yang Diberi Kewenangan';

    if (role === 'ketua') {
      signatoryArea.innerHTML = `
        <div>Ketua Yayasan,</div>
        <div class="signatory-space"></div>
        <div><strong>${namaKetua}</strong></div>
      `;
    } else if (role === 'sekretaris') {
      signatoryArea.innerHTML = `
        <div>Sekretaris Yayasan,</div>
        <div class="signatory-space"></div>
        <div><strong>${namaSekretaris}</strong></div>
      `;
    } else if (role === 'keduanya') {
      signatoryArea.innerHTML = `
        <div>Mengetahui, Ketua Yayasan</div>
        <div class="signatory-space"></div>
        <div><strong>${namaKetua}</strong></div>
        <div style="margin-top: 12px;">Sekretaris Yayasan,</div>
        <div class="signatory-space"></div>
        <div><strong>${namaSekretaris}</strong></div>
      `;
    } else {
      signatoryArea.innerHTML = `
        <div>${jabatanLain},</div>
        <div class="signatory-space"></div>
        <div><strong>(Nama Penandatangan)</strong></div>
      `;
    }
  }

  selectJenis.addEventListener('change', updatePreview);
  selectPenandatangan.addEventListener('change', updatePreview);
  updatePreview();
}
