import { useState } from 'react';
import { X, Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLogin({ onClose, onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        onSuccess();
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
      }
    } catch {
      setError('خطا در connexion. دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-primary-950/95 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-l from-primary-700 to-primary-900 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-xl font-bold">ورود به پنل مدیریت</h1>
          <p className="text-white/80 text-sm mt-2">هیئت کشتی استان آذربایجان غربی</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-error-50 border border-error-200 rounded-lg text-error-700 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              نام کاربری
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input pr-10"
                placeholder="نام کاربری را وارد کنید"
                required
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              رمز عبور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pr-10"
                placeholder="رمز عبور را وارد کنید"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>در حال ورود...</span>
              </span>
            ) : (
              <>
                <LogIn size={18} />
                <span>ورود به پنل</span>
              </>
            )}
          </button>

          <p className="text-xs text-secondary-500 text-center">
            این بخش فقط برای مدیران سیستم قابل دسترسی است.
          </p>
        </form>
      </div>
    </div>
  );
}
