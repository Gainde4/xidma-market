import React, { useState } from 'react';
import { HeartHandshake, Coffee, Gift, ShieldCheck, Check, Sparkles, Send } from 'lucide-react';
import { Currency, Language, Product } from '../types/marketplace';
import { formatCurrency } from '../utils/formatters';

interface BerndeSectionProps {
  lang: Language;
  currency: Currency;
  onAddToCart: (product: Product, quantity?: number) => void;
  berndeProduct?: Product;
}

export const BerndeSection: React.FC<BerndeSectionProps> = ({
  lang,
  currency,
  onAddToCart,
  berndeProduct,
}) => {
  const isWo = lang === 'wo';
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgePack, setPledgePack] = useState('pack-daara');

  const packs = [
    {
      id: 'pack-daara',
      nameFr: 'Parrainage Daara Touba (Petit-déjeuner & Café)',
      nameWo: 'Dimbeli Daara Touba (Ndogu ak Kàfe)',
      descFr: 'Offre 15kg de Café Touba + Sucre + Pain aux enfants talibés des Daaras de Touba.',
      descWo: 'Jox xale talibe yi kàfe Touba, suukar ak mburu ngir suba teel.',
      amountXOF: 25000,
      icon: Coffee
    },
    {
      id: 'pack-repas',
      nameFr: 'Grand Berndé Pèlerins (Denrées & Céréales)',
      nameWo: 'Berndé Gan yi (Céréales ak Dagg)',
      descFr: 'Pack de céréales Baol (Arraw, Thiakry, Huile) pour accueillir les dahiras et pèlerins.',
      descWo: 'Araw, Caakri ak diwu gerte ngir teral gan yi ci teddanga.',
      amountXOF: 50000,
      icon: Gift
    },
    {
      id: 'pack-sante',
      nameFr: 'Kit Soin & Eau Bénie (Khidma Santé Magal)',
      nameWo: 'Paas Wér-gu-yaram ak Ndoxum Maymouna',
      descFr: 'Packs de bouteilles d’eau minérale, masques et pharmacie de premier secours pour les volontaires.',
      descWo: 'Ndox ak garab ngir xeeyal ñi di liggéey ci yoonu Serigne bi.',
      amountXOF: 15000,
      icon: HeartHandshake
    }
  ];

  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSubmitted(true);
    setTimeout(() => setPledgeSubmitted(false), 3000);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#FAF6EE] to-[#F2EDE1] border-b border-[#E5DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#165B43]/10 text-[#165B43] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isWo ? 'Berndé ak Ganale ci Yoonu Mouride' : 'Espace Berndé & Solidarité Communautaire'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A22] font-poppins tracking-tight">
            {isWo 
              ? 'Teral Gan yi ak Jàppale Daara yi ci Khelcom ak Touba'
              : 'Honorez la Tradition du Berndé & Soutenez les Daaras'}
          </h2>

          <p className="text-sm text-[#5C6E64] leading-relaxed">
            {isWo
              ? 'Cheikh Ahmadou Bamba dafa sàntane teral gan yi. Joxe sa cassa, jënd say denrées ci boroom liggéey yu dëggu, walla nga yonnee parrainage direct ba Touba.'
              : 'L’hospitalité sacrée (Berndé) est le pilier de l’accueil mouride lors du Grand Magal et des cérémonies. Commandez vos denrées en gros ou offrez un pack solidaire aux Daaras de Touba.'}
          </p>
        </div>

        {/* 3 Pillars / Packs */}
        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((pack) => {
            const Icon = pack.icon;
            const isSelected = pledgePack === pack.id;
            return (
              <div
                key={pack.id}
                onClick={() => setPledgePack(pack.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#165B43] shadow-md ring-1 ring-[#165B43]'
                    : 'border-[#E4DCCE] hover:border-[#B7CFC0]'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#165B43] flex items-center justify-center mb-4 border border-[#E8DFCFA]">
                    <Icon className="w-6 h-6 text-[#165B43]" />
                  </div>

                  <h3 className="text-base font-bold text-[#1B2A22] mb-1">
                    {isWo ? pack.nameWo : pack.nameFr}
                  </h3>

                  <p className="text-xs text-[#6A7B71] leading-relaxed mb-4">
                    {isWo ? pack.descWo : pack.descFr}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE0] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-[#889B90] font-semibold">
                      {isWo ? 'Xaalis bi :' : 'Contribution :'}
                    </div>
                    <div className="text-base font-extrabold text-[#165B43]">
                      {formatCurrency(pack.amountXOF, currency)}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/221770000000?text=${encodeURIComponent(
                      `As-salamu alaykum, je souhaite contribuer pour le *${pack.nameFr}* (${pack.amountXOF} FCFA) via Xidma Market.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-[#165B43] hover:bg-[#1E7456] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{isWo ? 'Joxe cassa' : 'Participer'}</span>
                    <Send className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Magal Berndé Official Box Banner */}
        {berndeProduct && (
          <div className="mt-8 p-6 bg-gradient-to-r from-[#0C2B20] to-[#154633] rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#1D5440]">
            <div className="flex items-center gap-4">
              <img
                src={berndeProduct.images[0]}
                alt={berndeProduct.title}
                className="w-20 h-20 rounded-xl object-cover border border-[#2B7358] shrink-0"
              />
              <div>
                <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {isWo ? 'Paas bu mat sëkk ngir Berndé' : 'Pack Officiel Grand Magal'}
                </div>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {isWo ? berndeProduct.titleWo : berndeProduct.title}
                </h4>
                <p className="text-xs text-[#A8C7B9] mt-1 max-w-xl">
                  {isWo ? berndeProduct.descriptionWo : berndeProduct.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-[#A8C7B9]">{isWo ? 'Njëg li :' : 'Prix du pack :'}</div>
                <div className="text-xl font-extrabold text-[#D4AF37]">
                  {formatCurrency(berndeProduct.priceXOF, currency)}
                </div>
              </div>
              <button
                onClick={() => onAddToCart(berndeProduct, 1)}
                className="px-5 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0C2B20] font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
              >
                {isWo ? 'Doli ci sama pos' : 'Ajouter ce pack'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
