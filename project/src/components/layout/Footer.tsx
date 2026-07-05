import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-bl from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">ک</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">هیئت کشتی استان</h3>
                <p className="text-sm text-secondary-400">آذربایجان غربی</p>
              </div>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              هیئت کشتی استان آذربایجان غربی با هدف توسعه و پیشرفت کشتی در منطقه فعالیت می‌کند و پرورش قهرمانان ملی را دنبال می‌نماید.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors"
              >
                <Send size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-400">دسترسی سریع</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'صفحه اصلی' },
                { href: '/wrestlers', label: 'کشتی‌گیران' },
                { href: '/coaches', label: 'مربیان' },
                { href: '/news', label: 'اخبار و رویدادها' },
                { href: '/competitions', label: 'مسابقات' },
                { href: '/gallery', label: 'گالری تصاویر' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-accent-400 hover:mr-1 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-400">خدمات</h4>
            <ul className="space-y-3">
              {[
                { href: '/admin', label: 'ثبت‌نام کشتی‌گیران' },
                { href: '/admin', label: 'درخواست مدرک مربیگری' },
                { href: '/competitions', label: 'تقویم مسابقات' },
                { href: '/wrestlers', label: 'استعلام عضویت' },
                { href: '/news', label: 'آرشیو اخبار' },
                { href: '/contact', label: 'ارتباط با ما' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-accent-400 hover:mr-1 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-400">تماس با ما</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-accent-400" />
                <span className="text-secondary-300">
                  استان آذربایجان غربی، ارومیه، خیابان امام خمینی (ره)، ساختمان مرکزی ورزش
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-400" />
                <a href="tel:+984412345678" className="text-secondary-300 hover:text-accent-400 transition-colors">
                  ۰۴۴-۱۲۳۴۵۶۷۸
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-400" />
                <a href="mailto:info@wrestling-az.ir" className="text-secondary-300 hover:text-accent-400 transition-colors">
                  info@wrestling-az.ir
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-400 text-sm">
              تمامی حقوق مادی و معنوی این وب‌سایت متعلق به هیئت کشتی استان آذربایجان غربی می‌باشد.
            </p>
            <p className="text-secondary-500 text-sm">
              طراحی و توسعه: تیم فنی هیئت کشتی استان
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
