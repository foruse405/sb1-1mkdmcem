import { Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Award } from 'lucide-react';
import { getMockWrestlers } from '../../data/mockData';
import { Wrestler } from '../../types';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface WrestlersSectionProps {
  onWrestlerClick: (wrestler: Wrestler) => void;
}

export function WrestlersSection({ onWrestlerClick }: WrestlersSectionProps) {
  const wrestlers = getMockWrestlers().slice(0, 6);
  const [activeFilter, setActiveFilter] = useState(0);

  const weightClasses = ['همه دسته‌ها', '۵۷ کیلوگرم', '۶۵ کیلوگرم', '۷۴ کیلوگرم', '۸۶ کیلوگرم'];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-primary-500 rounded-full"></span>
              کشتی‌گیران استان
            </h2>
            <p className="text-sm md:text-base text-secondary-600 mt-2">کشتی‌گیران فعال و قهرمان استان</p>
          </div>
          <Link
            to="/wrestlers"
            className="hidden sm:inline-flex btn-outline text-sm md:text-base"
          >
            <span>همه کشتی‌گیران</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {weightClasses.map((weight, index) => (
            <button
              key={weight}
              onClick={() => setActiveFilter(index)}
              className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                activeFilter === index
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {wrestlers.map((wrestler, index) => (
            <div
              key={wrestler.id}
              onClick={() => onWrestlerClick(wrestler)}
              className="card cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <div className="h-40 sm:h-48 bg-gradient-to-bl from-primary-600 to-primary-800 relative overflow-hidden">
                  {wrestler.profile_image_url ? (
                    <img
                      src={wrestler.profile_image_url}
                      alt={wrestler.full_name}
                      className="w-full h-full object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award size={48} className="text-white/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 to-transparent" />
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                    wrestler.age_category === 'بزرگسالان'
                      ? 'bg-accent-500 text-white'
                      : wrestler.age_category === 'جوانان'
                      ? 'bg-success-500 text-white'
                      : 'bg-primary-400 text-white'
                  }`}>
                    {wrestler.age_category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white p-1.5 md:p-2 rounded-lg shadow-soft">
                    <QRCodeSVG
                      value={`https://wrestling-az.ir/wrestler/${wrestler.membership_number}`}
                      size={32}
                      level="M"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                      {wrestler.full_name}
                    </h3>
                    <p className="text-xs md:text-sm text-secondary-500">{wrestler.membership_number}</p>
                  </div>
                  <div className="text-left flex-shrink-0 mr-2">
                    <p className="text-xs md:text-sm font-bold text-primary-600">{wrestler.weight_class}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-secondary-100">
                  <span className="text-xs text-secondary-500 truncate max-w-[60%]">{wrestler.team_club}</span>
                  <div className="flex items-center gap-1 text-accent-500 flex-shrink-0">
                    <Trophy size={14} />
                    <span className="text-xs">{wrestler.achievements.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center sm:hidden">
          <Link to="/wrestlers" className="btn-outline text-sm">
            <span>مشاهده همه کشتی‌گیران</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
