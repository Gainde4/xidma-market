import React from 'react';
import { 
  Heart, 
  Plus, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Truck,
  Sparkles,
  Check
} from 'lucide-react';
import { Currency, Language, Product, Seller } from '../types/marketplace';
import { formatCurrency } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onOpenSellerShop?: (seller: Seller) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  lang,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenDetails,
  onOpenSellerShop,
}) => {
  const isWo = lang === 'wo';

  return (
    <article 
      onClick={() => onOpenDetails(product)}
      className="group relative bg-white rounded-2xl border border-[#E9EFE7] hover:border-[#B5DBC6] hover:shadow-md transition-all duration-200 flex flex-col justify-between p-3 sm:p-3.5 cursor-pointer"
    >
      {/* Top Bar inside Card: Delivery/Origin Tag & Wishlist */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        {/* Soft delivery or artisanal tag */}
        {product.isArtisanal ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8C6407] bg-[#FAF3E0] px-2 py-0.5 rounded-md">
            <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
            <span>{isWo ? 'Loxo' : 'Fait Main'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00A86B] bg-[#E8F8F0] px-2 py-0.5 rounded-md">
            <Truck className="w-2.5 h-2.5" />
            <span>{isWo ? 'Livraison Gaaw' : 'Express'}</span>
          </span>
        )}

        {/* Favorite Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`p-1.5 rounded-full transition-colors ${
            isFavorite
              ? 'text-[#E04F34] bg-rose-50'
              : 'text-[#9BB0A3] hover:text-[#E04F34] hover:bg-slate-50'
          }`}
          aria-label="Favoris"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FBFDFB] flex items-center justify-center p-2 mb-3">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
        />
      </div>

      {/* Card Info Area */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-end">
        {/* Price matching screenshot (e.g. "9.00 AED" in bold green) */}
        <div className="flex items-baseline justify-between">
          <div className="text-sm sm:text-base font-extrabold text-[#00A86B]">
            {formatCurrency(product.priceXOF, currency)}
          </div>
          <div className="text-[10px] text-[#8A9B91]">
            {product.origin.split(' ')[0]}
          </div>
        </div>

        {/* Product Title matching screenshot */}
        <h4 className="text-xs sm:text-sm font-bold text-[#1C2C22] line-clamp-1 group-hover:text-[#00A86B] transition-colors leading-snug">
          {isWo ? (product.titleWo || product.title) : product.title}
        </h4>

        {/* Unit / Weight / Specification Subtext */}
        <div className="flex items-center justify-between text-[11px] text-[#6E7F75] pt-0.5">
          <span className="truncate max-w-[130px]">
            {product.specifications?.['Poids net'] || product.subCategory}
          </span>
        </div>

        {/* Bottom Seller info & Add button matching screenshot */}
        <div className="pt-2 border-t border-[#F2F6F0] flex items-center justify-between gap-1 mt-1">
          <div 
            onClick={(e) => {
              if (onOpenSellerShop) {
                e.stopPropagation();
                onOpenSellerShop(product.seller);
              }
            }}
            className="flex items-center gap-1 truncate text-[11px] text-[#5C6E64] hover:text-[#00A86B] cursor-pointer"
            title={product.seller.name}
          >
            <span className="truncate font-medium">{product.seller.name.split(' ')[0]}</span>
            {product.seller.isVerified && (
              <CheckCircle2 className="w-3 h-3 text-[#00A86B] shrink-0" />
            )}
          </div>

          {/* Prominent Circular Green Plus Button matching screenshot */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-8 h-8 rounded-full bg-[#00A86B] hover:bg-[#008f5a] text-white flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-85 shrink-0 cursor-pointer"
            title={isWo ? "Doli ci pos bi" : "Ajouter au panier"}
            aria-label="Ajouter au panier"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </article>
  );
};
