import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HeroSection } from './components/home/HeroSection';
import { AnnouncementBanner } from './components/home/AnnouncementBanner';
import { NewsSection } from './components/home/NewsSection';
import { CompetitionsSection } from './components/home/CompetitionsSection';
import { CoachesSection } from './components/home/CoachesSection';
import { WrestlersSection } from './components/home/WrestlersSection';
import { GallerySection } from './components/home/GallerySection';
import { ContactSection } from './components/home/ContactSection';
import { WrestlerModal } from './components/wrestlers/WrestlerModal';
import { CoachModal } from './components/coaches/CoachModal';
import { NewsModal } from './components/news/NewsModal';
import { Wrestler } from './types';
import { Coach } from './types';
import { News } from './types';
import { getMockWrestlers, mockCoaches, mockNews, mockCompetitions, mockGalleryPhotos } from './data/mockData';
import { Search, Award, Calendar, Image, MapPin, Phone, Mail, Clock } from 'lucide-react';

function HomePage() {
  const [selectedWrestler, setSelectedWrestler] = useState<Wrestler | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  return (
    <>
      <AnnouncementBanner />
      <HeroSection />
      <NewsSection onNewsClick={setSelectedNews} />
      <CompetitionsSection />
      <CoachesSection onCoachClick={setSelectedCoach} />
      <WrestlersSection onWrestlerClick={setSelectedWrestler} />
      <GallerySection />
      <ContactSection />

      {selectedWrestler && (
        <WrestlerModal
          wrestler={selectedWrestler}
          onClose={() => setSelectedWrestler(null)}
        />
      )}
      {selectedCoach && (
        <CoachModal
          coach={selectedCoach}
          onClose={() => setSelectedCoach(null)}
        />
      )}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </>
  );
}

function WrestlersPage() {
  const [selectedWrestler, setSelectedWrestler] = useState<Wrestler | null>(null);
  const [filter, setFilter] = useState<'همه' | 'بزرگسالان' | 'جوانان' | 'نوجوانان'>('همه');
  const wrestlers = getMockWrestlers();
  const filteredWrestlers = filter === 'همه' ? wrestlers : wrestlers.filter(w => w.age_category === filter);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">کشتی‌گیران استان</h1>
          <p className="text-lg text-secondary-600">آرشیو کامل کشتی‌گیران فعال استان</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['همه', 'بزرگسالان', 'جوانان', 'نوجوانان'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as typeof filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                filter === cat ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWrestlers.map((wrestler) => (
            <div
              key={wrestler.id}
              onClick={() => setSelectedWrestler(wrestler)}
              className="card cursor-pointer group"
            >
              <div className="relative h-48 bg-gradient-to-bl from-primary-600 to-primary-800 overflow-hidden">
                {wrestler.profile_image_url && (
                  <img src={wrestler.profile_image_url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    wrestler.age_category === 'بزرگسالان' ? 'bg-accent-500 text-white' :
                    wrestler.age_category === 'جوانان' ? 'bg-success-500 text-white' :
                    'bg-primary-400 text-white'
                  }`}>
                    {wrestler.age_category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">{wrestler.full_name}</h3>
                <p className="text-sm text-secondary-500">{wrestler.membership_number}</p>
                <p className="text-sm text-primary-600 font-medium">{wrestler.weight_class}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedWrestler && (
          <WrestlerModal wrestler={selectedWrestler} onClose={() => setSelectedWrestler(null)} />
        )}
      </div>
    </div>
  );
}

function CoachesPage() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const coaches = mockCoaches;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">مربیان هیئت</h1>
          <p className="text-lg text-secondary-600">تیم مربیان مجرب و باتجربه استان</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              onClick={() => setSelectedCoach(coach)}
              className="card p-6 cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary-100">
                  {coach.profile_image_url && (
                    <img src={coach.profile_image_url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">{coach.full_name}</h3>
                  <p className="text-sm text-primary-600">{coach.coaching_level}</p>
                  <p className="text-sm text-secondary-500">{coach.specialty}</p>
                </div>
              </div>
              <p className="text-secondary-600 text-sm line-clamp-2">{coach.biography}</p>
            </div>
          ))}
        </div>

        {selectedCoach && (
          <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
        )}
      </div>
    </div>
  );
}

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [filter, setFilter] = useState<string>('همه');
  const news = mockNews;
  const categories = ['همه', 'اخبار', 'رویدادها', 'مسابقات', 'مقالات', 'اعلامیه‌ها'];
  const filteredNews = filter === 'همه' ? news : news.filter(n => n.category === filter);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">اخبار و رویدادها</h1>
          <p className="text-lg text-secondary-600">جدیدترین اخبار و اطلاعیه‌های هیئت کشتی</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === cat ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="card cursor-pointer group"
            >
              <div className="h-48 overflow-hidden">
                {item.image_url && (
                  <img src={item.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
              <div className="p-4">
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">{item.category}</span>
                <h3 className="font-bold text-secondary-900 mt-2 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-secondary-500 mt-2 line-clamp-2">{item.summary}</p>
                <p className="text-xs text-secondary-400 mt-3">{item.published_date}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedNews && (
          <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
        )}
      </div>
    </div>
  );
}

function CompetitionsPage() {
  const competitions = mockCompetitions;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">تقویم مسابقات</h1>
          <p className="text-lg text-secondary-600">مسابقات و رویدادهای ورزشی</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((comp) => (
            <div key={comp.id} className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    comp.status === 'upcoming' ? 'bg-success-100 text-success-700' :
                    comp.status === 'ongoing' ? 'bg-warning-100 text-warning-700' :
                    'bg-secondary-100 text-secondary-700'
                  }`}>
                    {comp.status === 'upcoming' ? 'به زودی' : comp.status === 'ongoing' ? 'در حال برگزاری' : 'پایان یافته'}
                  </span>
                  <Calendar size={20} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">{comp.title}</h3>
                <p className="text-secondary-600 text-sm mb-4">{comp.description}</p>
                <div className="space-y-2 text-sm text-secondary-500">
                  <p className="flex items-center gap-2"><MapPin size={14} /> {comp.location}</p>
                  <p className="flex items-center gap-2"><Calendar size={14} /> {comp.start_date} تا {comp.end_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  const photos = mockGalleryPhotos;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">گالری تصاویر</h1>
          <p className="text-lg text-secondary-600">لحظات و رویدادهای به یادماندنی</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="card group relative overflow-hidden aspect-square cursor-pointer">
              <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">{photo.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="py-12">
      <ContactSection />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wrestlers" element={<WrestlersPage />} />
          <Route path="/coaches" element={<CoachesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
