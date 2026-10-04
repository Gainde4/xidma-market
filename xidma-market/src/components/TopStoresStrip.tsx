import React from 'react';
import { Store, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Language, Seller } from '../types/marketplace';

interface TopStoresStripProps {
  sellers: Seller[];
  onSelectStore: (seller: Seller) => void;
  onViewAllStores: () => void;
  lang: Language;
}

export const TopStoresStrip: React.FC<TopStoresStripProps> = ({
  sellers,
  onSelectStore,
  onViewAllStores,
  lang,
}) => {
  const isWo = lang === 'wo';

  return (
    <div className="space-y-3">
      {/* Header with Title and "View all" */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-[#1A2E22] tracking-tight">
          {isWo ? 'Këru Liggéey yi gën a siw' : 'Boutiques & Ateliers en vedette'}
        </h3>
        <button
          onClick={onViewAllStores}
          className="text-xs font-bold text-[#00A86B] hover:text-[#008f5a] flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <span>{isWo ? 'Xool yépp' : 'Voir tout'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Stores Circular Strip matching screenshot */}
      <div className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto pb-2 pt-1 scrollbar-none">
        {sellers.map((seller) => (
          <button
            key={seller.id}
            onClick={() => onSelectStore(seller)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            {/* Circular Store Avatar Container with border */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-[#E1E8DF] group-hover:border-[#00A86B] transition-colors bg-white shadow-xs">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-full h-full rounded-full object-cover"
              />
              {seller.isVerified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] fill-white" />
                </div>
              )}
            </div>

            {/* Store Name */}
            <span className="text-[11px] font-semibold text-[#2D3F34] max-w-[70px] truncate text-center group-hover:text-[#00A86B] transition-colors">
              {seller.name.split(' ')[0]} {seller.name.split(' ')[1] || ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
