import React from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Award,
  Store,
  ExternalLink
} from 'lucide-react';
import { Currency, Language, Product, Seller, ShopProfile } from '../types/marketplace';
import { ProductCard } from './ProductCard';

interface PublicShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller | null;
  shopProfile?: ShopProfile | null;
  products: Product[];
  currency: Currency;
  lang: Language;
  onAddToCart: (p: Product) => void;
  onOpenProductDetails: (p: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const PublicShopModal: React.FC<PublicShopModalProps> = ({
  isOpen,
  onClose,
  seller,
  shopProfile,
  products,
  currency,
  lang,
  onAddToCart,
  onOpenProductDetails,
  favorites,
  onToggleFavorite,
}) => {
  if (!isOpen || !seller) return null;

  const isWo = lang === 'wo';
  const shopName = shopProfile?.name || seller.name;
  const bannerImg = shopProfile?.coverBannerUrl || seller.coverBannerUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80';
  const avatarImg = shopProfile?.avatarUrl || seller.avatar;
  const sector = shopProfile?.sector || seller.sector || 'Artisanat & Savoir-Faire Mouride';
  const description = shopProfile?.description || seller.description || 'Artisan et entrepreneur membre de la communauté mouride, engagé dans la sanctification du travail (Xidma).';
  const location = shopProfile?.location || seller.location;
  const dahira = shopProfile?.dahira || seller.dahira;
  const whatsapp = shopProfile?.phoneWhatsApp || seller.phoneWhatsApp;

  const sellerProducts = products.filter(
    (p) => p.seller.id === seller.id || p.seller.name.toLowerCase() === seller.name.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className="relative bg-[#FAF7F2] rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-[#E2DAD0] my-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer shadow-md"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-[#0C2B20] overflow-hidden">
          <img
            src={bannerImg}
            alt="Devanture Boutique"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Seller Info Header */}
        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            {/* Avatar & Main Info */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0">
                <img src={avatarImg} alt={shopName} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C2C22] leading-tight">
                    {shopName}
                  </h2>
                  {seller.isVerified && (
                    <span title="Artisan Mouride Vérifié" className="inline-flex">
                      <CheckCircle2 className="w-5 h-5 text-[#165B43] shrink-0" />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C6E64]">
                  <span className="font-semibold text-[#8C6407]">{sector}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#94A79D]" />
                    {location}
                  </span>
                  {dahira && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#165B43] font-medium">{dahira}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${whatsapp.replace('+', '')}?text=${encodeURIComponent(
                `As-salamu alaykum ${shopName}, je découvre votre boutique sur Xidma Market.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isWo ? 'Jokkoo ci WhatsApp' : 'Contacter la Boutique'}</span>
            </a>
          </div>

          {/* Description & Story */}
          <div className="mt-5 p-4 bg-white rounded-xl border border-[#EDE7D9] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A5D53]">
              {isWo ? 'Mbóot ak liggéeyu Këru Liggéey bi :' : 'À propos de notre Atelier & Savoir-faire :'}
            </h3>
            <p className="text-xs sm:text-sm text-[#3E4E45] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Products from this shop */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0D7C6] pb-2">
              <div>
                <h3 className="text-base font-bold text-[#1C2C22] flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#165B43]" />
                  <span>{isWo ? 'Liggéey yi am ci Këru Liggéey bi' : 'Catalogue & Produits en Stock'}</span>
                </h3>
                <p className="text-xs text-[#6E7F75]">
                  {sellerProducts.length} {isWo ? 'liggéey disponibël' : (sellerProducts.length > 1 ? 'articles disponibles' : 'article disponible')}
                </p>
              </div>
            </div>

            {sellerProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-[#EDE7D9] p-6">
                <p className="text-xs text-[#6E7F75]">
                  {isWo ? 'Amul dara ci stock bi ba tey.' : 'Cette boutique est en train de réapprovisionner ses stocks.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellerProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    lang={lang}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onAddToCart={onAddToCart}
                    onOpenDetails={onOpenProductDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
