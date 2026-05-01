// src/components/crypto/CryptoRow.jsx
// Single row for the crypto price table
import { useNavigate } from 'react-router-dom';

/**
 * Formats a large number to a readable string (e.g. $1.3T, $423B, $421M)
 */
function formatMarketCap(value) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9)  return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6)  return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

function formatPrice(price) {
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1)    return `$${price.toFixed(4)}`;
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CryptoRow({ asset, rank }) {
  const navigate = useNavigate();
  const isUp = asset.change24h >= 0;

  return (
    <tr
      onClick={() => navigate(`/asset/${asset.id}`)}
      className="border-b border-cb-gray-2 hover:bg-cb-gray cursor-pointer transition-colors"
    >
      {/* Rank */}
      <td className="py-4 px-4 text-sm text-cb-gray-3 w-10">{rank}</td>

      {/* Name */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {/* Color avatar (replace with real logo in production) */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: asset.color }}
          >
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-cb-dark">{asset.name}</p>
            <p className="text-xs text-cb-gray-3">{asset.symbol}</p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 px-4 text-sm font-medium text-cb-dark text-right">
        {formatPrice(asset.price)}
      </td>

      {/* 24h change */}
      <td className={`py-4 px-4 text-sm font-medium text-right ${isUp ? 'text-cb-green' : 'text-cb-red'}`}>
        {isUp ? '▲' : '▼'} {Math.abs(asset.change24h).toFixed(2)}%
      </td>

      {/* Market cap (hidden on mobile) */}
      <td className="py-4 px-4 text-sm text-cb-gray-3 text-right hidden md:table-cell">
        {formatMarketCap(asset.marketCap)}
      </td>

      {/* Buy button */}
      <td className="py-4 px-4 text-right">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/asset/${asset.id}`); }}
          className="text-xs font-semibold text-cb-blue hover:underline"
        >
          Buy
        </button>
      </td>
    </tr>
  );
}
