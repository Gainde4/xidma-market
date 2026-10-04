import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryId, Language } from '../types/marketplace';

interface PromoCarouselBannerProps {
  lang: Language;
  onSelectCategory: (cat: CategoryId) => void;
  onExplore: () => void;
}

const BANNERS = [
  {
    id: 1,
    badgeFr: 'Offres Terroir Baol -20%',
    badgeWo: 'Njëg yu woyof ci Baol -20%',
    titleFr: 'Café Touba Royal & Épices Djar',
    titleWo: 'Kàfe Touba gu dëggu ak Djàr',
    subtitleFr: 'Torréfié au feu de bois à Touba 28',
    subtitleWo: 'Torréfaction aada ci Touba',
    dateFr: 'Édition Spéciale Octobre 2026',
    dateWo: 'Xéewal ci wéeru Magal',
    bgGradient: 'from-[#0C2B20] via-[#123B2C] to-[#1C5B43]',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category: 'terroir' as CategoryId,
    ctaFr: 'Commander',
    ctaWo: 'Jënd léegi',
  },
  {
    id: 2,
    badgeFr: 'Haute Broderie & Bazin Riche',
    badgeWo: 'Bazin Riche ñawu loxo',
    titleFr: 'Boubous & Baye Lahat de Prestige',
    titleWo: 'Yére Bazin ak Baye Lahat',
    subtitleFr: 'Confectionnés à la main par les maîtres tailleurs',
    subtitleWo: 'Ñawu loxo yu xereñ ci Touba & Ndakaaru',
    dateFr: 'Collections Cérémonies & Magal',
    dateWo: 'Yére Magal bu rafet',
    bgGradient: 'from-[#2C1810] via-[#3D2314] to-[#5C321E]',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    category: 'mode' as CategoryId,
    ctaFr: 'Découvrir',
    ctaWo: 'Xool ko',
  },
  {
    id: 3,
    badgeFr: 'Berndé & Hospitalité Magal',
    badgeWo: 'Berndé ak Ganale Magal',
    titleFr: 'Packs Hospitalité pour Pèlerins',
    titleWo: 'Paas Berndé ngir Gan yi',
    subtitleFr: 'Céréales Arraw, Thiakry, Miel & Dattes',
    subtitleWo: 'Araw, Caakri, Lem ak Tàndarma',
    dateFr: 'Livraison express à Touba & Daaras',
    dateWo: 'Yóbbu ko Touba gaaw',
    bgGradient: 'from-[#1B3A2B] via-[#134A36] to-[#0A2E20]',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    category: 'bernde' as CategoryId,
    ctaFr: 'Participer',
    ctaWo: 'Bokk ci',
  }
];

export const PromoCarouselBanner: React.FC<PromoCarouselBannerProps> = ({
  lang,
  onSelectCategory,
  onExplore,
}) => {
  const isWo = lang === 'wo';
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[current];

  return (
    <div className="w-full space-y-2.5">
      {/* Banner Card */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${banner.bgGradient} text-white shadow-md min-h-[185px] sm:min-h-[210px] flex items-center transition-all duration-500`}>
        {/* Background photo overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-5/12 overflow-hidden pointer-events-none">
          <img
            src={banner.image}
            alt=""
            className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B20] sm:from-transparent via-transparent to-black/30" />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 p-5 sm:p-7 max-w-[65%] sm:max-w-[60%] space-y-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#F3E5AB] text-[11px] font-bold tracking-wide">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{isWo ? banner.badgeWo : banner.badgeFr}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-tight font-poppins tracking-tight">
            {isWo ? banner.titleWo : banner.titleFr}
          </h3>

          <p className="text-xs text-[#C8DFD4] hidden sm:block font-light">
            {isWo ? banner.subtitleWo : banner.subtitleFr}
          </p>

          <div className="text-[10px] text-[#A8C7B9] font-medium">
            {isWo ? banner.dateWo : banner.dateFr}
          </div>

          {/* CTA Button */}
          <div className="pt-1">
            <button
              onClick={() => {
                onSelectCategory(banner.category);
                onExplore();
              }}
              className="px-4 py-2 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{isWo ? banner.ctaWo : banner.ctaFr}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel slide controls */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors sm:hidden"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % BANNERS.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors sm:hidden"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pagination Dots indicator below matching screenshot */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === current ? 'w-6 bg-[#00A86B]' : 'w-2 bg-[#D1DDD6]'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
