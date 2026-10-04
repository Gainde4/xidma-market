import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  Edit3, 
  Trash2, 
  Plus, 
  Upload, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Eye, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Award,
  Search,
  AlertTriangle,
  Check,
  TrendingUp,
  Boxes
} from 'lucide-react';
import { CategoryId, Currency, Language, Product, Seller, ShopProfile } from '../types/marketplace';
import { SECTORS } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

interface VendorDashboardProps {
  lang: Language;
  currency: Currency;
  shopProfile: ShopProfile;
  onUpdateShopProfile: (updated: ShopProfile) => void;
  vendorProducts: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStockCount: (productId: string, newCount: number) => void;
  onBackToMarketplace: () => void;
  onPreviewPublicShop: () => void;
}

const PRESET_SHOP_COVERS = [
  { label: 'Atelier Torréfaction Touba', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Atelier Couture & Broderie', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Atelier Ébénisterie & Bois', url: 'https://images.unsplash.com/photo-1584447141399-be2c178221a7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Boutique Librairie Touba', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Hangar Terroir & Céréales Baol', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Logistique & Fret Diaspora', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' },
];

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  lang,
  currency,
  shopProfile,
  onUpdateShopProfile,
  vendorProducts,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateStockCount,
  onBackToMarketplace,
  onPreviewPublicShop,
}) => {
  const isWo = lang === 'wo';
  const [activeTab, setActiveTab] = useState<'stock' | 'profile' | 'messages'>('stock');

  // Stock filters
  const [stockSearchQuery, setStockSearchQuery] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Profile form draft
  const [profileForm, setProfileForm] = useState<ShopProfile>(shopProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // File Upload Handlers
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const updated = { ...profileForm, coverBannerUrl: reader.result };
          setProfileForm(updated);
          onUpdateShopProfile(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const updated = { ...profileForm, avatarUrl: reader.result };
          setProfileForm(updated);
          onUpdateShopProfile(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShopProfile(profileForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Stock calculations
  const totalStockUnits = vendorProducts.reduce((sum, p) => sum + (p.stockCount || 0), 0);
  const totalStockValueXOF = vendorProducts.reduce((sum, p) => sum + (p.priceXOF * (p.stockCount || 0)), 0);
  const lowStockCount = vendorProducts.filter((p) => p.stockCount > 0 && p.stockCount <= 5).length;
  const outOfStockCount = vendorProducts.filter((p) => !p.stockCount || p.stockCount === 0).length;

  // Filtered Stock list
  const filteredStock = vendorProducts.filter((p) => {
    if (stockSearchQuery.trim()) {
      const q = stockSearchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) || (p.titleWo && p.titleWo.toLowerCase().includes(q)) || p.subCategory.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (stockStatusFilter === 'in_stock') return p.stockCount > 5;
    if (stockStatusFilter === 'low_stock') return p.stockCount > 0 && p.stockCount <= 5;
    if (stockStatusFilter === 'out_of_stock') return !p.stockCount || p.stockCount === 0;

    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Top Banner Navigation */}
      <div className="bg-[#0C2B20] text-white border-b border-[#1A4A38] py-3 px-4 sm:px-6 sticky top-[69px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToMarketplace}
            className="flex items-center gap-2 text-xs font-semibold text-[#A8C7B9] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isWo ? 'Delloo ma ci Marché bi' : 'Retourner au Marché'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onPreviewPublicShop}
              className="px-3 py-1.5 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">{isWo ? 'Wone ma vitrine bi' : 'Prévisualiser ma boutique'}</span>
            </button>

            <button
              onClick={onAddProduct}
              className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0C2B20] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isWo ? 'Doli produit' : 'Nouveau Produit'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Shop Presentation Header Card */}
        <div className="bg-white rounded-2xl border border-[#E5DFD2] overflow-hidden shadow-xs relative mb-6">
          {/* Cover Photo */}
          <div className="relative h-44 sm:h-56 w-full bg-[#123B2C] overflow-hidden group">
            <img
              src={profileForm.coverBannerUrl}
              alt="Bannière de la boutique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Change cover button */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <label className="px-3 py-1.5 bg-black/60 hover:bg-black text-white text-xs font-medium rounded-lg backdrop-blur-xs cursor-pointer flex items-center gap-1.5 shadow-sm transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isWo ? 'Soppi nataalu këru liggéey bi' : 'Changer photo de la boutique'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Profile details bar */}
          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
              {/* Avatar & Identité */}
              <div className="flex items-end gap-4">
                <div className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white shrink-0">
                  <img
                    src={profileForm.avatarUrl}
                    alt={profileForm.name}
                    className="w-full h-full object-cover"
                  />
                  <label 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-semibold cursor-pointer transition-opacity"
                    title="Changer ma photo de profil"
                  >
                    <Upload className="w-4 h-4 text-[#D4AF37] mb-0.5" />
                    <span>Modifier</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C2C22] leading-tight">
                      {profileForm.name}
                    </h1>
                    <span title="Artisan Vérifié Xidma" className="inline-flex">
                      <CheckCircle2 className="w-5 h-5 text-[#165B43] shrink-0" />
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C6E64]">
                    <span className="font-semibold text-[#8C6407]">{profileForm.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#94A79D]" />
                      {profileForm.location}
                    </span>
                    {profileForm.dahira && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#165B43] font-medium">{profileForm.dahira}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Direct Contact */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${profileForm.phoneWhatsApp.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{profileForm.phoneWhatsApp}</span>
                </a>
              </div>
            </div>

            {/* Slogan & Quick Bio */}
            {profileForm.tagline && (
              <p className="mt-4 text-xs sm:text-sm text-[#4A5D53] italic border-l-2 border-[#D4AF37] pl-3 py-0.5">
                « {isWo ? (profileForm.taglineWo || profileForm.tagline) : profileForm.tagline} »
              </p>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-t border-[#EAE3D2] flex gap-4 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('stock')}
              className={`py-3.5 border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'stock'
                  ? 'border-[#165B43] text-[#165B43] font-bold'
                  : 'border-transparent text-[#6E7F75] hover:text-[#1C2C22]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{isWo ? 'Sama Espace de Stock & Liggéey yi' : 'Espace de Stock & Produits'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#165B43]/10 text-[#165B43] text-[10px]">
                {vendorProducts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3.5 border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-[#165B43] text-[#165B43] font-bold'
                  : 'border-transparent text-[#6E7F75] hover:text-[#1C2C22]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{isWo ? 'Identité & Secteur Këru Liggéey bi' : 'Profil & Secteur d’Activité'}</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`py-3.5 border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'border-[#165B43] text-[#165B43] font-bold'
                  : 'border-transparent text-[#6E7F75] hover:text-[#1C2C22]'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isWo ? 'Commandes WhatsApp & Kóolute' : 'Commandes & WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ESPACE DE STOCK & GESTION DES PRODUITS */}
        {activeTab === 'stock' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E5DFD2] shadow-xs">
                <div className="flex items-center justify-between text-[#6E7F75] text-xs">
                  <span>{isWo ? 'Liggéey yi am ci Stock' : 'Articles au catalogue'}</span>
                  <Package className="w-4 h-4 text-[#165B43]" />
                </div>
                <div className="text-2xl font-extrabold text-[#1C2C22] mt-2">
                  {vendorProducts.length}
                </div>
                <div className="text-[11px] text-[#8A9B91] mt-0.5">
                  {vendorProducts.filter(p => p.inStock).length} {isWo ? 'di disponibël' : 'actifs en vente'}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E5DFD2] shadow-xs">
                <div className="flex items-center justify-between text-[#6E7F75] text-xs">
                  <span>{isWo ? 'Limu pièces yépp' : 'Total Unités en Stock'}</span>
                  <Boxes className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="text-2xl font-extrabold text-[#8C6407] mt-2">
                  {totalStockUnits} <span className="text-xs font-normal text-[#6E7F75]">unités</span>
                </div>
                <div className="text-[11px] text-[#8A9B91] mt-0.5">
                  {isWo ? 'Lim bi am ci magasin bi' : 'Disponibilité physique'}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E5DFD2] shadow-xs">
                <div className="flex items-center justify-between text-[#6E7F75] text-xs">
                  <span>{isWo ? 'Njëgu Stock bi yépp' : 'Valeur Totale du Stock'}</span>
                  <TrendingUp className="w-4 h-4 text-[#165B43]" />
                </div>
                <div className="text-2xl font-extrabold text-[#165B43] mt-2">
                  {formatCurrency(totalStockValueXOF, currency)}
                </div>
                <div className="text-[11px] text-[#8A9B91] mt-0.5">
                  {isWo ? 'Xalis bi ci nekk' : 'En valeur marchande'}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E5DFD2] shadow-xs">
                <div className="flex items-center justify-between text-[#6E7F75] text-xs">
                  <span>{isWo ? 'Stock bu yées / Ruptures' : 'Alertes de Stock'}</span>
                  <AlertTriangle className={`w-4 h-4 ${lowStockCount + outOfStockCount > 0 ? 'text-[#C85A32]' : 'text-[#165B43]'}`} />
                </div>
                <div className="text-2xl font-extrabold text-[#C85A32] mt-2">
                  {lowStockCount + outOfStockCount}
                </div>
                <div className="text-[11px] text-[#8A9B91] mt-0.5">
                  {outOfStockCount} {isWo ? 'jeex na' : 'en rupture'}, {lowStockCount} {isWo ? 'yées na' : 'faible'}
                </div>
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E5DFD2] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9B91]" />
                  <input
                    type="text"
                    value={stockSearchQuery}
                    onChange={(e) => setStockSearchQuery(e.target.value)}
                    placeholder={isWo ? "Seet produit ci sa stock..." : "Rechercher un produit dans mon stock..."}
                    className="w-full pl-9 pr-3 py-2 bg-[#F8F6F0] border border-[#DDD5C5] rounded-lg text-xs outline-none focus:border-[#165B43]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center bg-[#F8F6F0] border border-[#DDD5C5] rounded-lg p-0.5">
                  <button
                    onClick={() => setStockStatusFilter('all')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      stockStatusFilter === 'all' ? 'bg-white font-bold text-[#165B43] shadow-xs' : 'text-[#6E7F75]'
                    }`}
                  >
                    {isWo ? 'Lépp' : 'Tous'} ({vendorProducts.length})
                  </button>
                  <button
                    onClick={() => setStockStatusFilter('in_stock')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      stockStatusFilter === 'in_stock' ? 'bg-white font-bold text-[#165B43] shadow-xs' : 'text-[#6E7F75]'
                    }`}
                  >
                    {isWo ? 'Am na' : 'En Stock'}
                  </button>
                  <button
                    onClick={() => setStockStatusFilter('low_stock')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      stockStatusFilter === 'low_stock' ? 'bg-white font-bold text-[#8C6407] shadow-xs' : 'text-[#6E7F75]'
                    }`}
                  >
                    {isWo ? 'Yées na' : 'Stock Faible'}
                  </button>
                  <button
                    onClick={() => setStockStatusFilter('out_of_stock')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      stockStatusFilter === 'out_of_stock' ? 'bg-white font-bold text-[#C85A32] shadow-xs' : 'text-[#6E7F75]'
                    }`}
                  >
                    {isWo ? 'Jeex na' : 'Rupture'}
                  </button>
                </div>

                <button
                  onClick={onAddProduct}
                  className="px-4 py-2 bg-[#165B43] hover:bg-[#1E7456] text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isWo ? 'Doli Liggéey ci Stock' : 'Ajouter un Produit'}</span>
                </button>
              </div>
            </div>

            {/* Stock Products List */}
            {filteredStock.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E5DFD2] p-12 text-center space-y-3">
                <Package className="w-12 h-12 mx-auto text-[#C3B79F]" />
                <h3 className="text-sm font-bold text-[#1C2C22]">
                  {isWo ? 'Amul benn produit ci li nga seet' : 'Aucun produit ne correspond à ces critères'}
                </h3>
                <p className="text-xs text-[#6E7F75] max-w-sm mx-auto">
                  {isWo
                    ? 'Doli sa premier produit ci tombol "Doli Liggéey ci Stock".'
                    : 'Commencez à peupler votre espace de stock en ajoutant vos créations et produits.'}
                </p>
                <button
                  onClick={onAddProduct}
                  className="mt-2 px-4 py-2 bg-[#165B43] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  {isWo ? 'Doli produit léegi' : 'Ajouter un premier produit'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#E5DFD2] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F8F6F0] border-b border-[#EAE3D2] text-[#5C6E64] uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4 font-bold">{isWo ? 'Liggéey bi' : 'Produit & Filière'}</th>
                        <th className="py-3 px-4 font-bold">{isWo ? 'Njëg li' : 'Prix Unitaire'}</th>
                        <th className="py-3 px-4 font-bold text-center">{isWo ? 'Lim bi am ci Stock' : 'Gestion du Stock'}</th>
                        <th className="py-3 px-4 font-bold">{isWo ? 'Statut' : 'Disponibilité'}</th>
                        <th className="py-3 px-4 font-bold text-right">{isWo ? 'Jëf yi' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE1]">
                      {filteredStock.map((prod) => {
                        const isOutOfStock = !prod.stockCount || prod.stockCount === 0;
                        const isLowStock = prod.stockCount > 0 && prod.stockCount <= 5;

                        return (
                          <tr key={prod.id} className="hover:bg-[#FAF8F3] transition-colors">
                            {/* Product Info */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.title}
                                  className="w-12 h-12 rounded-lg object-cover border border-[#E0D7C6] shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-[#1C2C22] truncate max-w-xs">
                                    {isWo ? (prod.titleWo || prod.title) : prod.title}
                                  </div>
                                  <div className="text-[11px] text-[#6E7F75] flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[#165B43] font-medium">{prod.subCategory}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{prod.origin}</span>
                                    {prod.isArtisanal && (
                                      <>
                                        <span aria-hidden="true">·</span>
                                        <span className="text-[#8C6407]">Artisanal</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-3 px-4 font-extrabold text-[#165B43] whitespace-nowrap">
                              {formatCurrency(prod.priceXOF, currency)}
                            </td>

                            {/* Stock modifier stepper */}
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => onUpdateStockCount(prod.id, Math.max(0, prod.stockCount - 1))}
                                  className="w-7 h-7 rounded border border-[#DDD5C5] bg-white hover:bg-[#F5F2EB] text-[#2A3B31] font-bold flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                                  title="Diminuer stock"
                                >
                                  -
                                </button>
                                <span className={`w-10 text-center font-bold text-sm ${
                                  isOutOfStock ? 'text-[#C85A32]' : (isLowStock ? 'text-[#8C6407]' : 'text-[#1C2C22]')
                                }`}>
                                  {prod.stockCount}
                                </span>
                                <button
                                  onClick={() => onUpdateStockCount(prod.id, prod.stockCount + 1)}
                                  className="w-7 h-7 rounded border border-[#DDD5C5] bg-white hover:bg-[#F5F2EB] text-[#2A3B31] font-bold flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                                  title="Augmenter stock"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            {/* Status label */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              {isOutOfStock ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C85A32]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
                                  <span>{isWo ? 'Jeex na' : 'Rupture'}</span>
                                </span>
                              ) : isLowStock ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6407]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                                  <span>{isWo ? 'Faible (≤ 5)' : 'Stock faible (≤ 5)'}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#165B43]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#165B43]" />
                                  <span>{isWo ? 'Am na fi' : 'En stock'}</span>
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => onEditProduct(prod)}
                                  className="p-1.5 rounded-lg text-[#5C6E64] hover:text-[#165B43] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                                  title="Modifier les détails"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(isWo ? 'Ndax bëgg nga dindi liggéey bi ci sa stock ?' : 'Voulez-vous vraiment supprimer cet article de votre stock ?')) {
                                      onDeleteProduct(prod.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-[#94A79D] hover:text-[#C85A32] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                                  title="Supprimer du stock"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROFIL DE LA BOUTIQUE & SECTEUR D'ACTIVITÉ */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#E5DFD2] p-6 sm:p-8 shadow-xs animate-in fade-in duration-150">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-[#EAE3D2] pb-4">
                <h2 className="text-lg font-bold text-[#1C2C22]">
                  {isWo ? 'Say Nataal, Sa Secteur ak Faramfacce Këru Liggéey bi' : 'Configuration de la Boutique, Photos & Secteur d’Activité'}
                </h2>
                <p className="text-xs text-[#6E7F75] mt-1">
                  {isWo
                    ? 'Bindal fi lépp lu jëm ci sa atelier, sa secteur liggéey, say nataal ak say contacts.'
                    : 'Présentez votre entreprise, importez vos photos de devanture/atelier et définissez votre secteur pour attirer les clients.'}
                </p>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-[#165B43]/10 border border-[#165B43] text-[#165B43] rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>
                    {isWo ? 'Denc nañu say soppi ci Këru Liggéey bi !' : 'Modifications de votre boutique enregistrées avec succès !'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Visuals: Shop Cover & Avatar preview */}
                <div className="space-y-4 p-4 bg-[#FAF8F3] rounded-xl border border-[#EDE7D9]">
                  <h3 className="text-xs font-bold text-[#1C2C22] uppercase tracking-wider">
                    {isWo ? 'Say Nataalu Këru Liggéey' : 'Photos de la Boutique & Logo'}
                  </h3>

                  {/* Devanture / Atelier Cover */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3B31] mb-1">
                      {isWo ? 'Nataalu devanture walla atelier bi (Bannière)' : 'Photo de la boutique, atelier ou devanture :'}
                    </label>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-20 w-36 rounded-lg overflow-hidden border border-[#DDD5C5] bg-white shrink-0">
                        <img src={profileForm.coverBannerUrl} alt="Boutique" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isWo ? 'Téléverser photo devanture' : 'Téléverser ma photo de boutique'}</span>
                          <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                        </label>
                        <p className="text-[11px] text-[#6E7F75]">
                          Format paysage recommandé (JPG, PNG)
                        </p>
                      </div>
                    </div>

                    {/* Presets */}
                    <div className="pt-2">
                      <span className="text-[11px] text-[#6E7F75] font-medium block mb-1">
                        {isWo ? 'Walla tànn ci modèle atelier yi :' : 'Ou choisir un modèle d’atelier prêt à l’emploi :'}
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {PRESET_SHOP_COVERS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProfileForm({ ...profileForm, coverBannerUrl: preset.url })}
                            className={`aspect-video rounded border overflow-hidden cursor-pointer ${
                              profileForm.coverBannerUrl === preset.url ? 'ring-2 ring-[#165B43] border-transparent' : 'opacity-70 hover:opacity-100 border-[#DDD5C5]'
                            }`}
                            title={preset.label}
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Profil Avatar */}
                  <div className="pt-2 border-t border-[#EAE3D2]">
                    <label className="block text-xs font-semibold text-[#2A3B31] mb-1">
                      {isWo ? 'Nataalu Boroom bi walla Logo :' : 'Photo de profil de l’artisan / Logo de l’entreprise :'}
                    </label>
                    <div className="flex items-center gap-3">
                      <img
                        src={profileForm.avatarUrl}
                        alt="Avatar"
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#165B43]"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF3E0] hover:bg-[#F0E6CB] text-[#8C6407] border border-[#DDD5C5] text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isWo ? 'Téléverser photo profil' : 'Téléverser mon portrait / logo'}</span>
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Nom & Secteur */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                      {isWo ? 'Turu Këru Liggéey bi (Nom de l’entreprise) *' : 'Nom de la Boutique / Entreprise *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none font-semibold text-[#1C2C22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                      {isWo ? 'Secteur bi nga yori (Secteur d’entrepreneuriat) *' : 'Secteur d’entrepreneuriat *'}
                    </label>
                    <select
                      value={profileForm.sector}
                      onChange={(e) => {
                        const selected = SECTORS.find((s) => s.labelFr === e.target.value);
                        setProfileForm({
                          ...profileForm,
                          sector: e.target.value,
                          sectorId: (selected?.id as CategoryId) || 'terroir'
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg bg-white focus:border-[#165B43] outline-none font-medium"
                    >
                      {SECTORS.map((sec) => (
                        <option key={sec.id} value={sec.labelFr}>
                          {sec.labelFr} {sec.labelWo ? `(${sec.labelWo})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Slogan */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                    {isWo ? 'Devise / Slogan Këru Liggéey bi' : 'Slogan ou Devise de travail'}
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    placeholder="Ex: L’excellence du Café Touba artisanal & des trésors du Baol"
                    className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                  />
                </div>

                {/* Description de l'entreprise */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                    {isWo ? 'Faramfacce sa liggéey, say aada ak sa savoir-faire *' : 'Description de votre entreprise, savoir-faire et engagements *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                    placeholder="Racontez l’histoire de votre atelier, la fabrication artisanale, votre quartier à Touba ou Dakar, et les valeurs de dévouement..."
                    className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none leading-relaxed"
                  />
                </div>

                {/* Localisation & Dahira */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                      {isWo ? 'Dëkk / Localisation *' : 'Localisation / Adresse de l’atelier *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      placeholder="Ex: Touba 28, Ocass / Dakar Sandaga"
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C6E64] mb-1">
                      {isWo ? 'Dahira walla Koureel' : 'Dahira ou Koureel de rattachement'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.dahira || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, dahira: e.target.value })}
                      placeholder="Ex: Dahira Rawdu Rayahin Touba"
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                    />
                  </div>
                </div>

                {/* Contacts & WhatsApp */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3B31] mb-1">
                      {isWo ? 'WhatsApp Commercial *' : 'Numéro WhatsApp commercial *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.phoneWhatsApp}
                      onChange={(e) => setProfileForm({ ...profileForm, phoneWhatsApp: e.target.value })}
                      placeholder="+221 77 000 00 00"
                      className="w-full px-3 py-2 text-xs font-semibold text-[#128C7E] border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C6E64] mb-1">
                      {isWo ? 'Email professionnel' : 'Email professionnel'}
                    </label>
                    <input
                      type="email"
                      value={profileForm.email || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder="contact@boutique.sn"
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C6E64] mb-1">
                      {isWo ? 'At yi ci liggéey' : 'Années d’expérience'}
                    </label>
                    <input
                      type="number"
                      value={profileForm.experienceYears}
                      onChange={(e) => setProfileForm({ ...profileForm, experienceYears: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded-lg focus:border-[#165B43] outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-[#EAE3D2] flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isWo ? 'Denc say soppi' : 'Enregistrer les modifications de ma boutique'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: COMMANDES & WHATSAPP */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl border border-[#E5DFD2] p-6 sm:p-8 shadow-xs animate-in fade-in duration-150">
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1C2C22]">
                  {isWo ? 'Say Jokkoo ak Commandes WhatsApp' : 'Canal Direct WhatsApp & Commandes'}
                </h3>
                <p className="text-xs text-[#5C6E64] mt-1 leading-relaxed">
                  {isWo
                    ? 'Chaque fois qu’un client commande un produit de votre stock, un message détaillé avec les articles, le prix et son adresse de livraison vous est envoyé directement sur WhatsApp.'
                    : 'Sur Xidma Market, les acheteurs du Sénégal et de la diaspora vous contactent directement sur votre WhatsApp avec la commande préremplie.'}
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#EDE7D9] text-left text-xs space-y-3">
                <div className="font-bold text-[#165B43]">
                  💡 {isWo ? 'Li ngay def bu client bi la woo :' : 'Conseils pour finaliser vos ventes :'}
                </div>
                <ul className="space-y-2 text-[#4A5D53]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#165B43] mt-1.5 shrink-0" />
                    <span><strong>Disponibilité en Stock :</strong> Vérifiez toujours votre quantité d’unités dans votre Espace de Stock avant de confirmer la commande.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#165B43] mt-1.5 shrink-0" />
                    <span><strong>Moyens de Paiement :</strong> Proposez Wave, Orange Money ou virement pour la Diaspora.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#165B43] mt-1.5 shrink-0" />
                    <span><strong>Expédition :</strong> Pour Dakar et les régions, utilisez les services de colis locaux. Pour la diaspora, orientez le client vers notre service de Fret Al-Khidma.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onPreviewPublicShop}
                className="px-6 py-2.5 bg-[#165B43] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {isWo ? 'Xool ni client yi di gise sama boutique' : 'Tester ma vitrine publique comme un acheteur'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
