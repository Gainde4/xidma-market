import React from 'react';
import { Home, Store, Search, Package, ShoppingBag } from 'lucide-react';
import { Language } from '../types/marketplace';

interface MobileBottomNavProps {
  currentView: 'marketplace' | 'vendor';
  onNavigateHome: () => void;
  onNavigateStores: () => void;
  onNavigateSearch: () => void;
  onNavigateVendor: () => void;
  onOpenCart: () => void;
  cartCount: number;
  lang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigateHome,
  onNavigateStores,
  onNavigateSearch,
  onNavigateVendor,
  onOpenCart,
  cartCount,
  lang,
}) => {
  const isWo = lang === 'wo';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5EAE2] shadow-lg py-2 px-4">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home */}
        <button
          onClick={onNavigateHome}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentView === 'marketplace' ? 'text-[#00A86B]' : 'text-[#8A9B91] hover:text-[#1C2C22]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">
            {isWo ? 'Kër' : 'Accueil'}
          </span>
          {currentView === 'marketplace' && (
            <span className="w-1 h-1 rounded-full bg-[#00A86B]" />
          )}
        </button>

        {/* Stores / Boutiques */}
        <button
          onClick={onNavigateStores}
          className="flex flex-col items-center gap-1 text-[#8A9B91] hover:text-[#00A86B] transition-colors cursor-pointer"
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-semibold">
            {isWo ? 'Boutiques' : 'Boutiques'}
          </span>
        </button>

        {/* Search */}
        <button
          onClick={onNavigateSearch}
          className="flex flex-col items-center gap-1 text-[#8A9B91] hover:text-[#00A86B] transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold">
            {isWo ? 'Seet' : 'Explorer'}
          </span>
        </button>

        {/* Vendor Dashboard & Stock */}
        <button
          onClick={onNavigateVendor}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentView === 'vendor' ? 'text-[#00A86B]' : 'text-[#8A9B91] hover:text-[#1C2C22]'
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-bold">
            {isWo ? 'Stock' : 'Stock Vendeur'}
          </span>
          {currentView === 'vendor' && (
            <span className="w-1 h-1 rounded-full bg-[#00A86B]" />
          )}
        </button>

        {/* Cart Bag */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 text-[#8A9B91] hover:text-[#00A86B] transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#E04F34] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">
            {isWo ? 'Pos' : 'Panier'}
          </span>
        </button>
      </div>
    </nav>
  );
};
