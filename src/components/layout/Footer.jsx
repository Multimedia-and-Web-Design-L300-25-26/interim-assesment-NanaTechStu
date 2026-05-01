// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

const footerLinks = {
  Company: ['About', 'Careers', 'Affiliates', 'Blog', 'Press'],
  Learn:   ['Browse crypto prices', 'Bitcoin price', 'Ethereum price', 'What is crypto?', 'What is Bitcoin?'],
  Support: ['Help center', 'Contact us', 'Create account', 'ID verification', 'Account information'],
  Legal:   ['Privacy policy', 'Terms of use', 'Cookie policy', 'Disclosures'],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cb-gray-2 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-cb-gray-3 mb-4">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-cb-dark hover:text-cb-blue transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cb-gray-2 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cb-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="text-sm font-semibold text-cb-dark">Coinbase</span>
          </div>
          <p className="text-xs text-cb-gray-3">
            © 2024 Coinbase. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'Instagram'].map((s) => (
              <a key={s} href="#" className="text-xs text-cb-gray-3 hover:text-cb-blue transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
