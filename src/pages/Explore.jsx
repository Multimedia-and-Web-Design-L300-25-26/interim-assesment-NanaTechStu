// src/pages/Explore.jsx
import { useState } from 'react';
import CryptoRow from '../components/crypto/CryptoRow';
import { useCrypto } from '../hooks/useCrypto';

const TABS = ['All assets', 'Top gainers', 'New listings'];

export default function Explore() {
  const { assets, gainers, newListings, loading } = useCrypto();
  const [activeTab, setActiveTab] = useState('All assets');
  const [search, setSearch] = useState('');

  const getDisplayData = () => {
    let data = activeTab === 'Top gainers'  ? gainers
             : activeTab === 'New listings' ? newListings
             : assets;

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.symbol.toLowerCase().includes(q)
      );
    }
    return data;
  };

  const displayData = getDisplayData();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-cb-dark mb-2">Crypto prices</h1>
      <p className="text-cb-gray-3 mb-8">
        Buy, sell, and trade hundreds of cryptocurrencies.
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search assets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field max-w-sm mb-6"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-cb-gray rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-cb-dark shadow-sm'
                : 'text-cb-gray-3 hover:text-cb-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-cb-gray animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-cb-gray-2 overflow-hidden">
          <table className="w-full">
            <thead className="bg-cb-gray">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-cb-gray-3 uppercase tracking-wide w-10">#</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-cb-gray-3 uppercase tracking-wide">Name</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-cb-gray-3 uppercase tracking-wide">Price</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-cb-gray-3 uppercase tracking-wide">24h</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-cb-gray-3 uppercase tracking-wide hidden md:table-cell">Market cap</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-cb-gray-3 uppercase tracking-wide"></th>
              </tr>
            </thead>
            <tbody>
              {displayData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-cb-gray-3">
                    No assets found.
                  </td>
                </tr>
              ) : (
                displayData.map((asset, i) => (
                  <CryptoRow key={asset.id} asset={asset} rank={i + 1} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
