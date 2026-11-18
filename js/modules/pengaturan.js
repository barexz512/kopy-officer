/**
 * KOPY Office — Modul Pengaturan Aplikasi (Fungsional Tahap 1)
 */

import { KopyStorage } from '../storage.js';
import { escapeHTML, showToast } from '../helpers.js';

/**
 * Mengecilkan gambar logo yang diunggah agar ringan di penyimpanan lokal Android.
 */
function resizeImageToDataUrl(file, maxDimension = 240) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('File gambar tidak valid.'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}

export function renderPengaturan(container) {
  const settings = KopyStorage.getSettings();
  let currentLogoDataUrl = settings.logoDataUrl || '';

  container.innerHTML = `
    <div class="page-stack">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Pengaturan Identitas & Kop Yayasan</h2>
            <p class="card-description">Lengkapi data resmi Yayasan Kosambi Peduli Yatim. Data disimpan secara lokal di perangkat ini.</p>
          </div>
          <span class="badge badge-green">Aktif • Penyimpanan Lokal</span>
        </div>

        <form id="form-pengaturan" novalidate>
          <div class="form-grid">
            <div class="form-group full-width">
              <label for="input-nama-yayasan" class="form-label">Nama Yayasan</label>
              <input
                type="text"
                id="input-nama-yayasan"
                class="form-control"
                value="${escapeHTML(settings.namaYayasan)}"
                placeholder="Masukkan nama resmi yayasan"
              >
            </div>

            <div class="form-group full-width">
              <label for="input-logo-yayasan" class="form-label">Logo Yayasan</label>
              <div class="logo-upload-row">
                <img
                  id="preview-settings-logo"
                  src="${currentLogoDataUrl || './assets/logo.svg'}"
                  alt="Pratinjau Logo Yayasan"
                  class="settings-logo-preview"
                >
                <div style="flex: 1; min-width: 200px;">
                  <input
                    type="file"
                    id="input-logo-yayasan"
                    class="form-control"
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  >
                  <p class="form-hint" style="margin-top: 4px;">Format PNG, JPG, SVG, atau WebP. Otomatis dioptimalkan untuk perangkat mobile.</p>
                </div>
                <button type="button" id="btn-hapus-logo" class="btn btn-secondary">Gunakan Logo Bawaan</button>
              </div>
            </div>

            <div class="form-group full-width">
              <label for="input-alamat-lengkap" class="form-label">Alamat Lengkap Yayasan</label>
              <textarea
                id="input-alamat-lengkap"
                class="form-control"
                placeholder="Belum diisi — masukkan alamat resmi sekretariat yayasan"
              >${escapeHTML(settings.alamatLengkap)}</textarea>
            </div>

            <div class="form-group">
              <label for="input-nomor-telepon" class="form-label">Nomor Telepon</label>
              <input
                type="tel"
                id="input-nomor-telepon"
                class="form-control"
                value="${escapeHTML(settings.nomorTelepon)}"
                placeholder="Belum diisi"
              >
            </div>

            <div class="form-group">
              <label for="input-email" class="form-label">Email Resmi</label>
              <input
                type="email"
                id="input-email"
                class="form-control"
                value="${escapeHTML(settings.email)}"
                placeholder="Belum diisi"
              >
            </div>

            <div class="form-group">
              <label for="input-nama-ketua" class="form-label">Nama Ketua</label>
              <input
                type="text"
                id="input-nama-ketua"
                class="form-control"
                value="${escapeHTML(settings.namaKetua)}"
                placeholder="Belum diisi"
              >
            </div>

            <div class="form-group">
              <label for="input-nama-sekretaris" class="form-label">Nama Sekretaris</label>
              <input
                type="text"
                id="input-nama-sekretaris"
                class="form-control"
                value="${escapeHTML(settings.namaSekretaris)}"
                placeholder="Belum diisi"
              >
            </div>

            <div class="form-group full-width">
              <label for="input-jabatan-penandatangan" class="form-label">Jabatan Penandatangan Tambahan</label>
              <input
                type="text"
                id="input-jabatan-penandatangan"
                class="form-control"
                value="${escapeHTML(settings.jabatanPenandatangan)}"
                placeholder="Contoh: Bendahara / Koordinator Bidang (opsional)"
              >
            </div>
          </div>

          <div class="btn-row">
            <button type="submit" class="btn btn-primary">Simpan Pengaturan</button>
            <button type="button" id="btn-reset-pengaturan" class="btn btn-secondary">Kosongkan Isian</button>
          </div>
        </form>
      </section>
    </div>
  `;

  const form = container.querySelector('#form-pengaturan');
  const logoInput = container.querySelector('#input-logo-yayasan');
  const logoPreview = container.querySelector('#preview-settings-logo');
  const btnHapusLogo = container.querySelector('#btn-hapus-logo');
  const btnReset = container.querySelector('#btn-reset-pengaturan');

  logoInput.addEventListener('change', async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    try {
      const dataUrl = await resizeImageToDataUrl(file, 240);
      currentLogoDataUrl = dataUrl;
      logoPreview.src = dataUrl;
      showToast('Logo siap disimpan. Klik "Simpan Pengaturan" untuk menerapkan.');
    } catch (error) {
      showToast('Gagal memproses gambar logo.');
    }
  });

  btnHapusLogo.addEventListener('click', () => {
    currentLogoDataUrl = '';
    logoInput.value = '';
    logoPreview.src = './assets/logo.svg';
    showToast('Logo dikembalikan ke bawaan. Klik "Simpan Pengaturan".');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const payload = {
      namaYayasan: container.querySelector('#input-nama-yayasan').value.trim() || 'Yayasan Kosambi Peduli Yatim',
      logoDataUrl: currentLogoDataUrl,
      alamatLengkap: container.querySelector('#input-alamat-lengkap').value.trim(),
      nomorTelepon: container.querySelector('#input-nomor-telepon').value.trim(),
      email: container.querySelector('#input-email').value.trim(),
      namaKetua: container.querySelector('#input-nama-ketua').value.trim(),
      namaSekretaris: container.querySelector('#input-nama-sekretaris').value.trim(),
      jabatanPenandatangan: container.querySelector('#input-jabatan-penandatangan').value.trim()
    };

    const saved = KopyStorage.saveSettings(payload);
    if (saved) {
      const sidebarLogo = document.getElementById('sidebar-logo');
      if (sidebarLogo) {
        sidebarLogo.src = payload.logoDataUrl || './assets/logo.svg';
      }
      showToast('Pengaturan berhasil disimpan ke perangkat.');
    } else {
      showToast('Gagal menyimpan pengaturan.');
    }
  });

  btnReset.addEventListener('click', () => {
    KopyStorage.resetSettings();
    const sidebarLogo = document.getElementById('sidebar-logo');
    if (sidebarLogo) {
      sidebarLogo.src = './assets/logo.svg';
    }
    renderPengaturan(container);
    showToast('Isian pengaturan telah dikosongkan.');
  });
}
