// src/App.jsx
// Main app with routing, layout, and AuthProvider
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Guard
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home        from './pages/Home';
import Explore     from './pages/Explore';
import AssetDetail from './pages/AssetDetail';
import Learn       from './pages/Learn';
import SignIn      from './pages/SignIn';
import SignUp      from './pages/SignUp';
import Profile     from './pages/Profile';

// Simple 404 page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold text-cb-dark">404</h1>
      <p className="text-cb-gray-3">Page not found.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <div className="flex-1">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/explore"     element={<Explore />} />
              <Route path="/asset/:id"   element={<AssetDetail />} />
              <Route path="/learn"       element={<Learn />} />
              <Route path="/signin"      element={<SignIn />} />
              <Route path="/signup"      element={<SignUp />} />

              {/* Protected route */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
