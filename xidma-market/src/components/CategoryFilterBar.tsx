import React from 'react';
import { 
  Coffee, 
  Sparkles, 
  Gem, 
  BookOpen, 
  Truck, 
  HeartHandshake, 
  LayoutGrid,
  Filter,
  Check
} from 'lucide-react';
import { CategoryId, Language } from '../types/marketplace';
import { CATEGORIES } from '../data/mockData';

interface CategoryFilterBarProps {
  lang: Language;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onlyArtisanal: boolean;
  onToggleArtisanal: () => void;
  totalResults: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
  sortBy,
  onSortChange,
  onlyArtisanal,
  onToggleArtisanal,
  totalResults,
}) => {
  const isWo = lang === 'wo';

  const regions = [
    { id: 'all', labelFr: 'Toutes les régions', labelWo: 'Bérab yépp' },
    { id: 'touba', labelFr: 'Touba & Mbacké', labelWo: 'Touba ak Mbàkke' },
    { id: 'dakar', labelFr: 'Dakar & Thiès', labelWo: 'Ndakaaru ak Cees' },
    { id: 'baol', labelFr: 'Khelcom & Terroir Baol', labelWo: 'Xelcom ak Baol' },
    { id: 'diaspora', labelFr: 'Diaspora (France, USA, Italie)', labelWo: 'Bitim-réew' },
  ];

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'terroir': return <Coffee className="w-4 h-4" />;
      case 'mode': return <Sparkles className="w-4 h-4" />;
      case 'artisanat': return <Gem className="w-4 h-4" />;
      case 'edition': return <BookOpen className="w-4 h-4" />;
      case 'services': return <Truck className="w-4 h-4" />;
      case 'bernde': return <HeartHandshake className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <section className="bg-white border-b border-[#EAE3D2] py-4 px-4 sm:px-6 sticky top-[69px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Horizontal Category Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#165B43] text-white shadow-xs font-semibold'
                    : 'bg-[#F5F2EB] text-[#4A5D53] hover:bg-[#EAE3D2] hover:text-[#165B43]'
                }`}
              >
                <span className={isActive ? 'text-[#F3E5AB]' : 'text-[#6B8577]'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{isWo ? cat.labelWo : cat.labelFr}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sorting Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0EAE1] text-xs">
          {/* Left: Region Filter & Fait Main Checkbox */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#5C6E64]">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-medium hidden sm:inline">
                {isWo ? 'Dëkk / Bérab :' : 'Origine :'}
              </span>
              <select
                value={selectedRegion}
                onChange={(e) => onSelectRegion(e.target.value)}
                className="bg-[#F8F6F0] border border-[#DDD5C5] rounded-md px-2.5 py-1.5 text-xs text-[#2A3B31] font-medium outline-none focus:border-[#165B43] focus:ring-1 focus:ring-[#165B43]"
              >
                {regions.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {isWo ? reg.labelWo : reg.labelFr}
                  </option>
                ))}
              </select>
            </div>

            {/* Artisanal / Fait main toggle */}
            <button
              onClick={onToggleArtisanal}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                onlyArtisanal
                  ? 'bg-[#165B43]/10 border-[#165B43] text-[#165B43]'
                  : 'bg-[#F8F6F0] border-[#DDD5C5] text-[#5C6E64] hover:border-[#165B43]'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                onlyArtisanal ? 'bg-[#165B43] border-[#165B43] text-white' : 'border-[#94A79D]'
              }`}>
                {onlyArtisanal && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
              <span>{isWo ? 'Ñawu loxo rekk (100% Artisanal)' : '100% Artisanal & Fait Main'}</span>
            </button>
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-[#6C7E74] text-xs">
              <strong className="text-[#165B43] font-semibold">{totalResults}</strong> {isWo ? 'liggéey' : (totalResults > 1 ? 'articles trouvés' : 'article trouvé')}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-[#5C6E64] hidden sm:inline">
                {isWo ? 'Tegal ko ci :' : 'Trier par :'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-[#F8F6F0] border border-[#DDD5C5] rounded-md px-2.5 py-1.5 text-xs text-[#2A3B31] font-medium outline-none focus:border-[#165B43]"
              >
                <option value="popular">{isWo ? 'Li gën a siw' : 'Recommandés & Populaires'}</option>
                <option value="price-asc">{isWo ? 'Njëg li gën a woyof' : 'Prix croissant'}</option>
                <option value="price-desc">{isWo ? 'Njëg li gën a kawe' : 'Prix décroissant'}</option>
                <option value="rating">{isWo ? 'Mieux notés' : 'Meilleures notes'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
