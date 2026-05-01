// src/pages/AssetDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useCrypto } from '../hooks/useCrypto';
import Button from '../components/common/Button';

function formatPrice(price) {
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1)    return `$${price.toFixed(4)}`;
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatLarge(value) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9)  return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6)  return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

export default function AssetDetail() {
  const { id } = useParams();
  const { getAssetById, loading } = useCrypto();
  const navigate = useNavigate();

  const asset = getAssetById(id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-cb-gray rounded w-48" />
          <div className="h-12 bg-cb-gray rounded w-32" />
          <div className="h-64 bg-cb-gray rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold mb-4">Asset not found</p>
        <Button onClick={() => navigate('/explore')}>Back to Explore</Button>
      </div>
    );
  }

  const isUp = asset.change24h >= 0;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-cb-gray-3 hover:text-cb-dark mb-6 transition-colors"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: asset.color }}
        >
          {asset.symbol.slice(0, 2)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-cb-dark">{asset.name}</h1>
          <span className="text-cb-gray-3 text-sm">{asset.symbol}</span>
        </div>
      </div>

      {/* Price + change */}
      <div className="mb-8">
        <p className="text-4xl font-bold text-cb-dark mb-2">{formatPrice(asset.price)}</p>
        <p className={`text-lg font-semibold ${isUp ? 'text-cb-green' : 'text-cb-red'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(asset.change24h).toFixed(2)}% (24h)
        </p>
      </div>

      {/* Placeholder chart area */}
      <div className="bg-cb-gray rounded-2xl h-48 flex items-center justify-center mb-8 border border-cb-gray-2">
        <p className="text-cb-gray-3 text-sm">
          📈 Price chart — connect to a real chart library (e.g. Recharts, Chart.js)
        </p>
      </div>

      {/* Buy / Sell */}
      <div className="flex gap-4 mb-10">
        <Button variant="primary" size="lg">Buy {asset.symbol}</Button>
        <Button variant="secondary" size="lg">Sell {asset.symbol}</Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Market cap',          value: formatLarge(asset.marketCap) },
          { label: '24h volume',          value: formatLarge(asset.volume24h) },
          { label: 'Circulating supply',  value: `${(asset.circulatingSupply / 1e6).toFixed(2)}M ${asset.symbol}` },
        ].map((stat) => (
          <div key={stat.label} className="bg-cb-gray rounded-xl p-4">
            <p className="text-xs text-cb-gray-3 mb-1">{stat.label}</p>
            <p className="text-sm font-semibold text-cb-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* About */}
      <div>
        <h2 className="text-lg font-bold text-cb-dark mb-2">About {asset.name}</h2>
        <p className="text-cb-gray-3 text-sm leading-relaxed">{asset.description}</p>
      </div>
    </main>
  );
}
