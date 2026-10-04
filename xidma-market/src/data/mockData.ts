import { Product, Seller, CategoryId, ShopProfile } from '../types/marketplace';

export const SECTORS = [
  { id: 'terroir', labelFr: 'Agroalimentaire & Terroir du Baol', labelWo: 'Kàfe Touba ak Xéewalu Baol' },
  { id: 'mode', labelFr: 'Couture, Mode & Boubous Mourides', labelWo: 'Ñawu Boubou ak Baye Lahat' },
  { id: 'artisanat', labelFr: 'Artisanat Sacré, Bois & Cuir', labelWo: 'Kuruus ak Ébène bu Touba' },
  { id: 'edition', labelFr: 'Édition, Khassaïdes & Calligraphie', labelWo: 'Mbindum Xassaïd ak Téere' },
  { id: 'services', labelFr: 'BTP, Bâtiment & Fret Diaspora', labelWo: 'Tabax ak Yonnee Bitim-réew' },
  { id: 'bernde', labelFr: 'Restauration, Berndé & Événements', labelWo: 'Berndé ak Ganale Magal' }
];

export const INITIAL_VENDOR_SHOP: ShopProfile = {
  id: 'seller-1',
  name: 'Serigne Fallou Ndiaye & Frères - Torréfaction Touba',
  tagline: 'L’excellence du Café Touba artisanal & des trésors du Baol depuis 2015',
  taglineWo: 'Kàfe Touba gu dëggu ci aada ak barké Khadimou Rassoul',
  description: 'Notre atelier familial est implanté au quartier 28 de Touba. Spécialisés dans la torréfaction traditionnelle au feu de bois du Café Touba au poivre de Selim (Djar pur trié à la main) et les produits naturels du terroir de Khelcom et du Baol. Notre engagement : la sincérité, la qualité et la sanctification du travail (Xidma).',
  descriptionWo: 'Sunu këru liggéey mi ngi Touba Quartier 28. Dafa yori xereñ ci xoor kàfe Touba ak djàr gu sell.',
  sector: 'Agroalimentaire & Terroir du Baol',
  sectorId: 'terroir',
  location: 'Touba (Quartier 28, près marché Ocass)',
  dahira: 'Dahira Rawdu Rayahin Touba',
  phoneWhatsApp: '+221775432190',
  email: 'contact@fallou-ndiaye-touba.sn',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  coverBannerUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
  experienceYears: 11,
  isVerified: true,
  openingHours: 'Lundi - Samedi : 08h00 - 20h00 (Vendredi pause Jumu\'ah)'
};

