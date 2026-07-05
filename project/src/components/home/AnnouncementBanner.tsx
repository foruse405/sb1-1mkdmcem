import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { mockAnnouncements } from '../../data/mockData';

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const activeAnnouncements = mockAnnouncements.filter(a => a.is_active);
  const announcement = activeAnnouncements[0];

  if (!announcement || dismissed) return null;

  return (
    <div className="bg-gradient-to-l from-accent-500 to-accent-600 text-white py-3 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <AlertCircle size={20} className="flex-shrink-0 animate-pulse-slow" />
          <div className="flex-1 text-center">
            <span className="font-bold ml-2">{announcement.title}:</span>
            <span className="text-white/90">{announcement.content}</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
