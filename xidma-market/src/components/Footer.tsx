import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ShieldCheck, 
  RefreshCcw, 
  Truck,
  MessageCircle,
  Download
} from 'lucide-react';
import { Language, CategoryId } from '../types/marketplace';

interface FooterProps {
  lang: Language;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenDirectory: () => void;
  onOpenPostListing: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectCategory,
  onOpenDirectory,
  onOpenPostListing,
}) => {
  const isWo = lang === 'wo';

  return (
    <footer className="bg-[#081F17] text-[#A8C7B9] border-t border-[#143B2E] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Core Pillars Banner */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[#143B2E]">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#123B2C] text-[#D4AF37] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isWo ? 'Kóolute & Dëggu' : 'Éthique & Droiture'}
              </h4>
              <p className="text-xs text-[#7E9F90] mt-0.5">
                {isWo ? 'Yaxanto gu jub ci ndigëlu Serigne Touba' : 'Commerce transparent guidé par les valeurs mourides'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#123B2C] text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isWo ? 'WhatsApp Direct' : 'Lien Direct Artisans'}
              </h4>
              <p className="text-xs text-[#7E9F90] mt-0.5">
                {isWo ? 'Waaxtaan direct ak boroom liggéey bi' : 'Commandes et sur-mesure sans intermédiaire'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#123B2C] text-[#E6D5AC] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isWo ? 'Touba, Dakar & Diaspora' : 'Réseau Diaspora'}
              </h4>
              <p className="text-xs text-[#7E9F90] mt-0.5">
                {isWo ? 'Fret gaaw Paris, New York, Milan' : 'Livraisons locales et fret régulier à l’international'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#123B2C] text-[#D4AF37] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isWo ? 'Xidma & Berndé' : 'Soutien aux Daaras'}
              </h4>
              <p className="text-xs text-[#7E9F90] mt-0.5">
                {isWo ? 'Bokk ci barkelu alal ak teral talibe yi' : 'Une part des échanges contribue au bien commun'}
              </p>
            </div>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {/* Brand info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#D4AF37] flex items-center justify-center text-[#0C2B20] font-bold text-xs">
                XM
              </div>
              <span className="text-base font-extrabold text-white font-poppins tracking-tight">
                XIDMA<span className="text-[#D4AF37] font-extrabold ml-1">MARKET</span>
              </span>
            </div>
            <p className="text-xs text-[#8AAB9C] leading-relaxed">
              {isWo
                ? 'Plateforme communautaire bi dajale mbooleem talibe yi ci wàllu liggéey, xidma ak jaay ci barké Serigne Touba Khadimou Rassoul.'
                : 'La place de marché dédiée à la valorisation du travail et des savoir-faire des disciples de Cheikh Ahmadou Bamba.'}
            </p>
            <div className="text-xs text-[#D4AF37] font-medium italic pt-1">
              "Liggéey ci jamu Yàlla la bokk"
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              {isWo ? 'Fàcc yi' : 'Filières & Produits'}
            </h5>
            <ul className="space-y-1.5 text-xs text-[#7E9F90]">
              <li>
                <button 
                  onClick={() => onSelectCategory('terroir')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Kàfe Touba & Baol' : 'Café Touba & Terroir Baol'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('mode')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Baye Lahat & Boubou' : 'Boubous & Baye Lahat'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('artisanat')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Kuruus & Garabu Ébène' : 'Kourouss & Artisanat Sacré'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('edition')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Téere Xassaïd & Calligraphie' : 'Khassaïdes & Reliure Cuir'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('bernde')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Packs Berndé Magal' : 'Packs Berndé & Magal'}
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Sellers */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              {isWo ? 'Mouridisme & Xidma' : 'Services & Communauté'}
            </h5>
            <ul className="space-y-1.5 text-xs text-[#7E9F90]">
              <li>
                <button 
                  onClick={onOpenDirectory} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Boroom Liggéey yi' : 'Annuaire des Artisans'}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPostListing} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Bànk sa liggéey' : 'Publier une annonce / Xidma'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('services')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isWo ? 'Fret Diaspora & BTP' : 'Fret Diaspora (Paris, USA)'}
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/221770000000?text=Je%20souhaite%20enregistrer%20ma%20Dahira" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {isWo ? 'Dahira & Koureel' : 'Espace Dahiras & Koureels'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              {isWo ? 'Jokkoo ak Ndoxal' : 'Permanence & Contact'}
            </h5>
            <div className="space-y-2 text-xs text-[#7E9F90]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Touba Al-Mahmiya & Dakar (Sénégal)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a href="https://wa.me/221770000000" className="hover:text-white">
                  +221 77 000 00 00 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E6D5AC] shrink-0" />
                <span>contact@xidmamarket.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and project zip download */}
        <div className="pt-8 border-t border-[#143B2E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B8D7F] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>
              © {new Date().getFullYear()} Xidma Market. {isWo ? 'Lépp ngir barké Khadimou Rassoul.' : 'Tous droits réservés. Au service du travail et de la communauté Mouride.'}
            </p>
            <a
              href="/xidma-market.zip"
              download="xidma-market.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00A86B] hover:bg-[#008f5b] text-white text-xs font-semibold transition-all shadow-xs"
              title="Télécharger l'archive ZIP du code source"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le projet (.zip)</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Touba</span>
            <span aria-hidden="true">·</span>
            <span>Dakar</span>
            <span aria-hidden="true">·</span>
            <span>Paris</span>
            <span aria-hidden="true">·</span>
            <span>New York</span>
            <span aria-hidden="true">·</span>
            <span>Brescia / Milan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
