export type CategoryId = 'all' | 'terroir' | 'artisanat' | 'mode' | 'edition' | 'services' | 'bernde';

export type Currency = 'XOF' | 'EUR' | 'USD';

export type Language = 'fr' | 'wo';

export interface Seller {
  id: string;
  name: string;
  dahira?: string;
  location: string;
  rating: number;
  reviewsCount: number;
  phoneWhatsApp: string;
  isVerified: boolean;
  memberSince: string;
  avatar: string;
  badgeTitle?: string;
  description?: string;
  sector?: string;
  coverBannerUrl?: string;
}

export interface ShopProfile {
  id: string;
  name: string;
  tagline: string;
  taglineWo?: string;
  description: string;
  descriptionWo?: string;
  sector: string;
  sectorId: CategoryId;
  location: string;
  dahira?: string;
  phoneWhatsApp: string;
  email?: string;
  avatarUrl: string;
  coverBannerUrl: string;
  experienceYears: number;
  isVerified: boolean;
  openingHours?: string;
}

export interface Product {
  id: string;
  title: string;
  titleWo: string;
  description: string;
  descriptionWo: string;
  priceXOF: number;
  category: CategoryId;
  subCategory: string;
  images: string[];
  seller: Seller;
  inStock: boolean;
  stockCount: number;
  isArtisanal: boolean;
  origin: string; // e.g. "Touba Bakhdad", "Dakar - Marché Sandaga", "Thiès"
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  tags: string[];
  specifications: { [key: string]: string };
  isService?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface NewListingFormData {
  title: string;
  titleWo?: string;
  category: CategoryId;
  subCategory: string;
  priceXOF: number;
  description: string;
  origin: string;
  sellerName: string;
  dahira?: string;
  phoneWhatsApp: string;
  imageUrl: string;
  isService: boolean;
}
