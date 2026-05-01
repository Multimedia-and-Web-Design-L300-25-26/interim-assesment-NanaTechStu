// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import CryptoCard from '../components/crypto/CryptoCard';
import { useCrypto } from '../hooks/useCrypto';

export default function Home() {
  const { assets, loading } = useCrypto();
  const featured = assets.slice(0, 6);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-cb-dark leading-tight mb-6">
            The most trusted <br />
            <span className="text-cb-blue">cryptocurrency</span> platform
          </h1>
          <p className="text-lg text-cb-gray-3 mb-10 max-w-xl mx-auto">
            Join millions of people using Coinbase to buy, sell, and manage their crypto portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="primary" size="lg">Get started</Button>
            </Link>
            <Link to="/explore">
              <Button variant="secondary" size="lg">Explore assets</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Prices ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-cb-dark">Today's prices</h2>
          <Link to="/explore" className="text-sm font-semibold text-cb-blue hover:underline">
            See all assets →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-cb-gray-2 p-5 animate-pulse bg-cb-gray h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((asset) => (
              <CryptoCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </section>

      {/* ── Why Coinbase ─────────────────────────────────────────────── */}
      <section className="bg-cb-gray py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-cb-dark mb-10 text-center">
            Why millions choose Coinbase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: 'Secure storage', desc: 'Your crypto is protected with industry-leading security and stored offline.' },
              { icon: '📱', title: 'Easy to use', desc: 'Buy and sell crypto in minutes with our simple, intuitive platform.' },
              { icon: '🌍', title: 'Available worldwide', desc: 'Join over 100 million customers across 100+ countries.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-cb-dark mb-2">{item.title}</h3>
                <p className="text-sm text-cb-gray-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-cb-blue rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start your crypto journey today
          </h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Create your free account and start buying crypto in minutes.
          </p>
          <Link to="/signup">
            <button className="bg-white text-cb-blue font-semibold rounded-full px-8 py-4 hover:bg-blue-50 transition-colors">
              Create free account
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
