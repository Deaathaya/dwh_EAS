import { useState, useEffect } from 'react';

export default function DashboardTab() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [kategori, setKategori] = useState('');
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKategori();
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [kategori]);

  const fetchKategori = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/kategori');
      const data = await res.json();
      setKategoriList(data);
    } catch (err) {
      console.error('Error fetching kategori:', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = kategori ? `?kategori=${kategori}` : '';
      const [res1, res2, res3] = await Promise.all([
        fetch(`http://127.0.0.1:8000/api/query/penjualan-per-produk${params}`),
        fetch(`http://127.0.0.1:8000/api/query/tren-per-bulan${params}`),
        fetch(`http://127.0.0.1:8000/api/query/pelanggan-tertinggi${params}`)
      ]);

      setData1(await res1.json());
      setData2(await res2.json());
      setData3(await res3.json());
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };

  const getMaxValue = (data, key) => {
    return Math.max(...data.map(d => d[key] || 0), 1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="dashboard-container">
      <div className="filter-section">
        <label>
          Filter Kategori Produk:
          <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
            <option value="">Semua Kategori</option>
            {kategoriList.map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p>Memuat data...</p>}

      {!loading && (
        <div className="charts-grid">
          {/* Chart 1: Penjualan per Produk */}
          <div className="chart-card">
            <h3>Total Penjualan Per Produk</h3>
            {data1.length > 0 ? (
              <div className="bar-chart">
                {data1.map((item, idx) => {
                  const maxValue = getMaxValue(data1, 'total_pendapatan');
                  const width = (item.total_pendapatan / maxValue) * 100;
                  const isSmallBar = width < 15;
                  return (
                    <div key={idx} className="bar-row">
                      <div className="bar-label">{item.nama_produk}</div>
                      <div className="bar" style={{ width: `${width}%` }}>
                        {!isSmallBar && formatCurrency(item.total_pendapatan)}
                      </div>
                      {isSmallBar && <div className="bar-value">{formatCurrency(item.total_pendapatan)}</div>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>

          {/* Chart 2: Tren per Bulan */}
          <div className="chart-card">
            <h3>Tren Penjualan Per Bulan</h3>
            {data2.length > 0 ? (
              <div className="bar-chart">
                {data2.map((item, idx) => {
                  const maxValue = getMaxValue(data2, 'total_pendapatan');
                  const width = (item.total_pendapatan / maxValue) * 100;
                  const isSmallBar = width < 15;
                  return (
                    <div key={idx} className="bar-row">
                      <div className="bar-label">{item.bulan_nama}</div>
                      <div className="bar" style={{ width: `${width}%` }}>
                        {!isSmallBar && formatCurrency(item.total_pendapatan)}
                      </div>
                      {isSmallBar && <div className="bar-value">{formatCurrency(item.total_pendapatan)}</div>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>

          {/* Chart 3: Pelanggan Tertinggi */}
          <div className="chart-card">
            <h3>Pelanggan Dengan Belanja Tertinggi</h3>
            {data3.length > 0 ? (
              <div className="bar-chart">
                {data3.map((item, idx) => {
                  const maxValue = getMaxValue(data3, 'total_belanja');
                  const width = (item.total_belanja / maxValue) * 100;
                  const isSmallBar = width < 15;
                  return (
                    <div key={idx} className="bar-row">
                      <div className="bar-label">{item.nama_pelanggan}</div>
                      <div className="bar" style={{ width: `${width}%` }}>
                        {!isSmallBar && formatCurrency(item.total_belanja)}
                      </div>
                      {isSmallBar && <div className="bar-value">{formatCurrency(item.total_belanja)}</div>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>
        </div>
      )}

      {/* Detail Tables */}
      {!loading && (
        <>
          <div className="table-section-dashboard">
            <h3>Detail Penjualan Per Produk</h3>
            {data1.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Nama Produk</th>
                      <th>Total Terjual (Unit)</th>
                      <th>Total Pendapatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data1.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.nama_produk}</td>
                        <td>{item.total_terjual}</td>
                        <td>{formatCurrency(item.total_pendapatan)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>

          <div className="table-section-dashboard">
            <h3>Detail Tren Penjualan Per Bulan</h3>
            {data2.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Bulan</th>
                      <th>Total Pendapatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.bulan_nama}</td>
                        <td>{formatCurrency(item.total_pendapatan)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>

          <div className="table-section-dashboard">
            <h3>Detail Pelanggan Dengan Belanja Tertinggi</h3>
            {data3.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Nama Pelanggan</th>
                      <th>Total Belanja</th>
                      <th>Jumlah Transaksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data3.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.nama_pelanggan}</td>
                        <td>{formatCurrency(item.total_belanja)}</td>
                        <td>{item.jumlah_transaksi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
