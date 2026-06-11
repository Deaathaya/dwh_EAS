import { useState, useEffect } from 'react';

export default function ProdukTab() {
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({ kode_produk: '', nama_produk: '', kategori: '', harga: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/produk');
      const data = await res.json();
      setProduk(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!form.kode_produk || !form.nama_produk || !form.kategori || !form.harga) {
      setMessage({ type: 'error', text: 'Semua field harus diisi!' });
      return;
    }

    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId
        ? `http://127.0.0.1:8000/api/produk/${editId}`
        : 'http://127.0.0.1:8000/api/produk';

      const payload = {
        kode_produk: form.kode_produk.trim(),
        nama_produk: form.nama_produk.trim(),
        kategori: form.kategori.trim(),
        harga: parseFloat(form.harga)
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setMessage({ type: 'success', text: editId ? 'Produk diperbarui!' : 'Produk ditambahkan!' });
      setForm({ kode_produk: '', nama_produk: '', kategori: '', harga: '' });
      setEditId(null);
      fetchProduk();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p.id_produk);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/produk/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus');
      setMessage({ type: 'success', text: 'Produk dihapus!' });
      fetchProduk();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
      
      <div className="form-section">
        <h2>{editId ? 'Edit Produk' : 'Tambah Produk'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Kode Produk
              <input
                type="text"
                value={form.kode_produk}
                onChange={(e) => setForm({ ...form, kode_produk: e.target.value })}
                required
              />
            </label>
            <label>
              Nama Produk
              <input
                type="text"
                value={form.nama_produk}
                onChange={(e) => setForm({ ...form, nama_produk: e.target.value })}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Kategori
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Pakaian">Pakaian</option>
                <option value="Makanan">Makanan</option>
                <option value="Aksesoris">Aksesoris</option>
              </select>
            </label>
            <label>
              Harga
              <input
                type="number"
                step="0.01"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: e.target.value })}
                required
              />
            </label>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Perbarui' : 'Simpan'}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ kode_produk: '', nama_produk: '', kategori: '', harga: '' });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-section">
        <h2>Daftar Produk</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Kode</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((p) => (
                <tr key={p.id_produk}>
                  <td>{p.id_produk}</td>
                  <td>{p.kode_produk}</td>
                  <td>{p.nama_produk}</td>
                  <td>{p.kategori}</td>
                  <td>Rp {p.harga.toLocaleString('id-ID')}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleEdit(p)}
                      style={{ padding: '6px 12px', fontSize: '12px', marginRight: '5px' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(p.id_produk)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
