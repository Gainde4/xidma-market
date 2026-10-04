import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  Store,
  ChevronRight
} from 'lucide-react';
import { Currency, Language, Product, Seller } from '../types/marketplace';
import { formatCurrency, buildWhatsAppOrderMessage } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  lang: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenSellerShop?: (seller: Seller) => void;
  recommendedProducts?: Product[];
  onSelectRecommended?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  lang,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onOpenSellerShop,
  recommendedProducts = [],
  onSelectRecommended,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const isWo = lang === 'wo';
  const whatsappUrl = `https://wa.me/${product.seller.phoneWhatsApp.replace('+', '')}?text=${buildWhatsAppOrderMessage(product, lang, undefined, quantity)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Découvrez "${product.title}" sur Xidma Market, le marché communautaire mouride.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E2DAD0] my-4 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar matching Image 4 ("< Details [Share] [Heart]") */}
        <div className="p-4 flex items-center justify-between border-b border-[#F0F4ED] bg-white sticky top-0 z-20">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F3F6F1] text-[#2A3B31] transition-colors cursor-pointer"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-base font-bold text-[#1C2C22]">
            {isWo ? 'Détails Liggéey bi' : 'Détails du Produit'}
          </h2>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#F3F6F1] text-[#5C6E64] transition-colors cursor-pointer"
              title="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`p-2 rounded-full hover:bg-[#F3F6F1] transition-colors cursor-pointer ${
                isFavorite ? 'text-[#E04F34]' : 'text-[#5C6E64]'
              }`}
              title="Favoris"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Scrollable Product Details Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Large Centered Image matching Image 4 */}
          <div className="aspect-4/3 w-full bg-[#FAFBF9] rounded-2xl flex items-center justify-center p-4 border border-[#E9EFE7] relative">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />

            {product.isArtisanal && (
              <span className="absolute top-3 left-3 bg-[#FAF3E0] text-[#8C6407] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>100% Artisanal Touba</span>
              </span>
            )}
          </div>

          {/* Thumbnail list if multiple */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white cursor-pointer ${
                    selectedImage === idx ? 'border-[#00A86B]' : 'border-[#E9EFE7] opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Price Header matching Image 4 */}
          <div className="flex items-start justify-between gap-4 pt-1">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#1C2C22] leading-snug">
                {isWo ? (product.titleWo || product.title) : product.title}
              </h3>
              <p className="text-xs text-[#6E7F75]">
                {product.specifications?.['Poids net'] || product.subCategory} · {product.origin}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-lg sm:text-xl font-extrabold text-[#00A86B]">
                {formatCurrency(product.priceXOF * quantity, currency)}
              </div>
              <div className="text-[11px] font-bold text-[#00A86B] mt-0.5">
                {product.inStock ? (isWo ? 'Am na ci stock' : 'In Stock') : (isWo ? 'Jeex na' : 'Rupture')}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#4A5D53] leading-relaxed">
            {isWo ? product.descriptionWo : product.description}
          </p>

          {/* Seller Store Mini Card matching Image 4 (e.g. "[Logo] Lulu Hypermarket") */}
          <div 
            onClick={() => {
              if (onOpenSellerShop) {
                onOpenSellerShop(product.seller);
                onClose();
              }
            }}
            className="p-3 bg-[#F8FAF7] hover:bg-[#F0F5EE] rounded-2xl border border-[#E2EBE0] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D5E0D2] bg-white shrink-0">
                <img src={product.seller.avatar} alt={product.seller.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1C2C22]">{product.seller.name}</span>
                  {product.seller.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B]" />
                  )}
                </div>
                <p className="text-[11px] text-[#6E7F75]">{product.seller.dahira || product.seller.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-[#00A86B]">
              <span>{isWo ? 'Boutique' : 'Visiter'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Specifications matching Image 4 ("Brand Name - Japani Fruit, Quantity - 4 Pcs, Weight - 2kg") */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#E9EFE7] space-y-2 text-xs">
            <h4 className="font-bold text-[#1C2C22]">
              {isWo ? 'Màngat bi :' : 'Spécifications & Authenticité :'}
            </h4>
            <div className="space-y-1.5 text-[#5C6E64]">
              <div className="flex justify-between">
                <span>Atelier / Vendeur :</span>
                <span className="font-medium text-[#1C2C22]">{product.seller.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Origine :</span>
                <span className="font-medium text-[#1C2C22]">{product.origin}</span>
              </div>
              {product.specifications && Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span>{k} :</span>
                  <span className="font-medium text-[#1C2C22]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* "People also Ordered" / Recommandations matching Image 4 */}
          {recommendedProducts.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1C2C22] uppercase tracking-wide">
                  {isWo ? 'Liggéey yi nu boole di jënd :' : 'Fréquemment commandés ensemble :'}
                </h4>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {recommendedProducts.slice(0, 4).map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onSelectRecommended && onSelectRecommended(rec)}
                    className="w-36 shrink-0 bg-[#FBFDFB] p-2.5 rounded-2xl border border-[#E9EFE7] flex flex-col justify-between cursor-pointer hover:border-[#00A86B] transition-colors"
                  >
                    <div className="aspect-square rounded-xl bg-white flex items-center justify-center p-1 mb-2">
                      <img src={rec.images[0]} alt={rec.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="text-[11px] font-bold text-[#00A86B]">
                      {formatCurrency(rec.priceXOF, currency)}
                    </div>
                    <div className="text-xs font-bold text-[#1C2C22] truncate">
                      {rec.title}
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(rec, 1);
                        }}
                        className="w-7 h-7 rounded-full bg-[#00A86B] text-white flex items-center justify-center shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Checkout Bar matching Image 4 */}
        <div className="p-4 bg-white border-t border-[#F0F4ED] flex items-center gap-3 sticky bottom-0 z-20">
          {/* Stepper with Trash/Minus and Plus */}
          <div className="flex items-center border border-[#DDD5C5] rounded-2xl bg-[#FAFBF9] px-2 py-1.5 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-[#5C6E64] hover:text-[#C85A32] cursor-pointer"
            >
              {quantity === 1 ? <Trash2 className="w-4 h-4 text-[#C85A32]" /> : <Minus className="w-4 h-4" />}
            </button>
            <span className="w-8 text-center text-xs font-extrabold text-[#1C2C22]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-[#5C6E64] hover:text-[#00A86B] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Big Green Action Button matching Image 4 */}
          <button
            onClick={() => {
              onAddToCart(product, quantity);
              onClose();
            }}
            className="flex-1 py-3.5 px-4 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isWo ? 'Doli ci Pos bi' : 'Ajouter au Panier'} · {formatCurrency(product.priceXOF * quantity, currency)}
            </span>
          </button>

          {/* Quick WhatsApp Contact Icon */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-2xl shadow-md flex items-center justify-center shrink-0 cursor-pointer"
            title="Commander directement sur WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
