import { ReactNode, useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AdminDashboard } from '../admin/AdminDashboard';
import { AdminLogin } from '../admin/AdminLogin';
import { X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (showAdmin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAdmin]);

  const handleAdminClick = () => {
    setShowAdminPrompt(true);
  };

  const handleLoginSuccess = () => {
    setShowAdminPrompt(false);
    setShowAdmin(true);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAdminClick={handleAdminClick} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      {showAdminPrompt && (
        <AdminLogin
          onClose={() => setShowAdminPrompt(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {showAdmin && (
        <div className="fixed inset-0 z-[100] bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-fade-in">
          <div className="bg-white rounded-none md:rounded-3xl shadow-xl w-full h-full md:max-w-7xl md:h-[90vh] overflow-hidden animate-scale-in">
            <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-secondary-100">
              <h2 className="text-xl font-bold text-primary-900">پنل مدیریت</h2>
              <button
                onClick={handleCloseAdmin}
                className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="h-full md:h-[calc(90vh-65px)] overflow-hidden">
              <AdminDashboard onClose={handleCloseAdmin} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
