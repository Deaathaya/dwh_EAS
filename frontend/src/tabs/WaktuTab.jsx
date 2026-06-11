import { useState, useEffect } from 'react';

export default function WaktuTab() {
  const [waktu, setWaktu] = useState([]);
  const [form, setForm] = useState({ tanggal: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchWaktu();
  }, []);

  const fetchWaktu = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/waktu');
      const data = await res.json();
      setWaktu(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!form.tanggal) {
      setMessage({ type: 'error', text: 'Tanggal harus diisi!' });
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/waktu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tanggal: form.tanggal })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setMessage({ type: 'success', text: 'Tanggal ditambahkan!' });
      setForm({ tanggal: '' });
      fetchWaktu();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/waktu/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus');
      setMessage({ type: 'success', text: 'Tanggal dihapus!' });
      fetchWaktu();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const bulanNama = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return (
    <div>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="form-section">
        <h2>Tambah Tanggal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Tanggal Transaksi
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                required
              />
            </label>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>

      <div className="table-section">
        <h2>Daftar Tanggal</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Tahun</th>
                <th>Bulan</th>
                <th>Bulan Nama</th>
                <th>Kuartal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {waktu.map((w) => (
                <tr key={w.id_waktu}>
                  <td>{w.id_waktu}</td>
                  <td>{w.tanggal}</td>
                  <td>{w.tahun}</td>
                  <td>{w.bulan}</td>
                  <td>{w.bulan_nama}</td>
                  <td>Q{w.kuartal}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(w.id_waktu)}
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
