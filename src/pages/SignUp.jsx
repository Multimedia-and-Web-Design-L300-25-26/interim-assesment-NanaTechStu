// src/pages/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name)    errs.name    = 'Name is required';
    if (!form.email)   errs.email   = 'Email is required';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // TODO: Replace with real API call:
      // const res = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message);
      // login(data.user, data.token);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
    error: errors[key],
  });

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-cb-gray">
      <div className="bg-white rounded-2xl border border-cb-gray-2 p-8 w-full max-w-md shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cb-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl text-cb-dark">Coinbase</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-cb-dark mb-1 text-center">Create your account</h1>
        <p className="text-sm text-cb-gray-3 mb-6 text-center">
          Join millions of people building their crypto portfolio.
        </p>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-cb-red text-sm rounded-xl px-4 py-3 mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="name"  label="Full name" placeholder="Jane Doe"        required {...field('name')} />
          <Input id="email" label="Email"     type="email" placeholder="you@example.com" required {...field('email')} />
          <Input id="pwd"   label="Password"  type="password" placeholder="Min. 8 characters" required {...field('password')} />
          <Input id="cpwd"  label="Confirm password" type="password" placeholder="Repeat password" required {...field('confirmPassword')} />

          <p className="text-xs text-cb-gray-3">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-cb-blue hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-cb-blue hover:underline">Privacy Policy</a>.
          </p>

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="text-sm text-center text-cb-gray-3 mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-cb-blue font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}