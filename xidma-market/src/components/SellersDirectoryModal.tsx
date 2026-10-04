import React, { useState } from 'react';
import { X, Search, CheckCircle2, Star, MapPin, MessageCircle, Store, Award } from 'lucide-react';
import { Language, Seller } from '../types/marketplace';

interface SellersDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  sellers: Seller[];
  onSelectSellerFilter?: (sellerName: string) => void;
  onSelectSellerShop?: (seller: Seller) => void;
}

export const SellersDirectoryModal: React.FC<SellersDirectoryModalProps> = ({
  isOpen,
  onClose,
  lang,
  sellers,
  onSelectSellerFilter,
  onSelectSellerShop,
}) => {
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const isWo = lang === 'wo';

  if (!isOpen) return null;

  const filtered = sellers.filter((seller) => {
    const matchesQuery = 
      seller.name.toLowerCase().includes(query.toLowerCase()) ||
      (seller.dahira && seller.dahira.toLowerCase().includes(query.toLowerCase())) ||
      (seller.badgeTitle && seller.badgeTitle.toLowerCase().includes(query.toLowerCase()));

    if (!matchesQuery) return false;

    if (locationFilter === 'touba') return seller.location.toLowerCase().includes('touba');
    if (locationFilter === 'dakar') return seller.location.toLowerCase().includes('dakar');
    if (locationFilter === 'diaspora') return seller.location.toLowerCase().includes('paris') || seller.location.toLowerCase().includes('york');

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E2DAD0] my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0C2B20] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#1A4A38]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#0C2B20] flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isWo ? 'Këru Liggéeykatu Mouride yi (Annuaire)' : 'Annuaire Officiel des Artisans & Entreprises Mourides'}
              </h2>
              <p className="text-xs text-[#A8C7B9]">
                {isWo 
                  ? 'Jokkoo directement ak boroom atelier yi ci Touba, Ndakaaru ak bitim-réew' 
                  : 'Contactez en direct les maîtres artisans et prestataires certifiés de la confrérie'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A8C7B9] hover:text-white hover:bg-[#164332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-[#F8F6F0] border-b border-[#EAE3D2] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9B91]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isWo ? "Seet tur, dahira walla liggéey..." : "Rechercher par nom, dahira ou savoir-faire..."}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DDD5C5] rounded-lg text-xs outline-none focus:border-[#165B43]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#5C6E64] font-medium hidden sm:inline">
              {isWo ? 'Dëkk :' : 'Zone :'}
            </span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="p-2 bg-white border border-[#DDD5C5] rounded-lg text-xs text-[#2A3B31] outline-none"
            >
              <option value="all">{isWo ? 'Bérab yépp' : 'Toutes les zones'}</option>
              <option value="touba">Touba & Mbacké</option>
              <option value="dakar">Dakar & Environs</option>
              <option value="diaspora">Diaspora (France, USA)</option>
            </select>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto grid sm:grid-cols-2 gap-4">
          {filtered.map((seller) => {
            const whatsappUrl = `https://wa.me/${seller.phoneWhatsApp.replace('+', '')}?text=${encodeURIComponent(
              `As-salamu alaykum Serigne bi, je vous contacte depuis Xidma Market concernant vos créations et services.`
            )}`;

            return (
              <div
                key={seller.id}
                className="p-4 rounded-xl border border-[#EDE7D9] bg-[#FAF8F3] hover:border-[#165B43] hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-[#D5CDBC] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#1C2C22] truncate">
                        {seller.name}
                      </h4>
                      {seller.isVerified && (
                        <span title="Vérifié Xidma" className="inline-flex">
                          <CheckCircle2 className="w-4 h-4 text-[#165B43] shrink-0" />
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#8C6407] font-semibold flex items-center gap-1 mt-0.5">
                      <Award className="w-3 h-3 text-[#D4AF37]" />
                      <span>{seller.badgeTitle}</span>
                    </div>

                    <p className="text-[11px] text-[#5C6E64] flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#94A79D] shrink-0" />
                      <span className="truncate">{seller.location}</span>
                    </p>

                    {seller.dahira && (
                      <p className="text-[10px] text-[#6E7F75] italic mt-0.5 truncate">
                        {seller.dahira}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDE7D9] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#6C5B32]">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{seller.rating.toFixed(2)}</span>
                    <span className="font-normal text-[10px] text-[#889B90]">
                      ({seller.reviewsCount} {isWo ? 'seede' : 'commandes'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onSelectSellerShop && (
                      <button
                        onClick={() => {
                          onSelectSellerShop(seller);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-[#FAF8F3] border border-[#DDD5C5] text-[#165B43] rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                      >
                        {isWo ? 'Boutique' : 'Boutique'}
                      </button>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F6F0] border-t border-[#EAE3D2] text-center text-xs text-[#5C6E64]">
          {isWo 
            ? 'Yaa ngi bëgg bokk ci boroom liggéey yi ? Bànkal sa liggéey ci tombol bi ci kow.' 
            : 'Vous êtes artisan ou entrepreneur mouride ? Publiez vos offres pour rejoindre cet annuaire.'}
        </div>
      </div>
    </div>
  );
};
