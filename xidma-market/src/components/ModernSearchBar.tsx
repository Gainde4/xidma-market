import React from 'react';
import { Search, SlidersHorizontal, X, Sparkles, Truck, Check } from 'lucide-react';
import { Language } from '../types/marketplace';

interface ModernSearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  lang: Language;
  onlyArtisanal: boolean;
  onToggleArtisanal: () => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
  onOpenFilterModal?: () => void;
}

export const ModernSearchBar: React.FC<ModernSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  lang,
  onlyArtisanal,
  onToggleArtisanal,
  selectedRegion,
  onSelectRegion,
  onOpenFilterModal,
}) => {
  const isWo = lang === 'wo';

  const filterChips = [
    { id: 'all', labelFr: 'Tous les produits', labelWo: 'Lépp' },
    { id: 'touba', labelFr: 'Origine Touba', labelWo: 'Touba' },
    { id: 'dakar', labelFr: 'Dakar & Thiès', labelWo: 'Ndakaaru' },
    { id: 'diaspora', labelFr: 'Diaspora (France, USA)', labelWo: 'Bitim-réew' },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Modern Pill Search Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#8A9B91] pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={isWo ? "Ban liggéey nga bëgg jënd tey ? (Kàfe Touba, boubou, kuruus...)" : "Que souhaitez-vous commander ? (Café Touba, boubou, kourouss...)"}
          className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#E5E9E2] rounded-2xl text-sm text-[#1C2C22] placeholder-[#8A9B91] shadow-xs focus:border-[#165B43] focus:ring-2 focus:ring-[#165B43]/10 outline-none transition-all"
        />

        {searchQuery ? (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 p-1 rounded-full text-[#8A9B91] hover:text-[#1C2C22] hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onOpenFilterModal}
            className="absolute right-3.5 p-2 rounded-xl text-[#165B43] hover:bg-[#165B43]/10 transition-colors cursor-pointer"
            title="Filtres"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Filter Horizontal Scroll Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {filterChips.map((chip) => {
          const isActive = selectedRegion === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onSelectRegion(chip.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                isActive
                  ? 'bg-[#165B43] text-white shadow-xs font-semibold'
                  : 'bg-white border border-[#E5E9E2] text-[#5C6E64] hover:bg-[#F3F6F1]'
              }`}
            >
              {isWo ? chip.labelWo : chip.labelFr}
            </button>
          );
        })}

        {/* Artisanal Toggle Chip */}
        <button
          onClick={onToggleArtisanal}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
            onlyArtisanal
              ? 'bg-[#8C6407] text-white shadow-xs font-semibold'
              : 'bg-white border border-[#E5E9E2] text-[#5C6E64] hover:bg-[#F3F6F1]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{isWo ? 'Ñawu loxo' : '100% Fait Main'}</span>
        </button>
      </div>
    </div>
  );
};
