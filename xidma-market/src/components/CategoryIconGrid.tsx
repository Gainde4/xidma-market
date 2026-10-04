import React, { useState } from 'react';
import { 
  Coffee, 
  Sparkles, 
  Gem, 
  BookOpen, 
  HeartHandshake, 
  Truck, 
  Wheat, 
  Flame, 
  Check, 
  ChevronDown, 
  ChevronUp,
  LayoutGrid
} from 'lucide-react';
import { CategoryId, Language } from '../types/marketplace';

interface CategoryIconGridProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  lang: Language;
}

const CATEGORY_ITEMS = [
  {
    id: 'all' as CategoryId,
    labelFr: 'Tout voir',
    labelWo: 'Lépp',
    icon: LayoutGrid,
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    emoji: '🏪',
  },
  {
    id: 'terroir' as CategoryId,
    labelFr: 'Café Touba',
    labelWo: 'Kàfe Touba',
    icon: Coffee,
    bgColor: 'bg-amber-50 text-amber-800 border-amber-100',
    emoji: '☕',
  },
  {
    id: 'mode' as CategoryId,
    labelFr: 'Mode & Boubous',
    labelWo: 'Yére & Baye Lahat',
    icon: Sparkles,
    bgColor: 'bg-purple-50 text-purple-700 border-purple-100',
    emoji: '✨',
  },
  {
    id: 'artisanat' as CategoryId,
    labelFr: 'Kourouss & Bois',
    labelWo: 'Kuruus & Ébène',
    icon: Gem,
    bgColor: 'bg-orange-50 text-orange-800 border-orange-100',
    emoji: '🪵',
  },
  {
    id: 'edition' as CategoryId,
    labelFr: 'Khassaïdes',
    labelWo: 'Xassaïd & Téere',
    icon: BookOpen,
    bgColor: 'bg-blue-50 text-blue-800 border-blue-100',
    emoji: '📖',
  },
  {
    id: 'bernde' as CategoryId,
    labelFr: 'Berndé & Magal',
    labelWo: 'Berndé Gan yi',
    icon: HeartHandshake,
    bgColor: 'bg-rose-50 text-rose-700 border-rose-100',
    emoji: '🤝',
  },
  {
    id: 'services' as CategoryId,
    labelFr: 'Fret & Services',
    labelWo: 'Yonnee & BTP',
    icon: Truck,
    bgColor: 'bg-teal-50 text-teal-800 border-teal-100',
    emoji: '✈️',
  },
];

export const CategoryIconGrid: React.FC<CategoryIconGridProps> = ({
  selectedCategory,
  onSelectCategory,
  lang,
}) => {
  const isWo = lang === 'wo';
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? CATEGORY_ITEMS : CATEGORY_ITEMS.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E8ECE5] shadow-xs space-y-3">
      {/* Category Icon Cards Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5 sm:gap-3">
        {displayedCategories.map((item) => {
          const isSelected = selectedCategory === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer group text-center ${
                isSelected
                  ? 'bg-[#165B43] text-white shadow-sm ring-2 ring-[#00A86B]/30'
                  : 'hover:bg-[#F4F7F2] text-[#33463B]'
              }`}
            >
              {/* Icon Container with soft background */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg mb-1.5 transition-transform group-hover:scale-105 border ${
                  isSelected
                    ? 'bg-white/20 border-white/30 text-white'
                    : `${item.bgColor}`
                }`}
              >
                <span>{item.emoji}</span>
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-semibold leading-tight line-clamp-1 truncate max-w-full ${
                  isSelected ? 'text-white' : 'text-[#3E5246]'
                }`}
              >
                {isWo ? item.labelWo : item.labelFr}
              </span>
            </button>
          );
        })}
      </div>

      {/* "View More Categories" Button matching screenshot */}
      <div className="pt-1 flex justify-center border-t border-[#F0F4ED]">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A86B] hover:text-[#008f5a] transition-colors py-1 cursor-pointer"
        >
          <span className="w-2 h-2 rotate-45 bg-[#00A86B] rounded-xs" />
          <span>
            {showAll
              ? (isWo ? 'Waññi fàcc yi' : 'Moins de catégories')
              : (isWo ? 'Wone yeneen fàcc yi' : 'Voir toutes les catégories')}
          </span>
          {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
