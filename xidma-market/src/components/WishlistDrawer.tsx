import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Currency, Language, Product } from '../types/marketplace';
import { formatCurrency } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProducts: Product[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  currency: Currency;
  lang: Language;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favoriteProducts,
  onRemoveFavorite,
  onAddToCart,
  currency,
  lang,
}) => {
  const isWo = lang === 'wo';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0C2B20] text-white flex items-center justify-between border-b border-[#1A4A38]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#C85A32] fill-current" />
            <div>
              <h2 className="text-sm font-bold">
                {isWo ? 'Say Liggéey yu la neex (Favoris)' : 'Vos Coups de Cœur & Favoris'}
              </h2>
              <span className="text-[11px] text-[#A8C7B9]">
                {favoriteProducts.length} {isWo ? 'liggéey denc' : (favoriteProducts.length > 1 ? 'articles enregistrés' : 'article enregistré')}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A8C7B9] hover:text-white hover:bg-[#164332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-[#D5CDBC]" />
              <p className="text-sm font-semibold text-[#3C4D43]">
                {isWo ? 'Amul dara ci say favoris ba tey' : 'Aucun produit favori pour l’instant'}
              </p>
              <p className="text-xs text-[#7B8C82]">
                {isWo ? 'Bës ci xol bi ci kow produit bi nga bëgg denc' : 'Cliquez sur l’icône cœur pour sauvegarder vos articles préférés'}
              </p>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-[#FAF8F3] rounded-xl border border-[#EDE7DA] items-center justify-between"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-[#E0D7C6]"
                />
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-xs font-bold text-[#1C2C22] truncate">
                    {isWo ? (product.titleWo || product.title) : product.title}
                  </h4>
                  <div className="text-[11px] text-[#6E7F75]">{product.seller.name}</div>
                  <div className="text-xs font-extrabold text-[#165B43] mt-0.5">
                    {formatCurrency(product.priceXOF, currency)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFavorite(product.id);
                    }}
                    className="p-2 rounded-lg bg-[#165B43] hover:bg-[#1D6F53] text-white transition-colors cursor-pointer"
                    title={isWo ? 'Doli ci pos bi' : 'Ajouter au panier'}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(product.id)}
                    className="p-2 rounded-lg text-[#99A89F] hover:text-[#C85A32] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F3] border-t border-[#EAE3D2] text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#165B43] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            {isWo ? 'Tëj ko' : 'Fermer'}
          </button>
        </div>
      </div>
    </div>
  );
};
