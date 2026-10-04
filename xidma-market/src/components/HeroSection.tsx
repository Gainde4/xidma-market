import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  Users
} from 'lucide-react';
import { CategoryId, Language } from '../types/marketplace';
import { COMMUNITY_STATS } from '../data/mockData';

interface HeroSectionProps {
  lang: Language;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenPostListing: () => void;
  onExploreProducts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onSelectCategory,
  onOpenPostListing,
  onExploreProducts,
}) => {
  const isWo = lang === 'wo';

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0C2B20] via-[#10372A] to-[#0A241B] text-white pt-8 pb-14 border-b border-[#1D4A39]">
      {/* Decorative geometric background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="islamic-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#islamic-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cultural badge - quiet metadata style */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              <span>
                {isWo ? 'Xidma & Liggéey ci barké Khadimou Rassoul' : 'La plateforme de commerce & d’entraide Mouride'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-poppins">
              {isWo ? (
                <>
                  Liggéey ci jamu Yàlla la bokk. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#E6C665]">
                    Savoir-faire Mouride bi fépp ci àdduna.
                  </span>
                </>
              ) : (
                <>
                  Le Savoir-Faire Mouride, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#E6C665]">
                    au service de l’Excellence & de la Solidarité.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#C8DFD4] leading-relaxed max-w-2xl font-light">
              {isWo
                ? "Dajale mbooleem yaxantokat, boroom liggéey yu xereñ ci Touba, Ndakaaru ak bitim-réew. Jënd ak jaay ci kóolute, barkel sa alal te dooleel sunu kom-kom."
                : "Fédérez les artisans, coopératives agricoles, créateurs et prestataires de la communauté mouride. Achetez en circuit court, soutenez l’économie locale et connectez la diaspora aux richesses de Touba et du Sénégal."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0C2B20] font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>{isWo ? 'Xool mbooleem liggéey yi' : 'Explorer le Marché'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPostListing}
                className="px-5 py-3 bg-[#165B43]/80 hover:bg-[#165B43] border border-[#2B7A5D] text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{isWo ? 'Doli sa këru liggéey' : 'Devenir Vendeur / Prestataire'}</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-[#164332] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#A8C7B9]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isWo ? 'Yaxanto gu jub te sell' : 'Commerçants vérifiés & fidèles'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{isWo ? 'WhatsApp direct & Wave' : 'Contact WhatsApp direct'}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Compass className="w-4 h-4 text-[#E6D5AC] shrink-0" />
                <span>{isWo ? 'Touba, Dakar & Diaspora' : 'Livraison Sénégal & Diaspora'}</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box: Authentic Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#123B2C]/90 border border-[#225642] rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E4E3C]">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37]">
                    {isWo ? 'Teranga & Berndé' : 'Édition Magal & Teranga'}
                  </span>
                  <h2 className="text-base font-bold text-white mt-0.5">
                    {isWo ? 'Café Touba & Produits du Baol' : 'Pack Terroir & Café Touba'}
                  </h2>
                </div>
                <div className="px-2.5 py-1 bg-[#1A4C39] border border-[#2E6F54] rounded text-[11px] text-[#A8C7B9]">
                  100% Artisanal
                </div>
              </div>

              <div className="py-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80"
                    alt="Café Touba"
                    className="w-16 h-16 rounded-lg object-cover border border-[#225642]"
                  />
                  <div className="text-xs">
                    <p className="text-white font-semibold">Café Touba Royal & Djar Pur</p>
                    <p className="text-[#A8C7B9] text-[11px]">Torréfié au feu de bois à Touba 28</p>
                    <p className="text-[#D4AF37] font-bold mt-1">3 500 FCFA <span className="text-[10px] text-[#A8C7B9] font-normal">/ 500g</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1584447141399-be2c178221a7?auto=format&fit=crop&w=150&q=80"
                    alt="Kourouss en ébène"
                    className="w-16 h-16 rounded-lg object-cover border border-[#225642]"
                  />
                  <div className="text-xs">
                    <p className="text-white font-semibold">Kourouss 100 grains Ébène Royal</p>
                    <p className="text-[#A8C7B9] text-[11px]">Sculpté main à Darou Khoudoss</p>
                    <p className="text-[#D4AF37] font-bold mt-1">18 000 FCFA</p>
                  </div>
                </div>
              </div>

              {/* Fast category shortcuts */}
              <div className="pt-3 border-t border-[#1E4E3C]">
                <p className="text-[11px] text-[#A8C7B9] mb-2 font-medium">
                  {isWo ? 'Fàcc yépp :' : 'Accès rapide aux filières :'}
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <button
                    onClick={() => onSelectCategory('terroir')}
                    className="px-2.5 py-1 bg-[#1A4C39] hover:bg-[#25634B] text-[#E6D5AC] rounded text-xs transition-colors cursor-pointer"
                  >
                    ☕ {isWo ? 'Kàfe Touba' : 'Café Touba'}
                  </button>
                  <button
                    onClick={() => onSelectCategory('mode')}
                    className="px-2.5 py-1 bg-[#1A4C39] hover:bg-[#25634B] text-[#E6D5AC] rounded text-xs transition-colors cursor-pointer"
                  >
                    ✨ {isWo ? 'Baye Lahat' : 'Boubous & Baye Lahat'}
                  </button>
                  <button
                    onClick={() => onSelectCategory('edition')}
                    className="px-2.5 py-1 bg-[#1A4C39] hover:bg-[#25634B] text-[#E6D5AC] rounded text-xs transition-colors cursor-pointer"
                  >
                    📖 {isWo ? 'Xassaïd' : 'Khassaïdes'}
                  </button>
                  <button
                    onClick={() => onSelectCategory('services')}
                    className="px-2.5 py-1 bg-[#1A4C39] hover:bg-[#25634B] text-[#E6D5AC] rounded text-xs transition-colors cursor-pointer"
                  >
                    ✈️ {isWo ? 'Fret & BTP' : 'Fret & BTP'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 pt-8 border-t border-[#184634] grid grid-cols-2 sm:grid-cols-4 gap-4">
          {COMMUNITY_STATS.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] font-poppins">
                {stat.number}
              </div>
              <div className="text-xs text-[#A8C7B9] mt-0.5">
                {isWo ? stat.labelWo : stat.labelFr}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
