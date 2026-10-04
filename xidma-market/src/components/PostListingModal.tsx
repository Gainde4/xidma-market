import React, { useState } from 'react';
import { X, Plus, Sparkles, Image as ImageIcon, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { CategoryId, Language, Product, Seller } from '../types/marketplace';

interface PostListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddProduct: (newProduct: Product) => void;
}

const PRESET_IMAGES = [
  { label: 'Café Touba & Torréfaction', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Boubou & Tenue Mouride', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kourouss & Artisanat Bois', url: 'https://images.unsplash.com/photo-1584447141399-be2c178221a7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Khassaïdes & Calligraphie', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Céréales & Terroir Baol', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fret, Transport & BTP', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' }
];

export const PostListingModal: React.FC<PostListingModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAddProduct,
}) => {
  const isWo = lang === 'wo';

  const [isService, setIsService] = useState(false);
  const [title, setTitle] = useState('');
  const [titleWo, setTitleWo] = useState('');
  const [category, setCategory] = useState<CategoryId>('terroir');
  const [subCategory, setSubCategory] = useState('');
  const [priceXOF, setPriceXOF] = useState('');
  const [origin, setOrigin] = useState('Touba (Quartier 28)');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [dahira, setDahira] = useState('');
  const [phoneWhatsApp, setPhoneWhatsApp] = useState('+221 ');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !priceXOF || !sellerName || !phoneWhatsApp) return;

    const newSeller: Seller = {
      id: `seller-${Date.now()}`,
      name: sellerName,
      dahira: dahira || 'Dahira Xidma Touba',
      location: origin,
      rating: 5.0,
      reviewsCount: 1,
      phoneWhatsApp: phoneWhatsApp.trim(),
      isVerified: true,
      memberSince: '2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badgeTitle: isService ? 'Prestataire Xidma' : 'Artisan / Producteur Mouride'
    };

    const finalImage = customImageUrl.trim() || imageUrl;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: title.trim(),
      titleWo: titleWo.trim() || title.trim(),
      description: description.trim() || 'Produit artisanal de grande qualité façonné dans le respect de la tradition.',
      descriptionWo: titleWo.trim() || 'Liggéey bu rafet te sell.',
      priceXOF: parseInt(priceXOF, 10) || 5000,
      category: category,
      subCategory: subCategory || (category === 'terroir' ? 'Terroir & Épicerie' : 'Artisanat local'),
      images: [finalImage],
      seller: newSeller,
      inStock: true,
      stockCount: 10,
      isArtisanal: true,
      origin: origin,
      rating: 5.0,
      reviewsCount: 1,
      tags: ['Mouride', origin, 'Xidma'],
      specifications: {
        'Origine': origin,
        'Fabrication': '100% Locale / Fait main',
        'Vendeur': sellerName
      },
      isService: isService
    };

    onAddProduct(newProduct);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2DAD0] my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0C2B20] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#1A4A38]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-[#0C2B20] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isWo ? 'Bànk sa Liggéey ci Xidma Market' : 'Publier une Offre ou un Service'}
              </h2>
              <p className="text-xs text-[#A8C7B9]">
                {isWo ? 'Wone sa savoir-faire te jokkoo ak mbooleem talibe yi' : 'Valorisez votre travail et connectez-vous directement aux acheteurs'}
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

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#165B43]/10 text-[#165B43] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#1C2C22]">
              {isWo ? 'Jërëjëf ! Sa liggéey sàmp nañu ko !' : 'Alhamdulillah ! Votre annonce a été publiée avec succès !'}
            </h3>
            <p className="text-sm text-[#5C6E64] max-w-md mx-auto">
              {isWo 
                ? 'Liggéey bi feeñ na léegi ci marché bi. Talibe yépp mën nañu la jokkoo ci WhatsApp.' 
                : 'Votre produit est désormais en ligne et visible par tous les membres de la communauté.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Offer Type selector */}
            <div className="flex rounded-lg bg-[#F5F2EB] p-1 border border-[#E5DFD2] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsService(false)}
                className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
                  !isService ? 'bg-white text-[#165B43] shadow-xs' : 'text-[#6E7F75]'
                }`}
              >
                📦 {isWo ? 'Produit physique (Jaay)' : 'Produit physique (Artisanat, Terroir, Boubou...)'}
              </button>
              <button
                type="button"
                onClick={() => setIsService(true)}
                className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
                  isService ? 'bg-white text-[#165B43] shadow-xs' : 'text-[#6E7F75]'
                }`}
              >
                🛠️ {isWo ? 'Prestation & Service (BTP, Fret...)' : 'Service (Fret Diaspora, BTP, Traiteur...)'}
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Turu liggéey bi walla produit bi *' : 'Titre du produit ou service *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isService ? "Ex: Service Fret Aérien Paris-Touba / Dakar" : "Ex: Café Touba Moulu Pur Djar 1kg"}
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] focus:ring-1 focus:ring-[#165B43] outline-none"
              />
            </div>

            {/* Wolof Title (optional) */}
            <div>
              <label className="block text-xs font-medium text-[#5C6E64] mb-1">
                {isWo ? 'Turu liggéey bi ci Wolof (Su la neexee)' : 'Titre en Wolof (Optionnel)'}
              </label>
              <input
                type="text"
                value={titleWo}
                onChange={(e) => setTitleWo(e.target.value)}
                placeholder="Ex: Kàfe Touba gu dëggu..."
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>

            {/* Category & Subcategory */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                  {isWo ? 'Fàcc bi (Catégorie) *' : 'Catégorie principale *'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryId)}
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg bg-white focus:border-[#165B43] outline-none"
                >
                  <option value="terroir">☕ Café Touba & Terroir Baol</option>
                  <option value="mode">✨ Mode, Boubous & Baye Lahat</option>
                  <option value="artisanat">🪵 Artisanat Sacré & Kourouss</option>
                  <option value="edition">📖 Khassaïdes & Calligraphie</option>
                  <option value="services">🚚 Services, BTP & Fret Diaspora</option>
                  <option value="bernde">🤝 Espace Berndé & Événements</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                  {isWo ? 'Sous-catégorie' : 'Sous-catégorie'}
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="Ex: Torréfaction artisanale / Ébénisterie"
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                />
              </div>
            </div>

            {/* Price & Location */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                  {isWo ? 'Njëg li (ci FCFA) *' : 'Prix indicatif (en FCFA) *'}
                </label>
                <input
                  type="number"
                  required
                  min="500"
                  step="500"
                  value={priceXOF}
                  onChange={(e) => setPriceXOF(e.target.value)}
                  placeholder="Ex: 5000"
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none font-bold text-[#165B43]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                  {isWo ? 'Dëkk / Bérab *' : 'Localisation / Ville *'}
                </label>
                <input
                  type="text"
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Ex: Touba 28 / Dakar Sandaga / Paris"
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                />
              </div>
            </div>

            {/* Seller info & WhatsApp Contact */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                  {isWo ? 'Sa Tur / Atelier *' : 'Nom de l’artisan / Vendeur *'}
                </label>
                <input
                  type="text"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Ex: Serigne Cheikh Ndiaye"
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5C6E64] mb-1">
                  {isWo ? 'Dahira / Koureel' : 'Dahira ou Koureel'}
                </label>
                <input
                  type="text"
                  value={dahira}
                  onChange={(e) => setDahira(e.target.value)}
                  placeholder="Ex: Dahira Rawdu Rayahin"
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                  {isWo ? 'Numéro WhatsApp *' : 'Numéro WhatsApp de contact *'}
                </label>
                <input
                  type="text"
                  required
                  value={phoneWhatsApp}
                  onChange={(e) => setPhoneWhatsApp(e.target.value)}
                  placeholder="+221 77 000 00 00"
                  className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Faramfacce bi (Description)' : 'Description détaillée'}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détaillez votre savoir-faire, les matériaux utilisés, les délais de livraison ou les spécificités de votre travail..."
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none resize-none"
              />
            </div>

            {/* Photo Selection */}
            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Tànn nataal bu rafet :' : 'Choisir une photo représentative :'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setCustomImageUrl('');
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 relative cursor-pointer ${
                      imageUrl === preset.url && !customImageUrl ? 'border-[#165B43] ring-1 ring-[#165B43]' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder={isWo ? "Walla doli lien nataal (URL image)..." : "Ou collez le lien direct d'une photo (URL)..."}
                className="w-full px-3 py-1.5 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-3 border-t border-[#EAE3D2] flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#5C6E64] hover:bg-[#F5F2EB] rounded-lg cursor-pointer"
              >
                {isWo ? 'Bàyyi ko' : 'Annuler'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isWo ? 'Bànk ko léegi' : 'Publier mon offre'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