export const SELLERS: Record<string, Seller> = {
  'seller-1': {
    id: 'seller-1',
    name: 'Serigne Fallou Ndiaye & Frères',
    dahira: 'Dahira Rawdu Rayahin Touba',
    location: 'Touba (Quartier 28)',
    rating: 4.95,
    reviewsCount: 142,
    phoneWhatsApp: '+221775432190',
    isVerified: true,
    memberSince: '2021',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    badgeTitle: 'Maître Torréfacteur du Baol'
  },
  'seller-2': {
    id: 'seller-2',
    name: 'Atelier Sokhna Mame Diarra Couture',
    dahira: 'Dahira Mourtada Mbacké Dakar',
    location: 'Dakar (Sacré-Cœur & Sandaga)',
    rating: 4.98,
    reviewsCount: 210,
    phoneWhatsApp: '+221768899012',
    isVerified: true,
    memberSince: '2020',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    badgeTitle: 'Styliste Broderie Haute Qualité'
  },
  'seller-3': {
    id: 'seller-3',
    name: 'Daroul Khoudoss Ébénisterie & Chapelets',
    dahira: 'Kourel Khassaïdes Touba',
    location: 'Touba (Près de la Grande Mosquée)',
    rating: 4.92,
    reviewsCount: 88,
    phoneWhatsApp: '+221773456789',
    isVerified: true,
    memberSince: '2019',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    badgeTitle: 'Artisan d’Art Sacré'
  },
  'seller-4': {
    id: 'seller-4',
    name: 'Éditions Al-Boustane Touba',
    dahira: 'Majlis Khidma Touba',
    location: 'Touba Mosquée & Mbacké',
    rating: 4.99,
    reviewsCount: 312,
    phoneWhatsApp: '+221781234567',
    isVerified: true,
    memberSince: '2018',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    badgeTitle: 'Éditeur Certifié Khassaïdes'
  },
  'seller-5': {
    id: 'seller-5',
    name: 'GIE Agro-Xidma du Baol',
    dahira: 'Dahira Khelcom Liggéey',
    location: 'Bawol (Khelcom & Touba)',
    rating: 4.88,
    reviewsCount: 164,
    phoneWhatsApp: '+221772349081',
    isVerified: true,
    memberSince: '2022',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    badgeTitle: 'Producteurs Terroir Khelcom'
  },
  'seller-6': {
    id: 'seller-6',
    name: 'Al-Khidma Express Fret Diaspora',
    dahira: 'Fédération Mouride de France & USA',
    location: 'Paris (Château Rouge) / New York (Harlem) / Touba',
    rating: 4.96,
    reviewsCount: 420,
    phoneWhatsApp: '+33612345678',
    isVerified: true,
    memberSince: '2017',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    badgeTitle: 'Logistique & Fret Mondial'
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Café Touba Royal Authentique (Torréfaction Artisanale & Djar Pur)',
    titleWo: 'Kàfe Touba gu dëggu (Xoor ak Djàr gu sell)',
    description: 'Café Arabica et Robusta d’excellence torréfié au feu de bois selon le secret traditionnel de Touba. Parfumé au poivre de Guinée (Djar / Kani Djar) soigneusement trié et pilé. Goût corsé, tonifiant et bienfaisant.',
    descriptionWo: 'Kàfe Touba bu sell, defar ko ci aada Touba ak Djàr bu am solo. Dafa neex, dëgër te doli kàttan ci liggéey bi.',
    priceXOF: 3500,
    category: 'terroir',
    subCategory: 'Café & Infusions',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-1'],
    inStock: true,
    stockCount: 85,
    isArtisanal: true,
    origin: 'Touba 28',
    rating: 4.97,
    reviewsCount: 89,
    featured: true,
    tags: ['Café Touba', 'Djar', 'Bio', 'Touba', 'Terroir Baol'],
    specifications: {
      'Poids net': '500g (sachet zippé fraîcheur)',
      'Ingrédients': 'Café sélectionné, Djar (Xylopia aethiopica), Clou de girofle',
      'Torréfaction': 'Artisanale au feu doux à Touba',
      'Conservation': '12 mois au sec'
    }
  },
  {
    id: 'prod-2',
    title: 'Boubou Grand Bassin "Cheikh Ibrahima Fall" Brodé Main',
    titleWo: 'Yére Bazin bu mag "Cheikh Ibra Fall" ñawu loxo',
    description: 'Ensemble 3 pièces de prestige taillé dans un Bazin Getzner riche teint artisanalement à la main avec reflets soyeux. Broderie fil cordonnet dorée et argentée inspirée des portes sacrées de Darou Salam. Idéal pour les grands événements et vendredis.',
    descriptionWo: 'Njaareen gu reuy ci bazin riche, ñawal ko ak loxo ci aada yu rafet. Ku ko sol xam ne am nga yére bu sell.',
    priceXOF: 55000,
    category: 'mode',
    subCategory: 'Tenues Traditionnelles',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-2'],
    inStock: true,
    stockCount: 14,
    isArtisanal: true,
    origin: 'Dakar / Touba',
    rating: 4.99,
    reviewsCount: 64,
    featured: true,
    tags: ['Boubou', 'Bazin Riche', 'Baye Fall', 'Broderie Main', 'Couture Mouride'],
    specifications: {
      'Matière': 'Bazin Riche Getzner Authentique',
      'Pièces': '3 pièces (Grand boubou, tunique et pantalon)',
      'Finitions': 'Broderie artisanale haute densité',
      'Tailles disponibles': 'M, L, XL, XXL, Sur-mesure possible'
    }
  },
  {
    id: 'prod-3',
    title: 'Kourouss (Chapelet) 100 Grains en Bois d’Ébène Sacré de Touba',
    titleWo: 'Kuruus 100 téméer ci garabu ébène bu Touba',
    description: 'Chapelet traditionnel taillé et poli à la main par les maîtres artisans de Touba Darou Khoudoss. Grains réguliers au toucher soyeux avec séparateurs sculptés et pompon en fil de soie tissé. Conçu pour le Zikr quotidien et les Khassaïdes.',
    descriptionWo: 'Kuruus bu am daraja, loxo yu xereñ ño ko sàmp ci garab gu dëgër. Lu baax ci Zikr ak jaamu Yàlla.',
    priceXOF: 18000,
    category: 'artisanat',
    subCategory: 'Objets Sacrés & Bois',
    images: [
      'https://images.unsplash.com/photo-1584447141399-be2c178221a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-3'],
    inStock: true,
    stockCount: 22,
    isArtisanal: true,
    origin: 'Touba Darou Khoudoss',
    rating: 4.95,
    reviewsCount: 51,
    featured: true,
    tags: ['Kourouss', 'Chapelet', 'Ébène', 'Zikr', 'Touba'],
    specifications: {
      'Nombre de grains': '100 grains (33 / 34 / 33)',
      'Bois': 'Ébène d’Afrique poli sans vernis chimique',
      'Fil': 'Cordon haute résistance indéchirable',
      'Taille grains': '8 mm et 10 mm disponibles'
    }
  },
  {
    id: 'prod-4',
    title: 'Recueil Majmu’at Al-Qasaid (Reliure Luxe Cuir Doré à Chaud)',
    titleWo: 'Téere Xassaïd Majmu’at (Cuir bu rafet ak dorure)',
    description: 'Édition complète et vérifiée des Khassaïdes de Cheikh Ahmadou Bamba (Mawaahibou, Matlabul Fawzayni, Sindidi, Asma’u Ahlil Badr...). Calligraphie maghrébine et orientale soignée, dorure sur tranche et papier crème anti-reflet.',
    descriptionWo: 'Téere Xassaïd yu Cheikhoul Khadim yi gën a siw, binde ko ci mbind mu leer te rafet. Ku ko yor am nga barke.',
    priceXOF: 25000,
    category: 'edition',
    subCategory: 'Khassaïdes & Ouvrages',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-4'],
    inStock: true,
    stockCount: 40,
    isArtisanal: true,
    origin: 'Touba Mosquée',
    rating: 5.0,
    reviewsCount: 112,
    featured: true,
    tags: ['Khassaïdes', 'Serigne Touba', 'Livre', 'Reliure Cuir', 'Spiritualité'],
    specifications: {
      'Volume': 'Tome Unique (Plus de 650 pages)',
      'Reliure': 'Cuir véritable teinté vert émeraude & or',
      'Langue': 'Arabe vocalise avec index thématique',
      'Édition': 'Al-Boustane Touba Al-Mahmiya'
    }
  },
  {
    id: 'prod-5',
    title: 'Huile d’Arachide Pure de Terroir Pressée à Froid (Bidon 5L)',
    titleWo: 'Diwu Gerte gu sell gu Baol (5 Litres)',
    description: 'Huile d’arachide vierge artisanale produite directement dans le bassin arachidier du Baol (Khelcom / Touba). Pressage à froid sans raffinage chimique, préservant toutes les vitamines et le goût authentique du Sénégal.',
    descriptionWo: 'Diwu gerte bu sell, ñu génne ko ci gerte gu neex te amul benn produit chimique. Saf sap ci togg.',
    priceXOF: 9500,
    category: 'terroir',
    subCategory: 'Huiles & Condiments',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-5'],
    inStock: true,
    stockCount: 60,
    isArtisanal: true,
    origin: 'Khelcom / Touba',
    rating: 4.89,
    reviewsCount: 78,
    tags: ['Huile Arachide', 'Baol', 'Khelcom', 'Naturel', 'Cuisine'],
    specifications: {
      'Contenance': 'Bidon alimentaire 5 Litres',
      'Origine': 'Arachides sélectionnées de Khelcom',
      'Procédé': 'Première pression mécanique à froid',
      'Usage': 'Cuisson, assaisonnement, santé'
    }
  },
  {
    id: 'prod-6',
    title: 'Baye Lahat Authentique en Coton Tissé Lourd "Bamba Feep"',
    titleWo: 'Baye Lahat Coton bu dëgër "Bamba Feep"',
    description: 'La tunique emblématique de la piété et du travail dévoué (Xidma). Tissu 100% coton lourd tissé artisanalement au Sénégal, coutures renforcées, poches profondes. Vêtement de fierté mouride porté avec dignité.',
    descriptionWo: 'Baye Lahat bu dëgër, coton bu sell bi ñu ràbb ci loxo. Yére liggéey ak yére teddanga la.',
    priceXOF: 22000,
    category: 'mode',
    subCategory: 'Tenues Baye Fall & Mourides',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-2'],
    inStock: true,
    stockCount: 18,
    isArtisanal: true,
    origin: 'Thiès / Touba',
    rating: 4.96,
    reviewsCount: 47,
    tags: ['Baye Lahat', 'Coton Tissé', 'Baye Fall', 'Touba Style'],
    specifications: {
      'Tissu': '100% Coton local sénégalais tissé main',
      'Coupe': 'Ample traditionnelle avec fentes latérales',
      'Poches': '2 poches latérales profondes + 1 poche poitrine',
      'Couleurs': 'Blanc écru naturel, Kaki, Noir ébène'
    }
  },
  {
    id: 'prod-7',
    title: 'Pack Berndé Magal : Céréales Arraw, Thiakry Baol, Sirop Bissap & Dattes',
    titleWo: 'Paas Berndé Magal : Araw, Caakri Baol, Sirop Bisaap ak Tàndarma',
    description: 'Pack complet spécialement conçu pour honorer l’hospitalité mouride (Berndé). Contient 5kg d’Arraw de mil tamisé, 5kg de Thiakry précuit vapeur, 3 bouteilles de concentré de Bissap rouge bio, et 2kg de dattes fraîches de Médine.',
    descriptionWo: 'Paas bu mat sëkk ngir waajal Berndé yi. Gan yi dinañu kontaan, li lépp ci liggéeyu loxo la génne.',
    priceXOF: 32000,
    category: 'bernde',
    subCategory: 'Packs Hospitalité & Événements',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-5'],
    inStock: true,
    stockCount: 30,
    isArtisanal: true,
    origin: 'Bawol & Touba',
    rating: 4.98,
    reviewsCount: 95,
    featured: true,
    tags: ['Berndé', 'Magal Touba', 'Hospitalité', 'Arraw', 'Thiakry', 'Bissap'],
    specifications: {
      'Composition': '5kg Arraw mil + 5kg Thiakry + 3x1L Bissap pur + 2kg Dattes',
      'Nombre de convives': 'Idéal pour régaler 40 à 50 convives lors du Berndé',
      'Emballage': 'Carton hermétique prêt à transporter ou expédier',
      'Origine': 'Céréales cultivées dans le Baol'
    }
  },
  {
    id: 'prod-8',
    title: 'Bakhour Touba Traditionnel au Musc Noir & Bois d’Agar (Encens Royal)',
    titleWo: 'Bàxooru Touba Musc ak Agar bu xeeñ neex',
    description: 'Mélange raffiné de copeaux de bois de santal et oud infusés dans des huiles parfumées nobles sans alcool (musc noir, ambre et rose de Taëf). Crée une atmosphère spirituelle apaisante dans la maison ou la Dahira.',
    descriptionWo: 'Bàxoor bu am xet gu neex, defar ko ci pajar ak oud bu sell. Dafa yéwénël kër gi te indi jàmm.',
    priceXOF: 7000,
    category: 'artisanat',
    subCategory: 'Parfums & Encens',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-3'],
    inStock: true,
    stockCount: 45,
    isArtisanal: true,
    origin: 'Touba Darou Marnane',
    rating: 4.94,
    reviewsCount: 53,
    tags: ['Bakhour', 'Encens', 'Musc', 'Touba', 'Senteur'],
    specifications: {
      'Poids net': '250g en pot de verre hermétique',
      'Base': 'Copeaux de bois aromatique et résines naturelles',
      'Formule': '100% sans alcool ni solvants synthétiques',
      'Durée combustion': 'Diffusion longue durée'
    }
  },
  {
    id: 'prod-9',
    title: 'Service Fret & Colis Express : Diaspora (France/USA/Italie) ↔ Touba & Dakar',
    titleWo: 'Kureelu Yonnee ak Fret : Bitim-réew (France/USA/Italie) ↔ Touba & Ndakaaru',
    description: 'Service de transport logistique rapide et fiable assuré par des disciples de confiance. Envoi régulier hebdomadaire par avion et groupage maritime. Gestion des colis commerciaux, bagages, livres, denrées et matériel pour Touba.',
    descriptionWo: 'Yonnee say pos ak say yaxanto ci kóolute gu mat sëkk ci diggante bitim-réew ak Senegaal.',
    priceXOF: 15000,
    category: 'services',
    subCategory: 'Logistique & Fret Diaspora',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-6'],
    inStock: true,
    stockCount: 999,
    isArtisanal: false,
    origin: 'Paris / New York / Touba',
    rating: 4.97,
    reviewsCount: 380,
    isService: true,
    tags: ['Fret', 'Diaspora', 'Colis', 'Touba', 'France', 'USA'],
    specifications: {
      'Tarif de base': 'À partir de 15 000 FCFA (23€) le kilo express',
      'Délais': 'Avion: 3 à 5 jours ouvrés / Bateau: 25 jours',
      'Suivi': 'Tracking en ligne & notification WhatsApp',
      'Destinations': 'Dakar, Touba, Mbacké, Kaolack, Saint-Louis'
    }
  },
  {
    id: 'prod-10',
    title: 'Service BTP & Rénovation Xidma : Construction de Villas & Daaras',
    titleWo: 'Liggéeyu Tabax ak Rénovation : Tabax kër ak Daara yu teey',
    description: 'Équipe d’artisans maçons, carreleurs, électriciens et plâtriers réunis autour des valeurs de rigueur et d’honnêteté mouride. Devis transparent, respect des délais, suivi vidéo de chantier pour les clients de la diaspora.',
    descriptionWo: 'Ñi xereñ ci tabax, ñu dëggu ci wax ak jëf. Su fekkee yaa ngi bitim-réew, da ngay am vidéo yu wone ni sa kër di tabaxe.',
    priceXOF: 50000,
    category: 'services',
    subCategory: 'BTP & Construction',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-1'],
    inStock: true,
    stockCount: 10,
    isArtisanal: false,
    origin: 'Touba & Régions',
    rating: 4.93,
    reviewsCount: 39,
    isService: true,
    tags: ['BTP', 'Construction', 'Touba', 'Maison', 'Diaspora'],
    specifications: {
      'Engagement': 'Contrat écrit, garantie décennale, honnêteté certifiée',
      'Reporting': 'Point vidéo WhatsApp hebdomadaire pour la diaspora',
      'Zones': 'Touba, Mbacké, Dakar, Thiès, Kaolack',
      'Types': 'Gros œuvre, carrelage, staff marocain, étanchéité'
    }
  },
  {
    id: 'prod-11',
    title: 'Tableau Calligraphie Murale Décorative : "Khadimou Rassoul" Or & Bois Massif',
    titleWo: 'Nataal Calligraphie bu rafet : "Xaadimou Rasool" ci wurus ak garab',
    description: 'Splendide œuvre d’art calligraphique réalisée à la plume sur fond velours émeraude, sculptée sur cadre en bois noble sénégalais avec incrustations de feuille d’or. Fait rayonner la bénédiction et la paix dans votre salon ou bureau.',
    descriptionWo: 'Nataal bu yéeme, binde ko ak wurus ci mbind mu rafet. Lu war a nekk ci kër mbooleem talibe.',
    priceXOF: 45000,
    category: 'edition',
    subCategory: 'Art & Calligraphie',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-3'],
    inStock: true,
    stockCount: 8,
    isArtisanal: true,
    origin: 'Touba Mosquée',
    rating: 4.98,
    reviewsCount: 32,
    tags: ['Calligraphie', 'Art Islamique', 'Khadimou Rassoul', 'Déco', 'Touba'],
    specifications: {
      'Dimensions': '80 cm x 50 cm',
      'Cadre': 'Bois massif sculpté artisanalement',
      'Technique': 'Feuille d’or 24 carats sur fond velours vert',
      'Poids': '3.2 kg (attaches murales renforcées incluses)'
    }
  },
  {
    id: 'prod-12',
    title: 'Miel Sauvage Pur des Forêts du Baol & Casamance (Pot 1kg)',
    titleWo: 'Lem bu sell bu àllu Baol ak Casamance (1 Kilo)',
    description: 'Miel 100% brut récolté dans les ruches sauvages préservées. Non pasteurisé, non coupé, riche en enzymes vivantes, propolis et arômes floraux intenses. Un remède naturel et une douceur bénie.',
    descriptionWo: 'Lem bu sell te dëggu, amul suukar lu dul lu njobaax bi def. Garab gu baax la ci yaram.',
    priceXOF: 6500,
    category: 'terroir',
    subCategory: 'Miels & Santé Naturelle',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    seller: SELLERS['seller-5'],
    inStock: true,
    stockCount: 42,
    isArtisanal: true,
    origin: 'Baol / Casamance',
    rating: 4.91,
    reviewsCount: 41,
    tags: ['Miel', 'Pur', 'Santé', 'Bio', 'Sénégal'],
    specifications: {
      'Poids': '1 000g net en bocal verre',
      'Nature': 'Miel polyfloral d’acacia et de baobab',
      'Origine': 'Récolte solidaire en milieu naturel',
      'Garantie': 'Analysé sans sucre ajouté ni conservateur'
    }
  }
];

