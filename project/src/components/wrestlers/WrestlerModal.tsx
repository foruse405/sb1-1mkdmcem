import { X, Phone, Mail, Trophy, Award, Printer, Download, Calendar, Users } from 'lucide-react';
import { Wrestler, Certificate, Achievement } from '../../types';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { mockCertificates } from '../../data/mockData';

interface WrestlerModalProps {
  wrestler: Wrestler;
  onClose: () => void;
}

const medalColors: Record<string, string> = {
  gold: 'bg-accent-100 border-accent-400 text-accent-700',
  silver: 'bg-secondary-100 border-secondary-400 text-secondary-700',
  bronze: 'bg-success-100 border-success-400 text-success-700',
};

medalColors.gold = 'bg-gradient-to-br from-accent-100 to-accent-200 border-accent-400 text-accent-800';
medalColors.silver = 'bg-gradient-to-br from-secondary-100 to-secondary-200 border-secondary-400 text-secondary-700';
medalColors.bronze = 'bg-gradient-to-br from-success-100 to-success-200 border-success-400 text-success-700';

export function WrestlerModal({ wrestler, onClose }: WrestlerModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'achievements' | 'certificates'>('info');
  const certificates = mockCertificates.filter(c => c.wrestler_id === wrestler.id);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = (cert: Certificate) => {
    const link = document.createElement('a');
    link.href = cert.file_url;
    link.download = `${cert.title}.pdf`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in print:shadow-none">
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-primary-900">پروفایل کشتی‌گیر</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(90vh-65px)] overflow-y-auto">
          <div className="print:block">
            <div className="relative bg-gradient-to-l from-primary-700 to-primary-900 p-6 md:p-8">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 bg-accent-400 rounded-full blur-[100px]" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl flex-shrink-0">
                  {wrestler.profile_image_url ? (
                    <img
                      src={wrestler.profile_image_url}
                      alt={wrestler.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <Award size={48} className="text-white/50" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-white">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">{wrestler.full_name}</h1>
                      <p className="text-white/80 mb-3">شماره عضویت: {wrestler.membership_number}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          wrestler.age_category === 'بزرگسالان'
                            ? 'bg-accent-500'
                            : wrestler.age_category === 'جوانان'
                            ? 'bg-success-500'
                            : 'bg-primary-400'
                        }`}>
                          {wrestler.age_category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20">
                          {wrestler.weight_class}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                          {wrestler.team_club}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl shadow-lg">
                      <QRCodeSVG
                        value={`https://wrestling-az.ir/wrestler/${wrestler.membership_number}`}
                        size={100}
                        level="H"
                        includeMargin={false}
                      />
                      <p className="text-[10px] text-center text-secondary-500 mt-1">اسکن برای تایید</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="no-print flex gap-2 mb-6 border-b border-secondary-100 pb-2">
                {[
                  { key: 'info', label: 'اطلاعات پایه' },
                  { key: 'achievements', label: 'افتخارات' },
                  { key: 'certificates', label: 'مدرک‌ها' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-primary-600 text-white'
                        : 'text-secondary-600 hover:bg-secondary-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'info' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Users size={18} className="text-primary-600" />
                        <span className="text-sm text-secondary-500">تیم/باشگاه</span>
                      </div>
                      <p className="font-bold text-secondary-900">{wrestler.team_club}</p>
                    </div>
                    <div className="card p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy size={18} className="text-accent-600" />
                        <span className="text-sm text-secondary-500">تعداد مدال</span>
                      </div>
                      <p className="font-bold text-secondary-900">{wrestler.achievements.length} مدال</p>
                    </div>
                  </div>

                  {wrestler.biography && (
                    <div>
                      <h3 className="font-bold text-secondary-900 mb-2">بیوگرافی</h3>
                      <p className="text-secondary-600">{wrestler.biography}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {wrestler.phone && (
                      <a href={`tel:${wrestler.phone}`} className="btn-secondary">
                        <Phone size={18} />
                        <span>{wrestler.phone}</span>
                      </a>
                    )}
                    {wrestler.email && (
                      <a href={`mailto:${wrestler.email}`} className="btn-secondary">
                        <Mail size={18} />
                        <span>{wrestler.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-4 animate-fade-in">
                  {wrestler.achievements.length === 0 ? (
                    <div className="text-center py-8 text-secondary-500">
                      <Trophy size={48} className="mx-auto mb-4 text-secondary-300" />
                      <p>هنوز افتخاری ثبت نشده</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wrestler.achievements.map((achievement: Achievement, index: number) => (
                        <div
                          key={index}
                          className={`card p-4 border-2 ${medalColors[achievement.medal_type]}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.medal_type === 'gold' ? 'bg-accent-500' :
                              achievement.medal_type === 'silver' ? 'bg-secondary-400' : 'bg-success-500'
                            } text-white font-bold`}>
                              {achievement.medal_type === 'gold' ? '۱' : achievement.medal_type === 'silver' ? '۲' : '۳'}
                            </div>
                            <div>
                              <h4 className="font-bold">{achievement.title || achievement.competition}</h4>
                              <p className="text-sm opacity-80">{achievement.competition}</p>
                              <p className="text-xs opacity-60 flex items-center gap-1 mt-1">
                                <Calendar size={12} />
                                سال {achievement.year}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="space-y-4 animate-fade-in">
                  {certificates.length === 0 ? (
                    <div className="text-center py-8 text-secondary-500">
                      <Award size={48} className="mx-auto mb-4 text-secondary-300" />
                      <p>مدرکی ثبت نشده</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {certificates.map((cert) => (
                        <div key={cert.id} className="card p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-secondary-900">{cert.title}</h4>
                            <p className="text-sm text-secondary-500">{cert.description}</p>
                            <p className="text-xs text-secondary-400 mt-1">تاریخ بارگذاری: {cert.upload_date}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handlePrint}
                              className="p-2 rounded-lg bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors"
                              title="چاپ"
                            >
                              <Printer size={18} />
                            </button>
                            <button
                              onClick={() => handleDownloadPDF(cert)}
                              className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                              title="دانلود"
                            >
                              <Download size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="hidden print:block p-8 border-t-2 border-secondary-200">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">گواهی عضویت</h2>
                <div className="border-4 border-double border-primary-900 p-8">
                  <h3 className="text-xl font-bold mb-4">{wrestler.full_name}</h3>
                  <p className="mb-2">شماره عضویت: {wrestler.membership_number}</p>
                  <p className="mb-2">دسته سنی: {wrestler.age_category}</p>
                  <p className="mb-2">دسته وزنی: {wrestler.weight_class}</p>
                  <p className="mb-4">باشگاه: {wrestler.team_club}</p>
                  <div className="mt-8 pt-4 border-t border-dashed text-sm text-secondary-500">
                    <p>تاریخ صدور: {new Date().toLocaleDateString('fa-IR')}</p>
                    <p>هیئت کشتی استان آذربایجان غربی</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="no-print border-t border-secondary-100 px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            بستن
          </button>
          <button onClick={handlePrint} className="btn-primary">
            <Printer size={18} />
            <span>چاپ گواهی</span>
          </button>
        </div>
      </div>
    </div>
  );
}
