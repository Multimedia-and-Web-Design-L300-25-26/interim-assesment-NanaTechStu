// src/components/crypto/CryptoCard.jsx
import { useNavigate } from 'react-router-dom';

function formatPrice(price) {
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1)    return `$${price.toFixed(4)}`;
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CryptoCard({ asset }) {
  const navigate = useNavigate();
  const isUp = asset.change24h >= 0;

  return (
    <div
      onClick={() => navigate(`/asset/${asset.id}`)}
      className="bg-white rounded-2xl border border-cb-gray-2 p-5 hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: asset.color }}
          >
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-cb-dark">{asset.name}</p>
            <p className="text-xs text-cb-gray-3">{asset.symbol}</p>
          </div>
        </div>
        {asset.isNew && (
          <span className="text-xs font-semibold text-cb-blue bg-cb-blue-light px-2 py-0.5 rounded-full">
            New
          </span>
        )}
      </div>

      {/* Price */}
      <p className="text-xl font-bold text-cb-dark mb-1">{formatPrice(asset.price)}</p>

      {/* Change */}
      <p className={`text-sm font-medium ${isUp ? 'text-cb-green' : 'text-cb-red'}`}>
        {isUp ? '▲' : '▼'} {Math.abs(asset.change24h).toFixed(2)}% today
      </p>
    </div>
  );
}
