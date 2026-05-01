// src/pages/Learn.jsx
import { learnArticles } from '../data/learnData';
import Card from '../components/common/Card';

const categories = ['All', ...new Set(learnArticles.map((a) => a.category))];

import { useState } from 'react';

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? learnArticles
      : learnArticles.filter((a) => a.category === activeCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-cb-dark mb-2">Learn crypto</h1>
      <p className="text-cb-gray-3 mb-8">
        Build your crypto knowledge with beginner-friendly guides.
      </p>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-cb-blue text-white'
                : 'bg-cb-gray text-cb-dark hover:bg-cb-gray-2'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <Card key={article.id} className="flex flex-col gap-3 cursor-pointer">
            <div className="text-4xl">{article.image}</div>
            <span className="text-xs font-semibold text-cb-blue uppercase tracking-wide">
              {article.category}
            </span>
            <h3 className="text-base font-bold text-cb-dark">{article.title}</h3>
            <p className="text-sm text-cb-gray-3 flex-1">{article.summary}</p>
            <p className="text-xs text-cb-gray-3">{article.readTime}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
