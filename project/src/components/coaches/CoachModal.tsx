import { X, Phone, Mail, Award, Calendar } from 'lucide-react';
import { Coach } from '../../types';

interface CoachModalProps {
  coach: Coach;
  onClose: () => void;
}

export function CoachModal({ coach, onClose }: CoachModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-primary-900">پروفایل مربی</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(90vh-140px)] overflow-y-auto">
          <div className="relative bg-gradient-to-l from-accent-600 to-accent-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl flex-shrink-0">
                {coach.profile_image_url ? (
                  <img
                    src={coach.profile_image_url}
                    alt={coach.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <Award size={48} className="text-white/50" />
                  </div>
                )}
              </div>

              <div className="text-white text-center md:text-right">
                <h1 className="text-2xl font-bold mb-2">{coach.full_name}</h1>
                <p className="text-white/90 font-medium">{coach.coaching_level}</p>
                <p className="text-white/80">{coach.specialty}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={18} className="text-accent-600" />
                  <span className="text-sm text-secondary-500">تجربه</span>
                </div>
                <p className="font-bold text-secondary-900">{coach.experience_years} سال</p>
              </div>
              <div className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={18} className="text-primary-600" />
                  <span className="text-sm text-secondary-500">وضعیت</span>
                </div>
                <p className="font-bold text-success-600">{coach.is_active ? 'فعال' : 'غیرفعال'}</p>
              </div>
            </div>

            {coach.biography && (
              <div>
                <h3 className="font-bold text-secondary-900 mb-2">بیوگرافی</h3>
                <p className="text-secondary-600 leading-relaxed">{coach.biography}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {coach.phone && (
                <a href={`tel:${coach.phone}`} className="btn-primary">
                  <Phone size={18} />
                  <span>{coach.phone}</span>
                </a>
              )}
              {coach.email && (
                <a href={`mailto:${coach.email}`} className="btn-secondary">
                  <Mail size={18} />
                  <span>{coach.email}</span>
                </a>
              )}
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
