import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WISDOM_QUOTES } from '../data/mockData';
import { Language } from '../types/marketplace';

interface WisdomBannerProps {
  lang: Language;
}

export const WisdomBanner: React.FC<WisdomBannerProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isWo = lang === 'wo';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WISDOM_QUOTES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const quote = WISDOM_QUOTES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + WISDOM_QUOTES.length) % WISDOM_QUOTES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WISDOM_QUOTES.length);
  };

  return (
    <div className="bg-[#FAF3E0] border-y border-[#E8DCBF] py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left cultural symbol */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#165B43] text-[#D4AF37] flex items-center justify-center shadow-xs">
            <Quote className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#165B43] uppercase tracking-wider flex items-center gap-1.5">
              <span>{isWo ? 'Wax ju xelu Serigne Touba' : 'Sagesse de Khadimou Rassoul'}</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </div>
            <p className="text-[11px] text-[#765D37]">
              {isWo ? 'Liggéey ak dëggu ci yaxanto' : 'Éthique du travail & de la Khidma'}
            </p>
          </div>
        </div>

        {/* Center Quote Text */}
        <div className="flex-1 text-center md:text-left px-2 md:px-6">
          <blockquote className="text-xs md:text-sm font-medium italic text-[#2D2A26] leading-relaxed">
            "{isWo ? quote.wolof : quote.french}"
          </blockquote>
          <p className="text-xs font-bold text-[#8C6407] mt-1">
            — {quote.author}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full hover:bg-[#EBDCBA] text-[#5C4A28] transition-colors cursor-pointer"
            aria-label="Citation précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            {WISDOM_QUOTES.map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-4 bg-[#165B43]' : 'w-1.5 bg-[#C9B995]'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full hover:bg-[#EBDCBA] text-[#5C4A28] transition-colors cursor-pointer"
            aria-label="Citation suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
