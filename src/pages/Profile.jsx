// src/pages/Profile.jsx
// Protected page — only accessible when authenticated
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-cb-dark mb-8">Your profile</h1>

      {/* Profile card */}
      <div className="bg-white border border-cb-gray-2 rounded-2xl p-8 mb-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-cb-blue rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-cb-dark">{user?.name}</h2>
            <p className="text-sm text-cb-gray-3">{user?.email}</p>
          </div>
        </div>

        {/* Info rows */}
        <div className="divide-y divide-cb-gray-2">
          {[
            { label: 'Full name', value: user?.name },
            { label: 'Email',     value: user?.email },
            { label: 'Account status', value: '✅ Verified' },
            { label: 'Member since',   value: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-4">
              <span className="text-sm text-cb-gray-3">{row.label}</span>
              <span className="text-sm font-medium text-cb-dark">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio placeholder */}
      <div className="bg-cb-gray rounded-2xl p-6 mb-6">
        <h3 className="text-base font-bold text-cb-dark mb-2">Portfolio</h3>
        <p className="text-sm text-cb-gray-3">
          Connect your holdings to view your portfolio here. This section will display your crypto balances once integrated with the backend.
        </p>
      </div>

      <Button variant="ghost" onClick={handleLogout}>
        Sign out
      </Button>
    </main>
  );
}
