import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SearchResult } from '../../types';
import { getMockWrestlers, mockCoaches, mockNews } from '../../data/mockData';

interface HeaderProps {
  onAdminClick: () => void;
}

export function Header({ onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const wrestlers = getMockWrestlers()
        .filter(w => w.full_name.includes(searchQuery) || w.membership_number.includes(searchQuery))
        .slice(0, 3)
        .map(w => ({
          type: 'wrestler' as const,
          id: w.id,
          title: w.full_name,
          subtitle: `${w.age_category} - ${w.weight_class}`,
          image_url: w.profile_image_url,
        }));

      const coachesResults = mockCoaches
        .filter(c => c.full_name.includes(searchQuery))
        .slice(0, 2)
        .map(c => ({
          type: 'coach' as const,
          id: c.id,
          title: c.full_name,
          subtitle: `${c.coaching_level} - ${c.specialty}`,
          image_url: c.profile_image_url,
        }));

      const newsResults = mockNews
        .filter(n => n.title.includes(searchQuery) || n.summary.includes(searchQuery))
        .slice(0, 2)
        .map(n => ({
          type: 'news' as const,
          id: n.id,
          title: n.title,
          subtitle: `${n.category} - ${n.published_date}`,
          image_url: n.image_url,
        }));

      setSearchResults([...wrestlers, ...coachesResults, ...newsResults]);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/wrestlers', label: 'کشتی‌گیران' },
    { href: '/coaches', label: 'مربیان' },
    { href: '/news', label: 'اخبار' },
    { href: '/competitions', label: 'مسابقات' },
    { href: '/gallery', label: 'گالری' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  return (
    <>
      <div className="bg-primary-950 text-white py-1.5 text-xs hidden sm:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+984412345678" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <span>۰۴۴-۱۲۳۴۵۶۷۸</span>
            </a>
            <a href="mailto:info@wrestling-az.ir" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <span>info@wrestling-az.ir</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>ارومیه، خیابان امام، ساختمان ورزشی</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-bl from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-glow-primary">
                <span className="text-white font-bold text-xl md:text-2xl">ک</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm md:text-lg font-bold text-primary-900">هیئت کشتی استان</h1>
                <p className="text-xs text-secondary-500">آذربایجان غربی</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                    location.pathname === link.href
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
                >
                  <Search size={20} className="md:w-[22px] md:h-[22px]" />
                </button>

                {isSearchOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 md:w-80 bg-white rounded-2xl shadow-soft-lg border border-secondary-100 overflow-hidden animate-slide-down z-50">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجو کشتی‌گیران، مربیان، اخبار..."
                      className="w-full px-4 py-3 border-b border-secondary-100 focus:outline-none text-sm md:text-base"
                      autoFocus
                    />
                    {searchResults.length > 0 && (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((result) => (
                          <Link
                            key={`${result.type}-${result.id}`}
                            to={`/${result.type === 'wrestler' ? 'wrestlers' : result.type === 'coach' ? 'coaches' : 'news'}/${result.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-secondary-50 transition-colors"
                          >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                              {result.image_url ? (
                                <img
                                  src={result.image_url}
                                  alt={result.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-secondary-400">
                                  <Search size={16} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-secondary-900 truncate text-sm md:text-base">{result.title}</p>
                              <p className="text-xs md:text-sm text-secondary-500 truncate">{result.subtitle}</p>
                            </div>
                            <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full hidden md:block">
                              {result.type === 'wrestler' ? 'کشتی‌گیر' : result.type === 'coach' ? 'مربی' : 'خبر'}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchQuery.length >= 2 && searchResults.length === 0 && (
                      <div className="p-4 text-center text-secondary-500 text-sm">
                        نتیجه‌ای یافت نشد
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={onAdminClick}
                className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
                title="پنل مدیریت"
              >
                <Settings size={20} className="md:w-[22px] md:h-[22px]" />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                    location.pathname === link.href
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
