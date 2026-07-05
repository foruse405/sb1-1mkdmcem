import { X, Clock, User, Eye } from 'lucide-react';
import { News } from '../../types';

interface NewsModalProps {
  news: News;
  onClose: () => void;
}

export function NewsModal({ news, onClose }: NewsModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-primary-900">{news.category}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(90vh-140px)] overflow-y-auto">
          {news.image_url && (
            <div className="relative h-64 md:h-80">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 to-transparent" />
            </div>
          )}

          <div className={news.image_url ? '-mt-20 relative z-10 px-6' : 'px-6 pt-6'}>
            <span className="badge-accent mb-4">{news.category}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">{news.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500 mb-6">
              <span className="flex items-center gap-1">
                <User size={16} />
                {news.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {news.published_date}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {news.views} بازدید
              </span>
            </div>

            <div className="prose prose-lg max-w-none text-secondary-700 leading-relaxed">
              {news.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-100 px-6 py-4 flex justify-end">
          <button onClick={onClose} className="btn-secondary">
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
