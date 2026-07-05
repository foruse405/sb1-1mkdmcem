import { Link } from 'react-router-dom';
import { ChevronLeft, Award, Phone, Mail } from 'lucide-react';
import { mockCoaches } from '../../data/mockData';
import { Coach } from '../../types';

interface CoachesSectionProps {
  onCoachClick: (coach: Coach) => void;
}

export function CoachesSection({ onCoachClick }: CoachesSectionProps) {
  const activeCoaches = mockCoaches.filter(c => c.is_active).slice(0, 3);

  return (
    <section className="py-12 md:py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-accent-500 rounded-full"></span>
              مربیان برجسته
            </h2>
            <p className="text-sm md:text-base text-secondary-600 mt-2">مربیان موفق و باتجربه هیئت کشتی استان</p>
          </div>
          <Link
            to="/coaches"
            className="hidden sm:inline-flex btn-outline text-sm md:text-base"
          >
            <span>همه مربیان</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {activeCoaches.map((coach, index) => (
            <div
              key={coach.id}
              onClick={() => onCoachClick(coach)}
              className="card p-4 md:p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-secondary-100">
                  {coach.profile_image_url ? (
                    <img
                      src={coach.profile_image_url}
                      alt={coach.full_name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary-400">
                      <Award size={32} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                    {coach.full_name}
                  </h3>
                  <p className="text-xs md:text-sm text-primary-600 font-medium">{coach.coaching_level}</p>
                  <p className="text-xs text-secondary-500 mt-1">{coach.specialty}</p>
                </div>
              </div>

              <p className="text-secondary-600 text-xs md:text-sm line-clamp-3 mb-3 md:mb-4 min-h-[60px]">
                {coach.biography || 'مربی باتجربه در زمینه کشتی.'}
              </p>

              <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-secondary-100">
                <div className="flex items-center gap-2 text-xs md:text-sm text-secondary-500">
                  <Award size={14} className="text-accent-500" />
                  <span>{coach.experience_years} سال تجربه</span>
                </div>
                <div className="flex items-center gap-2">
                  {coach.phone && (
                    <a
                      href={`tel:${coach.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                    >
                      <Phone size={16} />
                    </a>
                  )}
                  {coach.email && (
                    <a
                      href={`mailto:${coach.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center sm:hidden">
          <Link to="/coaches" className="btn-outline text-sm">
            <span>مشاهده همه مربیان</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
