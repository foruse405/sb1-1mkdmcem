import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronLeft } from 'lucide-react';
import { mockCompetitions } from '../../data/mockData';

export function CompetitionsSection() {
  const upcomingCompetitions = mockCompetitions
    .filter(c => c.status === 'upcoming')
    .slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-primary-500 rounded-full"></span>
              تقویم مسابقات
            </h2>
            <p className="text-sm md:text-base text-secondary-600 mt-2">مسابقات و رویدادهای پیش رو</p>
          </div>
          <Link
            to="/competitions"
            className="hidden sm:inline-flex btn-outline text-sm md:text-base"
          >
            <span>تقویم کامل</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute right-4 md:right-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 rounded-full hidden sm:block" />

          <div className="space-y-4 md:space-y-6">
            {upcomingCompetitions.map((competition, index) => (
              <div
                key={competition.id}
                className="relative pr-0 sm:pr-12"
              >
                <div className="absolute right-2 top-6 w-3 h-3 bg-primary-500 rounded-full border-4 border-white shadow-soft hidden sm:block" />

                <div className="card p-4 md:p-6 hover:border-primary-200 transition-all">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                          competition.status === 'upcoming'
                            ? 'bg-success-100 text-success-700'
                            : competition.status === 'ongoing'
                            ? 'bg-warning-100 text-warning-700'
                            : 'bg-secondary-100 text-secondary-700'
                        }`}>
                          {competition.status === 'upcoming' ? 'به زودی' : competition.status === 'ongoing' ? 'در حال برگزاری' : 'پایان یافته'}
                        </span>
                        <span className="text-xs text-secondary-500">{competition.competition_type}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-secondary-900 mb-1 md:mb-2">{competition.title}</h3>
                      {competition.description && (
                        <p className="text-secondary-600 text-xs md:text-sm mb-3 line-clamp-2">{competition.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-secondary-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-primary-500" />
                          <span className="truncate max-w-[200px]">{competition.location}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-accent-500" />
                          <span>{competition.start_date}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 pt-3 md:pt-0 border-t sm:border-t-0 border-secondary-100">
                      <span className="flex items-center gap-1 text-xs md:text-sm text-secondary-500">
                        <Clock size={14} className="text-accent-500" />
                        <span>تا {competition.end_date}</span>
                      </span>
                      <span className="text-xs font-medium text-success-600 bg-success-50 px-2 py-1 rounded">ثبت‌نام فعال</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center sm:hidden">
          <Link to="/competitions" className="btn-outline text-sm">
            <span>تقویم کامل مسابقات</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
