import { Link } from 'react-router-dom';
import { Calendar, Users, ChevronLeft, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />
      {/* Dark 55% overlay for text readability */}
      <div className="absolute inset-0 bg-primary-950/55" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-48 sm:w-72 h-48 sm:h-72 bg-accent-500 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-60 sm:w-96 h-60 sm:h-96 bg-primary-400 rounded-full blur-[120px] sm:blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent-400 text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in">
            <Award size={14} className="sm:w-[18px] sm:h-[18px]" />
            <span>پورتال رسمی هیئت کشتی استان آذربایجان غربی</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 animate-slide-up drop-shadow-lg">
            توسعه، افتخار و قهرمانی در{' '}
            <span className="text-accent-400">مهد کشتی ایران</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-secondary-100 mb-6 sm:mb-10 leading-relaxed animate-slide-up animate-delay-100 px-2 sm:px-0 drop-shadow-md">
            استانی با تاریخچه‌ای درخشان در پرورش قهرمانان المپیکی و جهانی کشتی.
            ما با هدف شناسایی و پرورش استعدادهای کشتی، جامعه‌ای از قهرمانان آینده را می‌سازیم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up animate-delay-200">
            <Link
              to="/wrestlers"
              className="btn-accent text-sm sm:text-base md:text-lg w-full sm:w-auto group"
            >
              <Users size={18} className="sm:w-[22px] sm:h-[22px]" />
              <span>مشاهده کشتی‌گیران</span>
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform sm:w-[18px] sm:h-[18px]" />
            </Link>

            <Link
              to="/competitions"
              className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-sm sm:text-base md:text-lg w-full sm:w-auto border border-white/20"
            >
              <Calendar size={18} className="sm:w-[22px] sm:h-[22px]" />
              <span>تقویم مسابقات</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 animate-fade-in animate-delay-300">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-400 mb-1 sm:mb-2">۵۰+</div>
              <div className="text-xs sm:text-sm md:text-base text-secondary-200">کشتی‌گیر فعال</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-400 mb-1 sm:mb-2">۵</div>
              <div className="text-xs sm:text-sm md:text-base text-secondary-200">مربی مجرب</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-400 mb-1 sm:mb-2">۲۰+</div>
              <div className="text-xs sm:text-sm md:text-base text-secondary-200">مدال بین‌المللی</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
