/**
 * KOPY Office — Data & Storage Abstraction Layer (Tahap 1)
 * Dirancang agar mudah dimigrasikan ke IndexedDB dan Backup/Restore JSON pada Tahap 2.
 */

const STORAGE_KEY = 'kopy_office_v1';

const DEFAULT_STATE = {
  schemaVersion: 1,
  settings: {
    namaYayasan: 'Yayasan Kosambi Peduli Yatim',
    logoDataUrl: '',
    alamatLengkap: '',
    nomorTelepon: '',
    email: '',
    namaKetua: '',
    namaSekretaris: '',
    jabatanPenandatangan: ''
  },
  // Koleksi data Tahap 2 (kosong pada Tahap 1, tanpa data contoh)
  collections: {
    suratMasuk: [],
    suratKeluar: [],
    agenda: [],
    notulen: [],
    laporan: [],
    arsip: []
  }
};

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

export const KopyStorage = {
  loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return cloneDefaultState();
      }
      const parsed = JSON.parse(raw);
      return {
        schemaVersion: 1,
        settings: {
          ...DEFAULT_STATE.settings,
          ...(parsed.settings || {})
        },
        collections: {
          ...DEFAULT_STATE.collections,
          ...(parsed.collections || {})
        }
      };
    } catch (error) {
      console.error('Gagal membaca penyimpanan lokal:', error);
      return cloneDefaultState();
    }
  },

  saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error('Gagal menyimpan ke penyimpanan lokal:', error);
      return false;
    }
  },

  getSettings() {
    return this.loadState().settings;
  },

  saveSettings(updatedSettings) {
    const state = this.loadState();
    state.settings = {
      ...state.settings,
      ...updatedSettings
    };
    return this.saveState(state);
  },

  resetSettings() {
    const state = this.loadState();
    state.settings = { ...DEFAULT_STATE.settings };
    return this.saveState(state);
  },

  getSummaryCounts() {
    const { collections } = this.loadState();
    return {
      suratKeluar: collections.suratKeluar.length,
      suratMasuk: collections.suratMasuk.length,
      agenda: collections.agenda.length,
      arsip: collections.arsip.length
    };
  }
};
