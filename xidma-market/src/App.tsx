/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Compass, 
  Store, 
  ArrowLeft,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

import { Product, CategoryId, Currency, Language, CartItem, Seller, ShopProfile } from './types/marketplace';
import { INITIAL_PRODUCTS, SELLERS, INITIAL_VENDOR_SHOP } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ModernSearchBar } from './components/ModernSearchBar';
import { PromoCarouselBanner } from './components/PromoCarouselBanner';
import { CategoryIconGrid } from './components/CategoryIconGrid';
import { TopStoresStrip } from './components/TopStoresStrip';
import { WisdomBanner } from './components/WisdomBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PostListingModal } from './components/PostListingModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { BerndeSection } from './components/BerndeSection';
import { SellersDirectoryModal } from './components/SellersDirectoryModal';
import { VendorDashboard } from './components/VendorDashboard';
import { AddEditProductModal } from './components/AddEditProductModal';
import { PublicShopModal } from './components/PublicShopModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export default function App() {
  // Localization & Currency
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('xidma_lang') as Language) || 'fr';
  });
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('xidma_currency') as Currency) || 'XOF';
  });

  // Current view: 'marketplace' | 'vendor'
  const [currentView, setCurrentView] = useState<'marketplace' | 'vendor'>('marketplace');

  // Vendor Shop Profile
  const [shopProfile, setShopProfile] = useState<ShopProfile>(() => {
    try {
      const saved = localStorage.getItem('xidma_shop_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_VENDOR_SHOP;
  });

  // Products & User listings persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('xidma_custom_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_PRODUCTS];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('xidma_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Favorites persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('xidma_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['prod-1', 'prod-3'];
  });

  // Filters & Search (Marketplace view)
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [onlyArtisanal, setOnlyArtisanal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPostListingOpen, setIsPostListingOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  // Vendor Modals
  const [isAddEditProductOpen, setIsAddEditProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Public Shop Preview Modal
  const [publicShopTarget, setPublicShopTarget] = useState<Seller | null>(null);

  // Quick toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const productSectionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('xidma_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('xidma_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('xidma_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('xidma_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('xidma_shop_profile', JSON.stringify(shopProfile));
  }, [shopProfile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Convert shop profile to Seller interface
  const currentSellerObject = useMemo<Seller>(() => {
    return {
      id: shopProfile.id,
      name: shopProfile.name,
      dahira: shopProfile.dahira,
      location: shopProfile.location,
      rating: 4.95,
      reviewsCount: 142,
      phoneWhatsApp: shopProfile.phoneWhatsApp,
      isVerified: shopProfile.isVerified,
      memberSince: '2021',
      avatar: shopProfile.avatarUrl,
      badgeTitle: shopProfile.sector,
      description: shopProfile.description,
      sector: shopProfile.sector,
      coverBannerUrl: shopProfile.coverBannerUrl
    };
  }, [shopProfile]);

  // Products belonging to the current vendor
  const vendorProducts = useMemo(() => {
    return products.filter((p) => {
      return p.seller.id === shopProfile.id || p.seller.name.toLowerCase() === shopProfile.name.toLowerCase();
    });
  }, [products, shopProfile]);

  // Handlers for Cart & Favorites
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    const msg = lang === 'wo' 
      ? `Doli nañu "${product.titleWo || product.title}" ci sa pos !` 
      : `"${product.title}" ajouté à votre panier !`;
    showToast(msg);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      if (!exists) {
        showToast(lang === 'wo' ? 'Denc nañu ko ci say favoris !' : 'Ajouté à vos favoris !');
      }
      return updated;
    });
  };

  // Vendor actions: Save, Edit, Delete, Update Stock
  const handleSaveVendorProduct = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = prev.map((p) => (p.id === product.id ? product : p));
      } else {
        updated = [product, ...prev];
      }
      try {
        const custom = updated.filter((p) => !INITIAL_PRODUCTS.some((ip) => ip.id === p.id));
        localStorage.setItem('xidma_custom_products', JSON.stringify(custom));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    showToast(
      lang === 'wo' 
        ? 'Denc nañu produit bi ci sa Stock !' 
        : 'Produit enregistré avec succès dans votre stock !'
    );
  };

  const handleUpdateStockCount = (productId: string, newCount: number) => {
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stockCount: newCount,
            inStock: newCount > 0
          };
        }
        return p;
      });
      try {
        const custom = updated.filter((p) => !INITIAL_PRODUCTS.some((ip) => ip.id === p.id));
        localStorage.setItem('xidma_custom_products', JSON.stringify(custom));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleDeleteVendorProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        const custom = updated.filter((p) => !INITIAL_PRODUCTS.some((ip) => ip.id === p.id));
        localStorage.setItem('xidma_custom_products', JSON.stringify(custom));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast(
      lang === 'wo' ? 'Dindi nañu produit bi ci sa stock' : 'Produit retiré de votre stock'
    );
  };

  const handleUpdateShopProfile = (updatedProfile: ShopProfile) => {
    setShopProfile(updatedProfile);
    // Also update seller info in any existing products
    setProducts((prev) =>
      prev.map((p) => {
        if (p.seller.id === updatedProfile.id || p.seller.name.toLowerCase() === shopProfile.name.toLowerCase()) {
          return {
            ...p,
            seller: {
              ...p.seller,
              name: updatedProfile.name,
              location: updatedProfile.location,
              dahira: updatedProfile.dahira,
              phoneWhatsApp: updatedProfile.phoneWhatsApp,
              avatar: updatedProfile.avatarUrl,
              badgeTitle: updatedProfile.sector,
              sector: updatedProfile.sector,
              coverBannerUrl: updatedProfile.coverBannerUrl,
              description: updatedProfile.description
            }
          };
        }
        return p;
      })
    );
  };

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & sorted products (Marketplace view)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Region filter
      if (selectedRegion !== 'all') {
        const originLower = product.origin.toLowerCase();
        if (selectedRegion === 'touba' && !originLower.includes('touba')) return false;
        if (selectedRegion === 'dakar' && !originLower.includes('dakar') && !originLower.includes('thiès')) return false;
        if (selectedRegion === 'diaspora' && !originLower.includes('paris') && !originLower.includes('york') && !originLower.includes('diaspora')) return false;
      }

      // Artisanal filter
      if (onlyArtisanal && !product.isArtisanal) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesTitleWo = product.titleWo?.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSeller = product.seller.name.toLowerCase().includes(q);
        const matchesSubcat = product.subCategory.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesTitleWo && !matchesDesc && !matchesSeller && !matchesSubcat && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceXOF - b.priceXOF;
      if (sortBy === 'price-desc') return b.priceXOF - a.priceXOF;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [products, selectedCategory, selectedRegion, onlyArtisanal, searchQuery, sortBy]);

  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favorites.includes(p.id));
  }, [products, favorites]);

  const berndeProduct = useMemo(() => {
    return products.find((p) => p.category === 'bernde');
  }, [products]);

  const allSellers = useMemo(() => {
    const list = Object.values(SELLERS);
    products.forEach((p) => {
      if (!list.some((s) => s.id === p.seller.id)) {
        list.push(p.seller);
      }
    });
    return list;
  }, [products]);

  const isWo = lang === 'wo';

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F6] text-[#1E2922] pb-16 sm:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-[#1C2C22] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#00A86B] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#00A86B] text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-[#A8C7B9] hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Top Header matching screenshot */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenPostListing={() => setCurrentView('vendor')}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onNavigateToVendor={() => setCurrentView('vendor')}
        onNavigateToMarketplace={() => setCurrentView('marketplace')}
      />

      {/* VIEW 1: VENDOR DASHBOARD (ESPACE VENDEUR / GESTION BOUTIQUE & STOCK) */}
      {currentView === 'vendor' ? (
        <VendorDashboard
          lang={lang}
          currency={currency}
          shopProfile={shopProfile}
          onUpdateShopProfile={handleUpdateShopProfile}
          vendorProducts={vendorProducts}
          onAddProduct={() => {
            setProductToEdit(null);
            setIsAddEditProductOpen(true);
          }}
          onEditProduct={(p) => {
            setProductToEdit(p);
            setIsAddEditProductOpen(true);
          }}
          onDeleteProduct={handleDeleteVendorProduct}
          onUpdateStockCount={handleUpdateStockCount}
          onBackToMarketplace={() => setCurrentView('marketplace')}
          onPreviewPublicShop={() => setPublicShopTarget(currentSellerObject)}
        />
      ) : (
        /* VIEW 2: PUBLIC MARKETPLACE MATCHING THE MODERN SCREENSHOT DESIGN */
        <main className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-5 flex-1 w-full">
          {/* 1. Modern Pill Search Bar with Filter Sliders */}
          <ModernSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            lang={lang}
            onlyArtisanal={onlyArtisanal}
            onToggleArtisanal={() => setOnlyArtisanal(!onlyArtisanal)}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            onOpenFilterModal={() => {
              productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2. Promotional Carousel Banner with Discount & Dots matching screenshot */}
          <PromoCarouselBanner
            lang={lang}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToProducts();
            }}
            onExplore={scrollToProducts}
          />

          {/* 3. Category Icon Grid with "View More Categories" button matching screenshot */}
          <CategoryIconGrid
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToProducts();
            }}
            lang={lang}
          />

          {/* 4. Top Stores Strip matching screenshot ("Top Grocery Stores" circular logos) */}
          <TopStoresStrip
            sellers={allSellers}
            onSelectStore={(seller) => setPublicShopTarget(seller)}
            onViewAllStores={() => setIsDirectoryOpen(true)}
            lang={lang}
          />

          {/* 5. Wisdom Banner (Cultural philosophy: "Liggéey ci jamu Yàlla la bokk") */}
          <WisdomBanner lang={lang} />

          {/* 6. Products Header & Grid matching screenshot ("Top Items 2026") */}
          <div ref={productSectionRef} className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1C2C22] tracking-tight">
                  {isWo ? 'Liggéey yi gën a siw 2026' : 'Top Articles & Savoir-Faire 2026'}
                </h3>
                <p className="text-xs text-[#6E7F75]">
                  <strong className="text-[#00A86B] font-semibold">{filteredProducts.length}</strong> {isWo ? 'liggéey disponibël' : (filteredProducts.length > 1 ? 'articles disponibles' : 'article disponible')}
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs text-[#5C6E64]">
                <span className="hidden sm:inline">{isWo ? 'Tegal ko ci :' : 'Trier par :'}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#E5E9E2] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#1C2C22] outline-none shadow-xs cursor-pointer focus:border-[#00A86B]"
                >
                  <option value="popular">{isWo ? 'Li gën a siw' : 'Populaires'}</option>
                  <option value="price-asc">{isWo ? 'Njëg woyof' : 'Prix croissant'}</option>
                  <option value="price-desc">{isWo ? 'Njëg kawe' : 'Prix décroissant'}</option>
                  <option value="rating">{isWo ? 'Mieux notés' : 'Meilleures notes'}</option>
                </select>
              </div>
            </div>

            {/* Active search filter notification if active */}
            {searchQuery && (
              <div className="p-3 bg-white rounded-2xl border border-[#E0E7DC] flex items-center justify-between text-xs shadow-xs">
                <span className="text-[#5C6E64]">
                  {isWo ? 'Résultats pour :' : 'Résultats de recherche pour :'} <strong className="text-[#00A86B]">"{searchQuery}"</strong>
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#8C6407] hover:underline cursor-pointer"
                >
                  {isWo ? 'Bàyyi seet bi' : 'Effacer'}
                </button>
              </div>
            )}

            {/* Product Cards Grid: dual column on mobile, 3-4 cols on desktop */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E9EFE7] p-8 space-y-3">
                <Compass className="w-10 h-10 mx-auto text-[#00A86B]" />
                <h4 className="text-sm font-bold text-[#1C2C22]">
                  {isWo ? 'Amul benn liggéey bu dëppoo ak li nga seet' : 'Aucun produit trouvé'}
                </h4>
                <p className="text-xs text-[#6C7E74]">
                  {isWo ? 'Waññi say filtres walla nga doli sa liggéey ci sa stock.' : 'Essayez d’élargir vos filtres ou publiez votre propre produit.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedRegion('all');
                    setOnlyArtisanal(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#00A86B] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isWo ? 'Wone lépp' : 'Réinitialiser'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    lang={lang}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onOpenDetails={setActiveProductDetail}
                    onOpenSellerShop={(seller) => setPublicShopTarget(seller)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 7. Special Berndé & Solidarité Magal de Touba Section */}
          <BerndeSection
            lang={lang}
            currency={currency}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            berndeProduct={berndeProduct}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        lang={lang}
        onSelectCategory={(cat) => {
          setCurrentView('marketplace');
          setSelectedCategory(cat);
          scrollToProducts();
        }}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenPostListing={() => setCurrentView('vendor')}
      />

      {/* 8. Mobile Bottom Navigation Dock matching screenshot */}
      <MobileBottomNav
        currentView={currentView}
        onNavigateHome={() => {
          setCurrentView('marketplace');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateStores={() => setIsDirectoryOpen(true)}
        onNavigateSearch={() => {
          setCurrentView('marketplace');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateVendor={() => setCurrentView('vendor')}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        lang={lang}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        currency={currency}
        lang={lang}
        onAddToCart={handleAddToCart}
        isFavorite={activeProductDetail ? favorites.includes(activeProductDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenSellerShop={(seller) => setPublicShopTarget(seller)}
        recommendedProducts={products.filter((p) => p.id !== activeProductDetail?.id)}
        onSelectRecommended={(p) => setActiveProductDetail(p)}
      />

      <PostListingModal
        isOpen={isPostListingOpen}
        onClose={() => setIsPostListingOpen(false)}
        lang={lang}
        onAddProduct={handleSaveVendorProduct}
      />

      <AddEditProductModal
        isOpen={isAddEditProductOpen}
        onClose={() => {
          setIsAddEditProductOpen(false);
          setProductToEdit(null);
        }}
        lang={lang}
        onSaveProduct={handleSaveVendorProduct}
        productToEdit={productToEdit}
        currentSeller={currentSellerObject}
      />

      <PublicShopModal
        isOpen={!!publicShopTarget}
        onClose={() => setPublicShopTarget(null)}
        seller={publicShopTarget}
        shopProfile={publicShopTarget?.id === shopProfile.id ? shopProfile : undefined}
        products={products}
        currency={currency}
        lang={lang}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onOpenProductDetails={setActiveProductDetail}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currency={currency}
        lang={lang}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        currency={currency}
        lang={lang}
      />

      <SellersDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        lang={lang}
        sellers={allSellers}
        onSelectSellerShop={(seller) => setPublicShopTarget(seller)}
      />
    </div>
  );
}
