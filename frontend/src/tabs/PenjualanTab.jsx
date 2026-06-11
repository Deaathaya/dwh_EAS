import { useState, useEffect } from 'react';

export default function PenjualanTab() {
  const [penjualan, setPenjualan] = useState([]);
  const [produk, setProduk] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [waktu, setWaktu] = useState([]);
  const [form, setForm] = useState({
    id_produk: '',
    id_pelanggan: '',
    id_waktu: '',
    jumlah: '',
    harga_satuan: ''
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPenjualan();
    fetchDimensions();
  }, []);

  const fetchPenjualan = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/penjualan');
      const data = await res.json();
      setPenjualan(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const fetchDimensions = async () => {
    try {
      const [produkRes, pelangganRes, waktuRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/produk'),
        fetch('http://127.0.0.1:8000/api/pelanggan'),
        fetch('http://127.0.0.1:8000/api/waktu')
      ]);
      setProduk(await produkRes.json());
      setPelanggan(await pelangganRes.json());
      setWaktu(await waktuRes.json());
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!form.id_produk || !form.id_pelanggan || !form.id_waktu || !form.jumlah || !form.harga_satuan) {
      setMessage({ type: 'error', text: 'Semua field harus diisi!' });
      return;
    }

    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId
        ? `http://127.0.0.1:8000/api/penjualan/${editId}`
        : 'http://127.0.0.1:8000/api/penjualan';

      const payload = {
        id_produk: parseInt(form.id_produk),
        id_pelanggan: parseInt(form.id_pelanggan),
        id_waktu: parseInt(form.id_waktu),
        jumlah: parseInt(form.jumlah),
        harga_satuan: parseFloat(form.harga_satuan)
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setMessage({ type: 'success', text: editId ? 'Transaksi diperbarui!' : 'Transaksi ditambahkan!' });
      setForm({ id_produk: '', id_pelanggan: '', id_waktu: '', jumlah: '', harga_satuan: '' });
      setEditId(null);
      fetchPenjualan();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleEdit = (p) => {
    setForm({
      id_produk: p.id_produk,
      id_pelanggan: p.id_pelanggan,
      id_waktu: p.id_waktu,
      jumlah: p.jumlah,
      harga_satuan: p.harga_satuan
    });
    setEditId(p.id_penjualan);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/penjualan/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus');
      setMessage({ type: 'success', text: 'Transaksi dihapus!' });
      fetchPenjualan();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleProdukChange = (e) => {
    const prod = produk.find(p => p.id_produk === parseInt(e.target.value));
    setForm({ ...form, id_produk: e.target.value, harga_satuan: prod?.harga || '' });
  };

  return (
    <div>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="form-section">
        <h2>{editId ? 'Edit Transaksi Penjualan' : 'Tambah Transaksi Penjualan'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Pilih Produk
              <select
                value={form.id_produk}
                onChange={handleProdukChange}
                required
              >
                <option value="">-- Pilih Produk --</option>
                {produk.map(p => (
                  <option key={p.id_produk} value={p.id_produk}>
                    {p.nama_produk} (Rp {p.harga.toLocaleString('id-ID')})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Pilih Pelanggan
              <select
                value={form.id_pelanggan}
                onChange={(e) => setForm({ ...form, id_pelanggan: e.target.value })}
                required
              >
                <option value="">-- Pilih Pelanggan --</option>
                {pelanggan.map(p => (
                  <option key={p.id_pelanggan} value={p.id_pelanggan}>
                    {p.nama_pelanggan}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Pilih Tanggal
              <select
                value={form.id_waktu}
                onChange={(e) => setForm({ ...form, id_waktu: e.target.value })}
                required
              >
                <option value="">-- Pilih Tanggal --</option>
                {waktu.map(w => (
                  <option key={w.id_waktu} value={w.id_waktu}>
                    {w.tanggal} ({w.bulan_nama})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Jumlah
              <input
                type="number"
                value={form.jumlah}
                onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Harga Satuan (Rp)
              <input
                type="number"
                step="0.01"
                value={form.harga_satuan}
                onChange={(e) => setForm({ ...form, harga_satuan: e.target.value })}
                readOnly
              />
            </label>
          </div>
          {form.jumlah && form.harga_satuan && (
            <div className="form-group">
              <label>
                Total Harga (Rp)
                <input
                  type="text"
                  value={(form.jumlah * form.harga_satuan).toLocaleString('id-ID')}
                  readOnly
                />
              </label>
            </div>
          )}
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
                  setForm({ id_produk: '', id_pelanggan: '', id_waktu: '', jumlah: '', harga_satuan: '' });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-section">
        <h2>Daftar Transaksi Penjualan</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produk</th>
                <th>Pelanggan</th>
                <th>Tanggal</th>
                <th>Jumlah</th>
                <th>Harga Satuan</th>
                <th>Total</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {penjualan.map((p) => (
                <tr key={p.id_penjualan}>
                  <td>{p.id_penjualan}</td>
                  <td>{p.nama_produk}</td>
                  <td>{p.nama_pelanggan}</td>
                  <td>{p.tanggal}</td>
                  <td>{p.jumlah}</td>
                  <td>Rp {p.harga_satuan.toLocaleString('id-ID')}</td>
                  <td>Rp {p.total_harga.toLocaleString('id-ID')}</td>
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
                      onClick={() => handleDelete(p.id_penjualan)}
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
