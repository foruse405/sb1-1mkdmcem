import { Link } from 'react-router-dom';
import { ChevronLeft, Clock, User } from 'lucide-react';
import { mockNews } from '../../data/mockData';
import { News } from '../../types';

interface NewsCardProps {
  news: News;
  onClick: () => void;
}

function NewsCard({ news, onClick }: NewsCardProps) {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer group h-full flex flex-col"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={news.image_url || 'https://images.pexels.com/photos/1103833/pexels-photo-1103833.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 left-3">
          <span className="badge-accent text-xs">{news.category}</span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {news.title}
        </h3>
        <p className="text-secondary-600 text-sm line-clamp-2 mb-3 flex-1">{news.summary}</p>
        <div className="flex items-center justify-between text-xs text-secondary-500 mt-auto">
          <span className="flex items-center gap-1">
            <User size={12} />
            {news.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {news.published_date}
          </span>
        </div>
      </div>
    </div>
  );
}

interface NewsSectionProps {
  onNewsClick: (news: News) => void;
}

export function NewsSection({ onNewsClick }: NewsSectionProps) {
  const displayNews = mockNews.slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-accent-500 rounded-full"></span>
              آخرین اخبار
            </h2>
            <p className="text-sm md:text-base text-secondary-600 mt-2">جدیدترین اخبار و رویدادهای هیئت کشتی استان</p>
          </div>
          <Link
            to="/news"
            className="hidden sm:inline-flex btn-outline text-sm md:text-base"
          >
            <span>مشاهده همه</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayNews.map((news) => (
            <NewsCard
              key={news.id}
              news={news}
              onClick={() => onNewsClick(news)}
            />
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center sm:hidden">
          <Link to="/news" className="btn-outline text-sm">
            <span>مشاهده همه اخبار</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
