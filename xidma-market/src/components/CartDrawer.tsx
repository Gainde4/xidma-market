import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle, 
  MapPin, 
  Truck,
  ArrowRight
} from 'lucide-react';
import { CartItem, Currency, Language } from '../types/marketplace';
import { formatCurrency, buildWhatsAppCartCheckout } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: Currency;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  lang,
}) => {
  const isWo = lang === 'wo';

  const [deliveryZone, setDeliveryZone] = useState('dakar');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const DELIVERY_RATES: Record<string, { labelFr: string; labelWo: string; priceXOF: number }> = {
    touba_pickup: { labelFr: 'Retrait sur place à Touba (Gratuit)', labelWo: 'Jëli ko Touba (Amu ci fay)', priceXOF: 0 },
    touba_local: { labelFr: 'Livraison Touba ville & environs (+1 000 FCFA)', labelWo: 'Yóbbu ko Touba (+1 000 FCFA)', priceXOF: 1000 },
    dakar: { labelFr: 'Livraison Dakar Express (+2 500 FCFA)', labelWo: 'Ndakaaru gaaw (+2 500 FCFA)', priceXOF: 2500 },
    regions: { labelFr: 'Autres régions Sénégal (Thiès, Kaolack...) (+3 500 FCFA)', labelWo: 'Yeneen dëkk yi (+3 500 FCFA)', priceXOF: 3500 },
    diaspora: { labelFr: 'Fret International Diaspora (France/USA/Italie) (+15 000 FCFA)', labelWo: 'Bitim-réew / Diaspora (+15 000 FCFA)', priceXOF: 15000 },
  };

  const subtotalXOF = items.reduce((acc, item) => acc + item.product.priceXOF * item.quantity, 0);
  const deliveryCostXOF = DELIVERY_RATES[deliveryZone]?.priceXOF || 0;
  const totalXOF = subtotalXOF + deliveryCostXOF;

  const handleConfirmDirectOrder = () => {
    if (items.length === 0) return;
    const generatedId = `XM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onClearCart();
  };

  const currentZone = DELIVERY_RATES[deliveryZone];
  const whatsappUrl = `https://wa.me/221770000000?text=${buildWhatsAppCartCheckout(
    items,
    totalXOF,
    isWo ? currentZone.labelWo : currentZone.labelFr,
    customerName,
    customerPhone,
    deliveryAddress,
    lang
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#0C2B20] text-white flex items-center justify-between border-b border-[#1A4A38]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="text-sm font-bold">
                {isWo ? 'Sa Pos bi (Panier)' : 'Votre Panier Xidma'}
              </h2>
              <span className="text-[11px] text-[#A8C7B9]">
                {items.length} {isWo ? 'liggéey ci pos bi' : (items.length > 1 ? 'articles' : 'article')}
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {orderConfirmed ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#165B43]/10 text-[#165B43] flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1C2C22]">
                {isWo ? 'Jërëjëf ! Commande bi jàll na !' : 'Alhamdulillah ! Commande enregistrée !'}
              </h3>
              <p className="text-xs text-[#5C6E64] max-w-xs mx-auto">
                {isWo
                  ? `Numéro commande bi mooy : ${orderId}. Dinanu la woo léegi ci numéro WhatsApp bi nga bind.`
                  : `Votre numéro de commande est le : ${orderId}. Notre conciergerie ou l'artisan vous contactera directement pour organiser la remise.`}
              </p>
              <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EDE7D9] text-xs font-mono font-bold text-[#165B43]">
                RÉFÉRENCE : {orderId}
              </div>
              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-[#165B43] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {isWo ? 'Delloo ma ci marché bi' : 'Retour au Marché'}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#B5CEBF]" />
              <p className="text-sm font-semibold text-[#3C4D43]">
                {isWo ? 'Sa pos bi dafa amul dara ba tey' : 'Votre panier est vide pour le moment'}
              </p>
              <p className="text-xs text-[#7B8C82]">
                {isWo ? 'Doli ay kàfe, boubou walla kuruus' : 'Découvrez nos produits du terroir, boubous et objets sacrés'}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#165B43] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                {isWo ? 'Seet liggéey yi' : 'Continuer les achats'}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 p-2.5 bg-[#FAF8F3] rounded-xl border border-[#EDE7DA]"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-[#E0D7C6]"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#1C2C22] truncate">
                          {isWo ? (product.titleWo || product.title) : product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[#99A89F] hover:text-[#C85A32] transition-colors p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#6E7F75]">
                        {product.seller.name}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="text-xs font-extrabold text-[#165B43]">
                          {formatCurrency(product.priceXOF * quantity, currency)}
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center border border-[#DDD5C5] rounded bg-white text-xs">
                          <button
                            onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                            className="px-2 py-0.5 hover:bg-[#F5F2EB] text-[#2A3B31]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 hover:bg-[#F5F2EB] text-[#2A3B31]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Zone Selector */}
              <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#EDE7DA] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#1C2C22]">
                  <Truck className="w-4 h-4 text-[#165B43]" />
                  <span>{isWo ? 'Tànn bérab yóbbu ko :' : 'Mode & Zone de livraison :'}</span>
                </div>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value)}
                  className="w-full p-2 bg-white border border-[#DDD5C5] rounded-lg text-xs font-medium text-[#2A3B31] outline-none"
                >
                  {Object.entries(DELIVERY_RATES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {isWo ? val.labelWo : val.labelFr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Info Form */}
              <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#EDE7DA] space-y-2 text-xs">
                <div className="font-bold text-[#1C2C22]">
                  {isWo ? 'Say xibaar ngir livraison bi :' : 'Coordonnées de livraison :'}
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isWo ? "Sa Tur ak Sant" : "Votre Prénom & Nom"}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C5] rounded-lg text-xs outline-none"
                />
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={isWo ? "Numéro WhatsApp / Téléphone" : "Téléphone WhatsApp pour le suivi"}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C5] rounded-lg text-xs outline-none"
                />
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder={isWo ? "Dëkk, Quartier walla Bérab bi" : "Adresse, Ville, Quartier précis"}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C5] rounded-lg text-xs outline-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Summary & Checkout */}
        {items.length > 0 && !orderConfirmed && (
          <div className="p-4 sm:p-5 border-t border-[#EAE3D2] bg-[#FAF8F3] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C6E64]">
              <div className="flex justify-between">
                <span>{isWo ? 'Njëgu liggéey yi :' : 'Sous-total articles :'}</span>
                <span className="font-semibold text-[#1C2C22]">
                  {formatCurrency(subtotalXOF, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isWo ? 'Fay frais livraison :' : 'Frais d’expédition :'}</span>
                <span className="font-semibold text-[#1C2C22]">
                  {deliveryCostXOF === 0 ? (isWo ? 'Amul fay' : 'Gratuit') : formatCurrency(deliveryCostXOF, currency)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#165B43] pt-1.5 border-t border-[#EDE7D9]">
                <span>{isWo ? 'Lépp ak lépp :' : 'Total à régler :'}</span>
                <span className="text-base">{formatCurrency(totalXOF, currency)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-all text-center cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>{isWo ? 'WhatsApp' : 'Via WhatsApp'}</span>
              </a>

              <button
                onClick={handleConfirmDirectOrder}
                className="py-2.5 px-2 bg-[#165B43] hover:bg-[#1D6F53] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>{isWo ? 'Joxe Commande' : 'Valider'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
