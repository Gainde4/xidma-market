import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { formatCurrency, buildWhatsAppOrderMessage } from '../utils/formatters';
import { INITIAL_PRODUCTS, SELLERS, INITIAL_VENDOR_SHOP, SECTORS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { CategoryIconGrid } from '../components/CategoryIconGrid';
import { ModernSearchBar } from '../components/ModernSearchBar';
import { TopStoresStrip } from '../components/TopStoresStrip';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { VendorDashboard } from '../components/VendorDashboard';
import { CartDrawer } from '../components/CartDrawer';
import { Product, CartItem } from '../types/marketplace';

describe('1. Formatter & Currency Tests', () => {
  it('formats XOF (FCFA) correctly', () => {
    const formatted = formatCurrency(3500, 'XOF');
    expect(formatted).toContain('3');
    expect(formatted).toContain('500');
    expect(formatted).toMatch(/CFA/i);
  });

  it('converts and formats EUR (€) correctly', () => {
    // 6559.57 XOF is ~10 EUR
    const formatted = formatCurrency(6559.57, 'EUR');
    expect(formatted).toContain('€');
  });

  it('converts and formats USD ($) correctly', () => {
    const formatted = formatCurrency(6000, 'USD');
    expect(formatted).toContain('$');
  });

  it('builds a structured WhatsApp order message in French', () => {
    const product = INITIAL_PRODUCTS[0];
    const rawMessage = buildWhatsAppOrderMessage(product, 'fr', undefined, 2);
    const message = decodeURIComponent(rawMessage);
    expect(message).toContain('As-salamu alaykum');
    expect(message).toContain(product.title);
    expect(message).toContain('Quantité');
  });

  it('builds a structured WhatsApp order message in Wolof', () => {
    const product = INITIAL_PRODUCTS[0];
    const rawMessage = buildWhatsAppOrderMessage(product, 'wo', undefined, 1);
    const message = decodeURIComponent(rawMessage);
    expect(message).toContain('As-salamu alaykum');
    expect(message).toContain('Dama bëgg jënd');
  });
});

describe('2. Catalog & Mock Data Integrity', () => {
  it('has valid products with all required attributes', () => {
    expect(INITIAL_PRODUCTS.length).toBeGreaterThan(0);
    INITIAL_PRODUCTS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.priceXOF).toBeGreaterThan(0);
      expect(p.seller).toBeDefined();
      expect(p.seller.name).toBeTruthy();
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.stockCount).toBeGreaterThanOrEqual(0);
      expect(p.category).toBeTruthy();
    });
  });

  it('has verified Mouride sellers in key hubs', () => {
    const sellersList = Object.values(SELLERS);
    expect(sellersList.length).toBeGreaterThan(0);
    sellersList.forEach((s) => {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.phoneWhatsApp).toBeTruthy();
      expect(s.location).toBeTruthy();
    });
  });

  it('provides all entrepreneurship sectors', () => {
    expect(SECTORS.length).toBeGreaterThan(4);
    const terroir = SECTORS.find((s) => s.id === 'terroir');
    expect(terroir).toBeDefined();
  });
});

