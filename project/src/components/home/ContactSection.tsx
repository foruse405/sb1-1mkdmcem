import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'آدرس',
      content: 'استان آذربایجان غربی، ارومیه، خیابان امام خمینی (ره)، ساختمان مرکزی ورزش، طبقه دوم',
      color: 'primary',
    },
    {
      icon: Phone,
      title: 'تلفن تماس',
      content: ['تلفن: ۰۴۴-۱۲۳۴۵۶۷۸', 'فکس: ۰۴۴-۱۲۳۴۵۶۷۹'],
      color: 'accent',
    },
    {
      icon: Mail,
      title: 'ایمیل',
      content: 'info@wrestling-az.ir',
      color: 'success',
    },
    {
      icon: Clock,
      title: 'ساعات کاری',
      content: ['شنبه تا چهارشنبه: ۸ صبح تا ۴ عصر', 'پنج‌شنبه: ۸ صبح تا ۱۲ ظهر'],
      color: 'warning',
    },
  ];

  const colorClasses = {
    primary: { bg: 'bg-primary-100', text: 'text-primary-600' },
    accent: { bg: 'bg-accent-100', text: 'text-accent-600' },
    success: { bg: 'bg-success-100', text: 'text-success-600' },
    warning: { bg: 'bg-warning-100', text: 'text-warning-600' },
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 flex items-center justify-center gap-3">
            <span className="w-1.5 h-6 md:h-8 bg-primary-500 rounded-full"></span>
            تماس با ما
          </h2>
          <p className="text-sm md:text-base text-secondary-600 mt-2">در ارتباط باشید</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {contactInfo.map((info) => {
              const colors = colorClasses[info.color as keyof typeof colorClasses];
              return (
                <div key={info.title} className="card p-4 md:p-5 flex flex-col">
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <div className={`w-9 h-9 md:w-11 md:h-11 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <info.icon size={18} className={`${colors.text} md:w-5 md:h-5`} />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-secondary-900">{info.title}</h3>
                  </div>
                  <div className="text-secondary-600 text-xs md:text-sm">
                    {Array.isArray(info.content) ? (
                      info.content.map((line, i) => <p key={i}>{line}</p>)
                    ) : (
                      <p className="line-clamp-2">{info.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card p-5 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-secondary-900 mb-4 md:mb-6 flex items-center gap-2">
              <Send size={20} className="text-primary-600" />
              ارسال پیام
            </h3>

            {submitted ? (
              <div className="bg-success-50 border border-success-200 rounded-xl p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-success-600 md:w-8 md:h-8" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-success-800 mb-2">پیام شما ارسال شد</h4>
                <p className="text-sm text-success-600">در اسرع وقت با شما تماس خواهیم گرفت.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-secondary-700 mb-2">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-secondary-700 mb-2">ایمیل</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-secondary-700 mb-2">موضوع</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-secondary-700 mb-2">پیام</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="input resize-none text-sm md:text-base"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full text-sm md:text-base">
                  <Send size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>ارسال پیام</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-12 card overflow-hidden">
          <div className="h-48 md:h-64 bg-secondary-100 flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin size={36} className="text-secondary-400 mx-auto mb-3 md:w-12 md:h-12" />
              <p className="text-sm md:text-base text-secondary-500">نقشه محل هیئت کشتی استان</p>
              <p className="text-xs text-secondary-400 mt-2">ارومیه، خیابان امام خمینی (ره)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
