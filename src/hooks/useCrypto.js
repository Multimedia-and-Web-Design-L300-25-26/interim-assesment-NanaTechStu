// src/hooks/useCrypto.js
// Custom hook to manage crypto data (simulates API fetch)
import { useState, useEffect } from 'react';
import { cryptoData } from '../data/cryptoData';

export function useCrypto() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an API fetch with a small delay
    const timer = setTimeout(() => {
      try {
        // TODO: Replace with real API call:
        // const res = await fetch('/api/crypto');
        // const data = await res.json();
        setAssets(cryptoData);
      } catch (err) {
        setError('Failed to load crypto data');
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const getAssetById = (id) => assets.find((a) => a.id === id) || null;

  const gainers = [...assets].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
  const newListings = assets.filter((a) => a.isNew);

  return { assets, loading, error, getAssetById, gainers, newListings };
}