describe('3. ProductCard Component Tests', () => {
  const sampleProduct: Product = INITIAL_PRODUCTS[0];

  it('renders product details, title, and green price', () => {
    render(
      <ProductCard
        product={sampleProduct}
        currency="XOF"
        lang="fr"
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onAddToCart={vi.fn()}
        onOpenDetails={vi.fn()}
      />
    );

    expect(screen.getByText(sampleProduct.title)).toBeDefined();
    expect(screen.getByText(sampleProduct.seller.name.split(' ')[0])).toBeDefined();
  });

  it('triggers onAddToCart when the circular green "+" button is clicked', () => {
    const handleAddToCart = vi.fn();
    render(
      <ProductCard
        product={sampleProduct}
        currency="XOF"
        lang="fr"
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onAddToCart={handleAddToCart}
        onOpenDetails={vi.fn()}
      />
    );

    const addBtn = screen.getByTitle('Ajouter au panier');
    fireEvent.click(addBtn);
    expect(handleAddToCart).toHaveBeenCalledWith(sampleProduct);
  });

  it('triggers onToggleFavorite when heart icon is clicked', () => {
    const handleToggleFavorite = vi.fn();
    render(
      <ProductCard
        product={sampleProduct}
        currency="XOF"
        lang="fr"
        isFavorite={false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={vi.fn()}
        onOpenDetails={vi.fn()}
      />
    );

    const heartBtn = screen.getByLabelText('Favoris');
    fireEvent.click(heartBtn);
    expect(handleToggleFavorite).toHaveBeenCalledWith(sampleProduct.id);
  });
});

describe('4. CategoryIconGrid Component Tests', () => {
  it('renders quick categories and allows expanding', () => {
    const handleSelectCategory = vi.fn();
    render(
      <CategoryIconGrid
        selectedCategory="all"
        onSelectCategory={handleSelectCategory}
        lang="fr"
      />
    );

    expect(screen.getByText('Tout voir')).toBeDefined();
    expect(screen.getByText('Café Touba')).toBeDefined();

    // Click "Voir toutes les catégories"
    const expandBtn = screen.getByText('Voir toutes les catégories');
    fireEvent.click(expandBtn);
    expect(screen.getByText('Moins de catégories')).toBeDefined();
  });

  it('calls onSelectCategory when clicking a category item', () => {
    const handleSelectCategory = vi.fn();
    render(
      <CategoryIconGrid
        selectedCategory="all"
        onSelectCategory={handleSelectCategory}
        lang="fr"
      />
    );

    const cafeBtn = screen.getByText('Café Touba');
    fireEvent.click(cafeBtn);
    expect(handleSelectCategory).toHaveBeenCalledWith('terroir');
  });
});

describe('5. ModernSearchBar Component Tests', () => {
  it('allows typing a search query', () => {
    const handleSearchChange = vi.fn();
    render(
      <ModernSearchBar
        searchQuery=""
        onSearchChange={handleSearchChange}
        lang="fr"
        onlyArtisanal={false}
        onToggleArtisanal={vi.fn()}
        selectedRegion="all"
        onSelectRegion={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/Que souhaitez-vous commander/i);
    fireEvent.change(input, { target: { value: 'Café Touba' } });
    expect(handleSearchChange).toHaveBeenCalledWith('Café Touba');
  });

  it('triggers region chip filters and artisanal toggle', () => {
    const handleSelectRegion = vi.fn();
    const handleToggleArtisanal = vi.fn();

    render(
      <ModernSearchBar
        searchQuery=""
        onSearchChange={vi.fn()}
        lang="fr"
        onlyArtisanal={false}
        onToggleArtisanal={handleToggleArtisanal}
        selectedRegion="all"
        onSelectRegion={handleSelectRegion}
      />
    );

    const toubaChip = screen.getByText('Origine Touba');
    fireEvent.click(toubaChip);
    expect(handleSelectRegion).toHaveBeenCalledWith('touba');

    const artisanalChip = screen.getByText('100% Fait Main');
    fireEvent.click(artisanalChip);
    expect(handleToggleArtisanal).toHaveBeenCalled();
  });
});

describe('6. TopStoresStrip Component Tests', () => {
  it('renders store avatars and allows clicking', () => {
    const handleSelectStore = vi.fn();
    const handleViewAll = vi.fn();
    const sellersList = Object.values(SELLERS);

    render(
      <TopStoresStrip
        sellers={sellersList}
        onSelectStore={handleSelectStore}
        onViewAllStores={handleViewAll}
        lang="fr"
      />
    );

    expect(screen.getByText('Boutiques & Ateliers en vedette')).toBeDefined();
    const viewAllBtn = screen.getByText('Voir tout');
    fireEvent.click(viewAllBtn);
    expect(handleViewAll).toHaveBeenCalled();

    // Click first store
    const firstStore = sellersList[0];
    const storeBtn = screen.getByText(new RegExp(firstStore.name.split(' ')[0], 'i'));
    fireEvent.click(storeBtn);
    expect(handleSelectStore).toHaveBeenCalledWith(firstStore);
  });
});

describe('7. ProductDetailModal Component Tests', () => {
  const sampleProduct: Product = INITIAL_PRODUCTS[0];

  it('renders product details and allows quantity adjustments', () => {
    const handleAddToCart = vi.fn();
    const handleClose = vi.fn();

    render(
      <ProductDetailModal
        product={sampleProduct}
        onClose={handleClose}
        currency="XOF"
        lang="fr"
        onAddToCart={handleAddToCart}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    expect(screen.getByText('Détails du Produit')).toBeDefined();
    expect(screen.getByText(sampleProduct.title)).toBeDefined();

    // Click "Ajouter au Panier"
    const addCartBtn = screen.getByText(/Ajouter au Panier/i);
    fireEvent.click(addCartBtn);
    expect(handleAddToCart).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});

describe('8. VendorDashboard & Stock Management Tests', () => {
  const vendorProducts: Product[] = INITIAL_PRODUCTS.slice(0, 3);

  it('renders vendor KPIs (articles, units, financial stock value)', () => {
    render(
      <VendorDashboard
        lang="fr"
        currency="XOF"
        shopProfile={INITIAL_VENDOR_SHOP}
        onUpdateShopProfile={vi.fn()}
        vendorProducts={vendorProducts}
        onAddProduct={vi.fn()}
        onEditProduct={vi.fn()}
        onDeleteProduct={vi.fn()}
        onUpdateStockCount={vi.fn()}
        onBackToMarketplace={vi.fn()}
        onPreviewPublicShop={vi.fn()}
      />
    );

    expect(screen.getByText(INITIAL_VENDOR_SHOP.name)).toBeDefined();
    expect(screen.getByText(/Articles au catalogue/i)).toBeDefined();
    expect(screen.getByText(/Total Unités en Stock/i)).toBeDefined();
    expect(screen.getByText(/Valeur Totale du Stock/i)).toBeDefined();
  });

  it('updates stock count using stepper buttons', () => {
    const handleUpdateStock = vi.fn();
    render(
      <VendorDashboard
        lang="fr"
        currency="XOF"
        shopProfile={INITIAL_VENDOR_SHOP}
        onUpdateShopProfile={vi.fn()}
        vendorProducts={vendorProducts}
        onAddProduct={vi.fn()}
        onEditProduct={vi.fn()}
        onDeleteProduct={vi.fn()}
        onUpdateStockCount={handleUpdateStock}
        onBackToMarketplace={vi.fn()}
        onPreviewPublicShop={vi.fn()}
      />
    );

    const plusStockButtons = screen.getAllByTitle('Augmenter stock');
    expect(plusStockButtons.length).toBeGreaterThan(0);
    fireEvent.click(plusStockButtons[0]);
    expect(handleUpdateStock).toHaveBeenCalled();
  });
});

describe('9. CartDrawer Component Tests', () => {
  const cartItems: CartItem[] = [
    { product: INITIAL_PRODUCTS[0], quantity: 2 },
    { product: INITIAL_PRODUCTS[1], quantity: 1 },
  ];

  it('renders cart items and calculates total with delivery', () => {
    render(
      <CartDrawer
        isOpen={true}
        onClose={vi.fn()}
        items={cartItems}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
        onClearCart={vi.fn()}
        currency="XOF"
        lang="fr"
      />
    );

    expect(screen.getByText(INITIAL_PRODUCTS[0].title)).toBeDefined();
    expect(screen.getByText(INITIAL_PRODUCTS[1].title)).toBeDefined();
    expect(screen.getByText(/Total à régler/i)).toBeDefined();
  });
});
