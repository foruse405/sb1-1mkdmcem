import { useState, useEffect } from 'react';
import {
  Users,
  Award,
  FileText,
  Image,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Save,
  Menu,
  LogOut,
  ChevronLeft,
  Home,
} from 'lucide-react';
import { Wrestler, Coach, News, GalleryPhoto, Certificate } from '../../types';
import { getMockWrestlers, mockCoaches, mockNews, mockGalleryPhotos, mockCertificates } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabType = 'dashboard' | 'wrestlers' | 'coaches' | 'news' | 'gallery' | 'settings';

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [wrestlers, setWrestlers] = useState<Wrestler[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<{ type: string; data: Wrestler | Coach | News | null }>({ type: '', data: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setWrestlers(getMockWrestlers());
    setCoaches(mockCoaches);
    setNews(mockNews);
    setGallery(mockGalleryPhotos);
  }, []);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const stats = {
    wrestlers: wrestlers.filter(w => w.is_active).length,
    coaches: coaches.filter(c => c.is_active).length,
    certificates: mockCertificates.length,
    news: news.length,
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm('آیا از حذف این آیتم اطمینان دارید؟')) return;

    switch (type) {
      case 'wrestler':
        setWrestlers(wrestlers.filter(w => w.id !== id));
        break;
      case 'coach':
        setCoaches(coaches.filter(c => c.id !== id));
        break;
      case 'news':
        setNews(news.filter(n => n.id !== id));
        break;
    }
  };

  const handleEdit = (type: string, item: Wrestler | Coach | News) => {
    setEditingItem({ type, data: item });
    setShowAddModal(true);
  };

  const handleAdd = () => {
    setEditingItem({ type: '', data: null });
    setShowAddModal(true);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const filteredWrestlers = wrestlers.filter(w =>
    w.full_name.includes(searchQuery) || w.membership_number.includes(searchQuery)
  );

  const tabs = [
    { key: 'dashboard', label: 'داشبورد', icon: Settings },
    { key: 'wrestlers', label: 'کشتی‌گیران', icon: Users },
    { key: 'coaches', label: 'مربیان', icon: Award },
    { key: 'news', label: 'اخبار', icon: FileText },
    { key: 'gallery', label: 'گالری', icon: Image },
  ];

  return (
    <div className="flex h-full relative">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-secondary-900/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 right-0 z-40 w-64 bg-primary-950 text-white flex-shrink-0 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold">پنل مدیریت</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 p-3 md:p-4 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key as TabType)}
                className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl mb-2 transition-all text-right ${
                  activeTab === tab.key
                    ? 'bg-accent-500 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <tab.icon size={18} className="flex-shrink-0" />
                <span className="text-sm md:text-base">{tab.label}</span>
                <ChevronLeft size={16} className="mr-auto hidden md:block" />
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
            >
              <Home size={18} />
              <span>بازگشت به سایت</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-error-500/20 text-error-300 hover:bg-error-500/30 transition-colors text-sm"
            >
              <LogOut size={18} />
              <span>خروج از حساب</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-secondary-100 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <Menu size={24} className="text-secondary-700" />
          </button>
          <h2 className="font-bold text-secondary-900">
            {tabs.find(t => t.key === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-error-100 text-error-600 transition-colors"
              title="خروج"
            >
              <LogOut size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <X size={24} className="text-secondary-700" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 bg-secondary-50 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-secondary-900 mb-4 md:mb-6">داشبورد</h1>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="card p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="text-primary-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm text-secondary-500 truncate">کشتی‌گیران فعال</p>
                      <p className="text-2xl md:text-3xl font-bold text-secondary-900">{stats.wrestlers}</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="text-accent-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm text-secondary-500 truncate">مربیان فعال</p>
                      <p className="text-2xl md:text-3xl font-bold text-secondary-900">{stats.coaches}</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="text-success-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm text-secondary-500 truncate">مدرک‌ها</p>
                      <p className="text-2xl md:text-3xl font-bold text-secondary-900">{stats.certificates}</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-warning-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="text-warning-600" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm text-secondary-500 truncate">اخبار</p>
                      <p className="text-2xl md:text-3xl font-bold text-secondary-900">{stats.news}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-secondary-900 mb-4">آخرین فعالیت‌ها</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 md:p-3 bg-secondary-50 rounded-lg">
                    <div className="w-2 h-2 bg-success-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-secondary-600 truncate">کشتی‌گیر جدید اضافه شد</span>
                    <span className="text-xs text-secondary-400 mr-auto hidden md:block">۵ دقیقه پیش</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 md:p-3 bg-secondary-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-secondary-600 truncate">خبر جدید منتشر شد</span>
                    <span className="text-xs text-secondary-400 mr-auto hidden md:block">۱ ساعت پیش</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 md:p-3 bg-secondary-50 rounded-lg">
                    <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-secondary-600 truncate">پروفایل مربی بروزرسانی شد</span>
                    <span className="text-xs text-secondary-400 mr-auto hidden md:block">۲ ساعت پیش</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wrestlers' && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-secondary-900">مدیریت کشتی‌گیران</h1>
                <button onClick={handleAdd} className="btn-primary w-full sm:w-auto text-sm md:text-base">
                  <Plus size={18} />
                  <span>افزودن کشتی‌گیر</span>
                </button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400" size={20} />
                  <input
                    type="text"
                    placeholder="جستجو با نام یا شماره عضویت..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pr-10"
                  />
                </div>
              </div>

              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="text-right px-4 py-3 text-sm font-medium text-secondary-700">نام</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-secondary-700">شماره عضویت</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-secondary-700">دسته سنی</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-secondary-700">دسته وزنی</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-secondary-700">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {filteredWrestlers.slice(0, 10).map((wrestler) => (
                        <tr key={wrestler.id} className="hover:bg-secondary-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary-100 rounded-full overflow-hidden flex-shrink-0">
                                {wrestler.profile_image_url ? (
                                  <img src={wrestler.profile_image_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Users size={14} className="text-primary-400" />
                                  </div>
                                )}
                              </div>
                              <span className="font-medium truncate">{wrestler.full_name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-secondary-600 whitespace-nowrap">{wrestler.membership_number}</td>
                          <td className="px-4 py-3">
                            <span className={`badge text-xs ${
                              wrestler.age_category === 'بزرگسالان' ? 'badge-accent' : 'badge-primary'
                            }`}>
                              {wrestler.age_category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-secondary-600 whitespace-nowrap">{wrestler.weight_class}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit('wrestler', wrestler)}
                                className="p-2 rounded-lg hover:bg-primary-100 text-primary-600 transition-colors"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete('wrestler', wrestler.id)}
                                className="p-2 rounded-lg hover:bg-error-100 text-error-600 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coaches' && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-secondary-900">مدیریت مربیان</h1>
                <button onClick={handleAdd} className="btn-primary w-full sm:w-auto text-sm md:text-base">
                  <Plus size={18} />
                  <span>افزودن مربی</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {coaches.map((coach) => (
                  <div key={coach.id} className="card p-3 md:p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-100 rounded-xl overflow-hidden flex-shrink-0">
                        {coach.profile_image_url ? (
                          <img src={coach.profile_image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Award size={20} className="text-accent-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-secondary-900 truncate">{coach.full_name}</h3>
                        <p className="text-xs md:text-sm text-secondary-500 truncate">{coach.coaching_level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleEdit('coach', coach)}
                        className="btn-secondary text-xs md:text-sm py-2 flex-1"
                      >
                        <Edit2 size={14} />
                        <span>ویرایش</span>
                      </button>
                      <button
                        onClick={() => handleDelete('coach', coach.id)}
                        className="p-2 rounded-lg hover:bg-error-100 text-error-600 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-secondary-900">مدیریت اخبار</h1>
                <button onClick={handleAdd} className="btn-primary w-full sm:w-auto text-sm md:text-base">
                  <Plus size={18} />
                  <span>افزودن خبر</span>
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="card p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                    <div className="w-full sm:w-20 h-20 md:h-14 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image_url && (
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-secondary-900 truncate">{item.title}</h3>
                      <p className="text-xs md:text-sm text-secondary-500">{item.category} - {item.published_date}</p>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleEdit('news', item)}
                        className="p-2 rounded-lg hover:bg-primary-100 text-primary-600 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete('news', item.id)}
                        className="p-2 rounded-lg hover:bg-error-100 text-error-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-secondary-900">مدیریت گالری</h1>
                <button className="btn-primary w-full sm:w-auto text-sm md:text-base">
                  <Plus size={18} />
                  <span>افزودن تصویر</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {gallery.map((photo) => (
                  <div key={photo.id} className="card group relative overflow-hidden">
                    <div className="aspect-square">
                      <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-primary-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-white/20 rounded-lg hover:bg-error-500 text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="p-2 md:p-3">
                      <p className="font-medium text-secondary-900 text-xs md:text-sm truncate">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-secondary-900 mb-4 md:mb-6">تنظیمات سایت</h1>

              <div className="card p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">عنوان سایت</label>
                  <input type="text" className="input text-sm md:text-base" defaultValue="هیئت کشتی استان آذربایجان غربی" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">توضیحات متا</label>
                  <textarea className="input resize-none text-sm md:text-base" rows={3} defaultValue="پورتال رسمی هیئت کشتی استان آذربایجان غربی" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">شماره تماس</label>
                    <input type="text" className="input text-sm md:text-base" defaultValue="۰۴۴-۱۲۳۴۵۶۷۸" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">ایمیل</label>
                    <input type="email" className="input text-sm md:text-base" defaultValue="info@wrestling-az.ir" />
                  </div>
                </div>
                <button className="btn-primary w-full md:w-auto text-sm md:text-base">
                  <Save size={18} />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[70] bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-secondary-100">
              <h2 className="text-lg md:text-xl font-bold text-primary-900">
                {editingItem.type ? 'ویرایش' : 'افزودن'} {activeTab === 'wrestlers' ? 'کشتی‌گیر' : activeTab === 'coaches' ? 'مربی' : 'خبر'}
              </h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-secondary-100 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              {activeTab === 'wrestlers' && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">نام کامل</label>
                      <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Wrestler)?.full_name || ''} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">شماره عضویت</label>
                      <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Wrestler)?.membership_number || `AZG-${String(wrestlers.length + 1).padStart(4, '0')}`} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">دسته سنی</label>
                      <select className="input text-sm md:text-base" defaultValue={(editingItem.data as Wrestler)?.age_category || 'بزرگسالان'}>
                        <option value="بزرگسالان">بزرگسالان</option>
                        <option value="جوانان">جوانان</option>
                        <option value="نوجوانان">نوجوانان</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">دسته وزنی</label>
                      <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Wrestler)?.weight_class || ''} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">تیم/باشگاه</label>
                    <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Wrestler)?.team_club || ''} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">بیوگرافی</label>
                    <textarea className="input resize-none text-sm md:text-base" rows={3} defaultValue={(editingItem.data as Wrestler)?.biography || ''} />
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary w-full sm:w-auto text-sm md:text-base">انصراف</button>
                    <button type="submit" className="btn-primary w-full sm:w-auto text-sm md:text-base">
                      <Save size={18} />
                      <span>ذخیره</span>
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'coaches' && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">نام کامل</label>
                    <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Coach)?.full_name || ''} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">مدرک مربیگری</label>
                      <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Coach)?.coaching_level || ''} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">تخصص</label>
                      <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as Coach)?.specialty || ''} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">بیوگرافی</label>
                    <textarea className="input resize-none text-sm md:text-base" rows={3} defaultValue={(editingItem.data as Coach)?.biography || ''} />
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary w-full sm:w-auto text-sm md:text-base">انصراف</button>
                    <button type="submit" className="btn-primary w-full sm:w-auto text-sm md:text-base">
                      <Save size={18} />
                      <span>ذخیره</span>
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'news' && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">عنوان</label>
                    <input type="text" className="input text-sm md:text-base" defaultValue={(editingItem.data as News)?.title || ''} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">دسته‌بندی</label>
                    <select className="input text-sm md:text-base" defaultValue={(editingItem.data as News)?.category || 'اخبار'}>
                      <option value="اخبار">اخبار</option>
                      <option value="رویدادها">رویدادها</option>
                      <option value="مسابقات">مسابقات</option>
                      <option value="مقالات">مقالات</option>
                      <option value="اعلامیه‌ها">اعلامیه‌ها</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">خلاصه</label>
                    <textarea className="input resize-none text-sm md:text-base" rows={2} defaultValue={(editingItem.data as News)?.summary || ''} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">محتوا</label>
                    <textarea className="input resize-none text-sm md:text-base" rows={5} defaultValue={(editingItem.data as News)?.content || ''} required />
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary w-full sm:w-auto text-sm md:text-base">انصراف</button>
                    <button type="submit" className="btn-primary w-full sm:w-auto text-sm md:text-base">
                      <Save size={18} />
                      <span>انتشار</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
