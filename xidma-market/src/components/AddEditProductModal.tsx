import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, Plus, Check } from 'lucide-react';
import { CategoryId, Language, Product, Seller } from '../types/marketplace';

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSaveProduct: (product: Product) => void;
  productToEdit?: Product | null;
  currentSeller: Seller;
}

const PRESET_STOCK_IMAGES = [
  { label: 'Café Touba Torréfié', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Grains & Poivre Djar', url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80' },
  { label: 'Boubou Bazin Brodé', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Baye Lahat Coton', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kourouss Bois d’Ébène', url: 'https://images.unsplash.com/photo-1584447141399-be2c178221a7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Khassaïdes Cuir Doré', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Huile d’Arachide Baol', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Encens & Bakhour Touba', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pack Berndé Magal', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Miel Pur Baol', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80' }
];

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSaveProduct,
  productToEdit,
  currentSeller,
}) => {
  const isWo = lang === 'wo';

  const [title, setTitle] = useState('');
  const [titleWo, setTitleWo] = useState('');
  const [category, setCategory] = useState<CategoryId>('terroir');
  const [subCategory, setSubCategory] = useState('');
  const [priceXOF, setPriceXOF] = useState('');
  const [stockCount, setStockCount] = useState('20');
  const [origin, setOrigin] = useState(currentSeller.location || 'Touba');
  const [description, setDescription] = useState('');
  const [descriptionWo, setDescriptionWo] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_STOCK_IMAGES[0].url);
  const [isArtisanal, setIsArtisanal] = useState(true);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [specifications, setSpecifications] = useState<Record<string, string>>({
    'Fabrication': 'Artisanale / Fait main',
    'Garantie': 'Qualité certifiée Xidma'
  });

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setTitleWo(productToEdit.titleWo || '');
      setCategory(productToEdit.category);
      setSubCategory(productToEdit.subCategory);
      setPriceXOF(productToEdit.priceXOF.toString());
      setStockCount(productToEdit.stockCount.toString());
      setOrigin(productToEdit.origin);
      setDescription(productToEdit.description);
      setDescriptionWo(productToEdit.descriptionWo || '');
      setImageUrl(productToEdit.images[0] || PRESET_STOCK_IMAGES[0].url);
      setIsArtisanal(productToEdit.isArtisanal);
      setSpecifications(productToEdit.specifications || {});
    } else {
      setTitle('');
      setTitleWo('');
      setCategory('terroir');
      setSubCategory('');
      setPriceXOF('');
      setStockCount('15');
      setOrigin(currentSeller.location || 'Touba');
      setDescription('');
      setDescriptionWo('');
      setImageUrl(PRESET_STOCK_IMAGES[0].url);
      setIsArtisanal(true);
      setSpecifications({
        'Origine': currentSeller.location || 'Touba',
        'Fabrication': 'Artisanale / Fait main'
      });
    }
  }, [productToEdit, currentSeller, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpec = () => {
    if (specKey.trim() && specVal.trim()) {
      setSpecifications((prev) => ({
        ...prev,
        [specKey.trim()]: specVal.trim()
      }));
      setSpecKey('');
      setSpecVal('');
    }
  };

  const handleRemoveSpec = (key: string) => {
    setSpecifications((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !priceXOF) return;

    const parsedPrice = parseInt(priceXOF, 10) || 1000;
    const parsedStock = parseInt(stockCount, 10) || 0;

    const finalProduct: Product = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      title: title.trim(),
      titleWo: titleWo.trim() || title.trim(),
      description: description.trim() || 'Produit de grande qualité confectionné avec dévouement.',
      descriptionWo: descriptionWo.trim() || 'Liggéey bu am solo te rafet.',
      priceXOF: parsedPrice,
      category: category,
      subCategory: subCategory.trim() || (category === 'terroir' ? 'Café & Épicerie' : 'Artisanat'),
      images: [imageUrl],
      seller: productToEdit ? productToEdit.seller : currentSeller,
      inStock: parsedStock > 0,
      stockCount: parsedStock,
      isArtisanal: isArtisanal,
      origin: origin.trim() || currentSeller.location,
      rating: productToEdit ? productToEdit.rating : 5.0,
      reviewsCount: productToEdit ? productToEdit.reviewsCount : 0,
      tags: ['Stock Vendeur', origin, currentSeller.name],
      specifications: specifications,
      isService: category === 'services'
    };

    onSaveProduct(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2DAD0] my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0C2B20] text-white p-5 flex items-center justify-between border-b border-[#1A4A38]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#0C2B20] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {productToEdit
                  ? (isWo ? 'Soppi Liggéey bi ci Stock bi' : 'Modifier le produit dans mon stock')
                  : (isWo ? 'Doli Liggéey bu bees ci sa Stock' : 'Ajouter un nouveau produit dans mon stock')}
              </h2>
              <p className="text-xs text-[#A8C7B9]">
                {currentSeller.name} · {currentSeller.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A8C7B9] hover:text-white hover:bg-[#164332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Photo & Image Section */}
          <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-[#EDE7D9] space-y-3">
            <label className="block text-xs font-bold text-[#1C2C22]">
              {isWo ? 'Nataalu Liggéey bi (Photo du produit)' : 'Photo du produit *'}
            </label>
            
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[#165B43] bg-white shrink-0 shadow-xs relative">
                <img src={imageUrl} alt="Aperçu" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isWo ? 'Téléverser nataal bi' : 'Téléverser depuis mon appareil'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-[#6E7F75]">
                  {isWo ? 'Walla tànn ci nataal yu baax yi ci suuf :' : 'Ou sélectionnez une photo de notre collection ou saisissez un lien :'}
                </p>
              </div>
            </div>

            {/* Quick preset selector */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {PRESET_STOCK_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`aspect-video rounded border overflow-hidden relative cursor-pointer ${
                    imageUrl === preset.url ? 'ring-2 ring-[#165B43] border-transparent' : 'opacity-70 hover:opacity-100 border-[#DDD5C5]'
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... (Lien de l'image)"
              className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C5] rounded-lg text-xs outline-none focus:border-[#165B43]"
            />
          </div>

          {/* Title & Wolof Title */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Turu liggéey bi (Français) *' : 'Titre du produit (Français) *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Café Touba Royal Moulu 500g"
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C6E64] mb-1">
                {isWo ? 'Turu liggéey bi (Wolof)' : 'Titre en Wolof (Optionnel)'}
              </label>
              <input
                type="text"
                value={titleWo}
                onChange={(e) => setTitleWo(e.target.value)}
                placeholder="Ex: Kàfe Touba gu dëggu..."
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Fàcc bi (Catégorie) *' : 'Catégorie *'}
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
                placeholder="Ex: Torréfaction artisanale, Soie brodée..."
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>
          </div>

          {/* Price, Stock Quantity & Origin */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Njëg li (en FCFA) *' : 'Prix unitaire (FCFA) *'}
              </label>
              <input
                type="number"
                required
                min="100"
                step="500"
                value={priceXOF}
                onChange={(e) => setPriceXOF(e.target.value)}
                placeholder="Ex: 3500"
                className="w-full px-3 py-2 text-xs font-bold text-[#165B43] border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Lim bi am ci Stock bi *' : 'Quantité en Stock *'}
              </label>
              <input
                type="number"
                required
                min="0"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                placeholder="Ex: 25"
                className="w-full px-3 py-2 text-xs font-bold text-[#2A3B31] border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                {isWo ? 'Atelier / Dëkk' : 'Lieu de fabrication'}
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Ex: Touba 28"
                className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
              />
            </div>
          </div>

          {/* Artisanal checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isArtisanalStock"
              checked={isArtisanal}
              onChange={(e) => setIsArtisanal(e.target.checked)}
              className="w-4 h-4 text-[#165B43] rounded border-gray-300 focus:ring-[#165B43]"
            />
            <label htmlFor="isArtisanalStock" className="text-xs font-medium text-[#2A3B31] cursor-pointer">
              {isWo ? 'Loxo lañu ko defare (100% Artisanal & Fait Main)' : 'Produit artisanal fait main (Label Savoir-Faire Local)'}
            </label>
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
              placeholder="Expliquez la méthode de confection, les matières premières, la tradition respectée..."
              className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none resize-none"
            />
          </div>

          {/* Specifications */}
          <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#EDE7D9] space-y-2">
            <label className="block text-xs font-bold text-[#1C2C22]">
              {isWo ? 'Spécifications (Poids, Matière...)' : 'Spécifications & Caractéristiques'}
            </label>
            
            {/* List of current specs */}
            <div className="space-y-1">
              {Object.entries(specifications).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-xs bg-white px-2.5 py-1 rounded border border-[#E0D7C6]">
                  <span className="font-semibold text-[#1C2C22]">{k}: <span className="font-normal text-[#5C6E64]">{v}</span></span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(k)}
                    className="text-[#94A79D] hover:text-[#C85A32] font-bold ml-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add spec inline */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Ex: Poids net"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                className="flex-1 px-2.5 py-1 text-xs bg-white border border-[#DDD5C5] rounded outline-none"
              />
              <input
                type="text"
                placeholder="Ex: 500 grammes"
                value={specVal}
                onChange={(e) => setSpecVal(e.target.value)}
                className="flex-1 px-2.5 py-1 text-xs bg-white border border-[#DDD5C5] rounded outline-none"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-3 py-1 bg-[#165B43] text-white text-xs font-bold rounded cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
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
              className="px-6 py-2.5 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isWo ? 'Denc ko ci Stock bi' : 'Enregistrer dans mon stock'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