export const CATEGORIES: { id: CategoryId; labelFr: string; labelWo: string; count: number; icon: string }[] = [
  { id: 'all', labelFr: 'Tous les produits & services', labelWo: 'Lépp lu fi nekk', count: 12, icon: 'LayoutGrid' },
  { id: 'terroir', labelFr: 'Café Touba & Terroir Baol', labelWo: 'Kàfe Touba ak Xéewal', count: 3, icon: 'Coffee' },
  { id: 'mode', labelFr: 'Mode & Boubous Mourides', labelWo: 'Yére & Baye Lahat', count: 2, icon: 'Sparkles' },
  { id: 'artisanat', labelFr: 'Artisanat Sacré & Kourouss', labelWo: 'Kuruus ak Ébène', count: 2, icon: 'Gem' },
  { id: 'edition', labelFr: 'Khassaïdes & Calligraphie', labelWo: 'Xassaïd & Téere', count: 2, icon: 'BookOpen' },
  { id: 'services', labelFr: 'Services, BTP & Fret Diaspora', labelWo: 'Liggéey ak Yonnee', count: 2, icon: 'Truck' },
  { id: 'bernde', labelFr: 'Espace Berndé & Magal', labelWo: 'Berndé ak Ganale', count: 1, icon: 'HeartHandshake' }
];

