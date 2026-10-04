import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Plus, 
  Globe, 
  Menu, 
  X, 
  Store,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  Bell,
  MapPin
} from 'lucide-react';
import { Currency, Language } from '../types/marketplace';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenPostListing: () => void;
  onOpenDirectory: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentView: 'marketplace' | 'vendor';
  onNavigateToVendor: () => void;
  onNavigateToMarketplace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  currency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenPostListing,
  onOpenDirectory,
  searchQuery,
  onSearchChange,
  currentView,
  onNavigateToVendor,
  onNavigateToMarketplace,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('Touba, Sénégal');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const isWo = lang === 'wo';

  const locations = [
    'Touba (Quartier 28 & Ocass)',
    'Touba (Darou Marnane)',
    'Dakar (Sandaga & Sacré-Cœur)',
    'Thiès & Mbacké',
    'Diaspora (Paris, France)',
    'Diaspora (New York, USA)',
    'Diaspora (Brescia / Milan)',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8ECE5] shadow-xs">
      {/* Top Bar matching screenshot ("Muhammad Farhan - Dubai, UAE ⌵" + Bag & Bell icons) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: User Profile & Location matching screenshot */}
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer" onClick={onNavigateToVendor} title="Mon profil vendeur">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Cheikh Tacko Niang"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#00A86B]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A86B] border-2 border-white rounded-full" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-[#1C2C22] truncate">
                Cheikh Tacko Niang
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0 fill-[#00A86B] text-white" />
            </div>

            {/* Location selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1 text-[11px] text-[#6E7F75] hover:text-[#00A86B] transition-colors cursor-pointer truncate"
              >
                <MapPin className="w-3 h-3 text-[#00A86B] shrink-0" />
                <span className="truncate max-w-[140px] sm:max-w-none">{userLocation}</span>
                <ChevronDown className="w-3 h-3 text-[#94A79D]" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-[#E5E9E2] rounded-xl shadow-lg z-50 p-1.5 text-xs animate-in fade-in">
                  <div className="px-2 py-1 text-[10px] font-bold text-[#8A9B91] uppercase">
                    {isWo ? 'Tànn sa dëkk :' : 'Changer de zone :'}
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setUserLocation(loc);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        userLocation === loc ? 'bg-[#00A86B]/10 text-[#00A86B] font-bold' : 'hover:bg-[#F3F6F1] text-[#33463B]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Brand Name (desktop) */}
        <div 
          onClick={onNavigateToMarketplace}
          className="hidden md:flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#00A86B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            XM
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#1C2C22] font-poppins">
            XIDMA<span className="text-[#00A86B] font-extrabold ml-0.5">MARKET</span>
          </span>
        </div>

        {/* Right Controls: Bag, Notifications, Language, Currency matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Espace Vendeur quick access */}
          {currentView === 'marketplace' ? (
            <button
              onClick={onNavigateToVendor}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F5EE] hover:bg-[#E2EBE0] text-[#00A86B] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              title="Gérer mon stock et ma boutique"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{isWo ? 'Sama Stock' : 'Espace Vendeur'}</span>
            </button>
          ) : (
            <button
              onClick={onNavigateToMarketplace}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#00A86B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>{isWo ? 'Marché' : 'Vue Acheteur'}</span>
            </button>
          )}

          {/* Currency Pill */}
          <div className="flex items-center bg-[#F4F6F2] rounded-xl p-0.5 text-xs font-semibold">
            {(['XOF', 'EUR', 'USD'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => onCurrencyChange(curr)}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  currency === curr
                    ? 'bg-white text-[#00A86B] shadow-xs font-bold'
                    : 'text-[#6E7F75] hover:text-[#1C2C22]'
                }`}
              >
                {curr === 'XOF' ? 'FCFA' : curr}
              </button>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(lang === 'fr' ? 'wo' : 'fr')}
            className="px-2.5 py-1.5 bg-[#F4F6F2] hover:bg-[#EAEFE8] text-[#1C2C22] text-xs font-bold rounded-xl transition-colors cursor-pointer"
            title="Changer de langue"
          >
            {isWo ? 'WO' : 'FR'}
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-xl text-[#5C6E64] hover:text-[#E04F34] hover:bg-[#F4F6F2] transition-colors cursor-pointer"
            aria-label="Favoris"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-[#E04F34]" />
            )}
          </button>

          {/* Cart Bag Icon with badge matching screenshot */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-[#F0F5EE] text-[#00A86B] hover:bg-[#E2EBE0] transition-colors cursor-pointer"
            aria-label="Panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E04F34] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
