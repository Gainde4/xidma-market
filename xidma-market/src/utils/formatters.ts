import { Currency, Language, Product } from '../types/marketplace';
import { EXCHANGE_RATES } from '../data/mockData';

export function formatCurrency(amountXOF: number, currency: Currency): string {
  if (currency === 'XOF') {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0
    }).format(amountXOF);
  }

  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = amountXOF * rate;

  return new Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(converted);
}

export function buildWhatsAppOrderMessage(
  product: Product,
  lang: Language,
  customerName?: string,
  quantity = 1,
  address?: string
): string {
  const isWo = lang === 'wo';
  const prefix = isWo
    ? `As-salamu alaykum wa rahmatullah Serigne bi!\n\nDama bëgg jënd ci Xidma Market:\n📌 *${product.titleWo || product.title}*\n`
    : `As-salamu alaykum wa rahmatullah!\n\nJe vous contacte depuis la plateforme *Xidma Market* pour commander :\n📌 *${product.title}*\n`;

  const details = isWo
    ? `🔢 Lim bi : ${quantity}\n💰 Njëg li : ${product.priceXOF.toLocaleString('fr-FR')} FCFA / un\n`
    : `🔢 Quantité : ${quantity}\n💰 Prix unitaire : ${product.priceXOF.toLocaleString('fr-FR')} FCFA\n`;

  const clientInfo = customerName
    ? (isWo ? `👤 Sama tur : ${customerName}\n` : `👤 Nom de l'acheteur : ${customerName}\n`)
    : '';

  const addressInfo = address
    ? (isWo ? `📍 Sama dëkkuwaay / Livraison : ${address}\n` : `📍 Adresse de livraison : ${address}\n`)
    : '';

  const closing = isWo
    ? `\nJërëjëfe Serigne Touba, ndax mën na am ndoxal li léegi ? Barkellahu fik!`
    : `\nMerci pour votre Khidma. Comment pouvons-nous finaliser le règlement et la livraison ? Barkellahu fik.`;

  return encodeURIComponent(prefix + details + clientInfo + addressInfo + closing);
}

export function buildWhatsAppCartCheckout(
  items: { product: Product; quantity: number }[],
  totalXOF: number,
  deliveryZone: string,
  customerName: string,
  phone: string,
  address: string,
  lang: Language
): string {
  const isWo = lang === 'wo';
  let message = isWo
    ? `*BISMILLAHIR RAHMANIR RAHIM*\n*COMMANDE XIDMA MARKET*\n\nAs-salamu alaykum, dama bëgg joxe sama commande :\n\n`
    : `*BISMILLAHIR RAHMANIR RAHIM*\n*COMMANDE XIDMA MARKET*\n\nAs-salamu alaykum, voici ma commande groupée :\n\n`;

  items.forEach((item, index) => {
    const subtotal = item.product.priceXOF * item.quantity;
    message += `${index + 1}. *${item.product.title}*\n   x${item.quantity} = ${subtotal.toLocaleString('fr-FR')} FCFA\n`;
  });

  message += `\n💵 *TOTAL : ${totalXOF.toLocaleString('fr-FR')} FCFA*\n`;
  message += `🚚 *Zone de livraison :* ${deliveryZone}\n`;
  message += `👤 *Client :* ${customerName || 'Disciple'}\n`;
  message += `📞 *Téléphone :* ${phone}\n`;
  message += `📍 *Adresse exacte :* ${address}\n\n`;
  message += isWo
    ? `Jërëjëf Serigne Touba, Yàlla na nu Yàlla boole barke! Ndax mën ngeen ma wax kani laay jot sama kóbire ?`
    : `Merci pour votre engagement et votre travail. Pouvez-vous me confirmer la disponibilité et le mode de paiement (Wave / Orange Money / Virement) ?`;

  return encodeURIComponent(message);
}
