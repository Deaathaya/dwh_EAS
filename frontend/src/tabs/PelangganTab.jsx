import { useState, useEffect } from 'react';

export default function PelangganTab() {
  const [pelanggan, setPelanggan] = useState([]);
  const [form, setForm] = useState({ kode_pelanggan: '', nama_pelanggan: '', jenis_kelamin: '', kota: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPelanggan();
  }, []);

  const fetchPelanggan = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/pelanggan');
      const data = await res.json();
      setPelanggan(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!form.kode_pelanggan || !form.nama_pelanggan || !form.jenis_kelamin || !form.kota) {
      setMessage({ type: 'error', text: 'Semua field harus diisi!' });
      return;
    }

    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId
        ? `http://127.0.0.1:8000/api/pelanggan/${editId}`
        : 'http://127.0.0.1:8000/api/pelanggan';

      const payload = {
        kode_pelanggan: form.kode_pelanggan.trim(),
        nama_pelanggan: form.nama_pelanggan.trim(),
        jenis_kelamin: form.jenis_kelamin.trim(),
        kota: form.kota.trim()
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setMessage({ type: 'success', text: editId ? 'Pelanggan diperbarui!' : 'Pelanggan ditambahkan!' });
      setForm({ kode_pelanggan: '', nama_pelanggan: '', jenis_kelamin: '', kota: '' });
      setEditId(null);
      fetchPelanggan();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p.id_pelanggan);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/pelanggan/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus');
      setMessage({ type: 'success', text: 'Pelanggan dihapus!' });
      fetchPelanggan();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="form-section">
        <h2>{editId ? 'Edit Pelanggan' : 'Tambah Pelanggan'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Kode Pelanggan
              <input
                type="text"
                value={form.kode_pelanggan}
                onChange={(e) => setForm({ ...form, kode_pelanggan: e.target.value })}
                required
              />
            </label>
            <label>
              Nama Pelanggan
              <input
                type="text"
                value={form.nama_pelanggan}
                onChange={(e) => setForm({ ...form, nama_pelanggan: e.target.value })}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Jenis Kelamin
              <select
                value={form.jenis_kelamin}
                onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })}
                required
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </label>
            <label>
              Kota
              <input
                type="text"
                value={form.kota}
                onChange={(e) => setForm({ ...form, kota: e.target.value })}
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
                  setForm({ kode_pelanggan: '', nama_pelanggan: '', jenis_kelamin: '', kota: '' });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-section">
        <h2>Daftar Pelanggan</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Kode</th>
                <th>Nama Pelanggan</th>
                <th>Jenis Kelamin</th>
                <th>Kota</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pelanggan.map((p) => (
                <tr key={p.id_pelanggan}>
                  <td>{p.id_pelanggan}</td>
                  <td>{p.kode_pelanggan}</td>
                  <td>{p.nama_pelanggan}</td>
                  <td>{p.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                  <td>{p.kota}</td>
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
                      onClick={() => handleDelete(p.id_pelanggan)}
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
