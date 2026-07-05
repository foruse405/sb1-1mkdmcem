import { Link } from 'react-router-dom';
import { ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { mockGalleryPhotos } from '../../data/mockData';

export function GallerySection() {
  const photos = mockGalleryPhotos.slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-900 flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-accent-500 rounded-full"></span>
              گالری تصاویر
            </h2>
            <p className="text-sm md:text-base text-secondary-600 mt-2">لحظات و رویدادهای به یادماندنی</p>
          </div>
          <Link
            to="/gallery"
            className="hidden sm:inline-flex btn-outline text-sm md:text-base"
          >
            <span>گالری کامل</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative group overflow-hidden rounded-xl md:rounded-2xl cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`bg-primary-100 ${
                index === 0
                  ? 'aspect-[4/3] md:aspect-auto md:h-full min-h-[200px] md:min-h-full'
                  : 'aspect-square'
              }`}>
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 right-0 left-0 p-3 md:p-4">
                  <h4 className="text-white font-bold text-sm md:text-base">{photo.title}</h4>
                  {photo.description && (
                    <p className="text-white/80 text-xs md:text-sm mt-1 line-clamp-2">{photo.description}</p>
                  )}
                </div>
              </div>
              <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-white/90 p-1.5 md:p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon size={14} className="text-primary-600 md:w-4 md:h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center sm:hidden">
          <Link to="/gallery" className="btn-outline text-sm">
            <span>مشاهده گالری کامل</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