export const WISDOM_QUOTES = [
  {
    wolof: "Liggéey ci jamu Yàlla la bokk — ku liggéey te jub, Yàlla dina la teral fi ak ëllëg.",
    french: "Le travail fait partie intégrante de l'adoration de Dieu. Quiconque travaille avec droiture sera honoré ici-bas et dans l'au-delà.",
    author: "Cheikh Ahmadou Bamba (Khadimou Rassoul)"
  },
  {
    wolof: "Bul def li nga xam ne bu subaa dina la jaxal. Na sa yaxanto tegu ci dëgg ak kóolute.",
    french: "Ne commets aucun acte qui te causerait du remords demain. Fonde ton commerce sur la vérité et la loyauté inébranlable.",
    author: "Enseignement de Serigne Touba aux commerçants"
  },
  {
    wolof: "Jàppal sa mbokk talibe, dimbeli ko ci sa alal ak sa kàttan, ndax li nuy séq dafa sell.",
    french: "Soutiens ton frère disciple, épaule-le avec tes biens et ton énergie, car le lien qui nous unit est sacré.",
    author: "Principe de la Xidma & de l'Entraide Mouride"
  },
  {
    wolof: "Berndé du réer, ku ko def ngir Yàlla ak Khadimou Rassoul, xéewal yépp dina la fekk.",
    french: "L'hospitalité (Berndé) ne s'égare jamais : celui qui l'accomplit pour Dieu et pour Khadimou Rassoul recevra toutes les grâces.",
    author: "Valeur fondamentale de l'Hospitalité Mouride"
  }
];

export const COMMUNITY_STATS = [
  { number: '1 250+', labelFr: 'Artisans & Producteurs', labelWo: 'Boroom liggéey yi' },
  { number: '45 000+', labelFr: 'Commandes Livrées', labelWo: 'Kóllëre yu jaar' },
  { number: '28', labelFr: 'Pays de la Diaspora Connectés', labelWo: 'Réewi bitim-réew' },
  { number: '100%', labelFr: 'Engagement Xidma & Droiture', labelWo: 'Jub ak Kóolute' }
];

export const EXCHANGE_RATES: Record<string, number> = {
  XOF: 1,
  EUR: 0.001524, // 1 EUR = 655.957 XOF
  USD: 0.001667  // 1 USD ~ 600 XOF
};
