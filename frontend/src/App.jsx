import { useState, useEffect } from 'react';
import './App.css';
import ProdukTab from './tabs/ProdukTab';
import PelangganTab from './tabs/PelangganTab';
import WaktuTab from './tabs/WaktuTab';
import PenjualanTab from './tabs/PenjualanTab';
import DashboardTab from './tabs/DashboardTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/health')
      .then(res => res.json())
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="app-container"><p>Memuat...</p></div>;
  if (error) return <div className="app-container"><p style={{ color: 'red' }}>Error: {error}</p></div>;

  return (
    <div className="app-container">
      <nav className="tab-nav">
        <button
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-button ${activeTab === 'produk' ? 'active' : ''}`}
          onClick={() => setActiveTab('produk')}
        >
          Produk
        </button>
        <button
          className={`tab-button ${activeTab === 'pelanggan' ? 'active' : ''}`}
          onClick={() => setActiveTab('pelanggan')}
        >
          Pelanggan
        </button>
        <button
          className={`tab-button ${activeTab === 'waktu' ? 'active' : ''}`}
          onClick={() => setActiveTab('waktu')}
        >
          Waktu
        </button>
        <button
          className={`tab-button ${activeTab === 'penjualan' ? 'active' : ''}`}
          onClick={() => setActiveTab('penjualan')}
        >
          Penjualan
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'produk' && <ProdukTab />}
        {activeTab === 'pelanggan' && <PelangganTab />}
        {activeTab === 'waktu' && <WaktuTab />}
        {activeTab === 'penjualan' && <PenjualanTab />}
      </div>
    </div>
  );
}
