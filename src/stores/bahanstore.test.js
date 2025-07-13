import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBahanStore } from './bahanstores';
import axios from 'axios';

const API_URL = 'https://68733304c75558e273538faa.mockapi.io/bahan'; // Definisi API_URL di file test juga

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Bahan Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should initialize with empty bahan array and isLoading as false', () => {
    const store = useBahanStore();

    expect(store.bahan).toEqual([]);
    expect(store.isLoading).toBe(false);
  });

  it('should return the correct total number of bahan via getter', () => {
    const store = useBahanStore();
    store.bahan = [
      { id: 1, nama: 'Daging Sapi' },
      { id: 2, nama: 'Minyak Goreng' },
    ];

    expect(store.totalJenisBahan).toBe(2);
  });

  describe('actions', () => {

    it('fetchBahan: should fetch data and update state', async () => {
      const mockBahanData = [
        { id: 1, nama: 'Daging Sapi', stok: 10, satuan: 'kg' },
        { id: 2, nama: 'Minyak Goreng', stok: 20, satuan: 'liter' },
      ];

      axios.get.mockResolvedValueOnce({ data: mockBahanData });

      const store = useBahanStore();
      expect(store.isLoading).toBe(false);

      await store.fetchBahan();

      expect(axios.get).toHaveBeenCalledWith(API_URL);
      expect(store.bahan).toEqual(mockBahanData);
      expect(store.isLoading).toBe(false);
    });

    it('fetchBahan: should handle fetch error gracefully', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const store = useBahanStore();
      await store.fetchBahan();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(store.bahan).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Gagal mengambil data:', expect.any(Error));
      consoleErrorSpy.mockRestore();
    });

    it('tambahBahan: should add new data and update state', async () => {
      const newBahan = { nama: 'Bawang Putih', stok: 5, satuan: 'kg' };
      const returnedBahan = { id: 3, ...newBahan };

      axios.post.mockResolvedValueOnce({ data: returnedBahan });

      const store = useBahanStore();
      store.bahan = [];

      await store.tambahBahan(newBahan);

      expect(axios.post).toHaveBeenCalledWith(API_URL, newBahan);
      expect(store.bahan).toEqual([returnedBahan]);
    });

    it('updateBahan: should update existing data in state', async () => {
      const existingBahan = { id: 1, nama: 'Daging Sapi', stok: 10, satuan: 'kg' };
      const updatedBahanData = { id: 1, nama: 'Daging Sapi', stok: 15, satuan: 'kg' };

      axios.put.mockResolvedValueOnce({ data: updatedBahanData });

      const store = useBahanStore();
      store.bahan = [existingBahan];

      await store.updateBahan(updatedBahanData);

      expect(axios.put).toHaveBeenCalledWith(`${API_URL}/${updatedBahanData.id}`, updatedBahanData);
      expect(store.bahan).toEqual([updatedBahanData]);
    });

    it('hapusBahan: should remove data from state', async () => {
      const bahanToDeleteId = 1;
      const existingBahan = [
        { id: 1, nama: 'Daging Sapi' },
        { id: 2, nama: 'Minyak Goreng' },
      ];

      axios.delete.mockResolvedValueOnce({});

      const store = useBahanStore();
      store.bahan = existingBahan;

      await store.hapusBahan(bahanToDeleteId);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${bahanToDeleteId}`);
      expect(store.bahan).toEqual([{ id: 2, nama: 'Minyak Goreng' }]);
    });
  });
});