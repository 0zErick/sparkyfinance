// Mapa centralizado de marcas (mercados, farmácias, postos, restaurantes,
// transporte, lojas, etc) — logos via Simple Icons CDN.
// Usado pelo <MerchantLogo /> para renderizar a marca real em transações.

import { APP_BRANDS, type AppBrand } from "./brandLogos";
import { BANK_BRANDS } from "./bankLogos";

export type MerchantBrand = AppBrand;

// Marcas brasileiras / globais comuns em extrato (supermercados, farmácias,
// postos, varejo, transporte, alimentação, telecom, utilities, etc).
export const MERCHANT_BRANDS: Record<string, MerchantBrand> = {
  // Supermercados / Atacado
  "carrefour":     { name: "Carrefour",     slug: "carrefour",     hex: "004E9F", abbr: "CF" },
  "pão de açúcar": { name: "Pão de Açúcar", slug: "",              hex: "E4002B", abbr: "PA" },
  "pao de acucar": { name: "Pão de Açúcar", slug: "",              hex: "E4002B", abbr: "PA" },
  "extra":         { name: "Extra",         slug: "",              hex: "EE2722", abbr: "EX" },
  "assaí":         { name: "Assaí",         slug: "",              hex: "F2B600", abbr: "AS" },
  "assai":         { name: "Assaí",         slug: "",              hex: "F2B600", abbr: "AS" },
  "atacadão":      { name: "Atacadão",      slug: "",              hex: "E30613", abbr: "AT" },
  "atacadao":      { name: "Atacadão",      slug: "",              hex: "E30613", abbr: "AT" },
  "sams club":     { name: "Sam's Club",    slug: "samsclub",      hex: "0067A0", abbr: "SC" },
  "sam's club":    { name: "Sam's Club",    slug: "samsclub",      hex: "0067A0", abbr: "SC" },
  "walmart":       { name: "Walmart",       slug: "walmart",       hex: "0071CE", abbr: "WM" },
  "dia":           { name: "Dia",           slug: "",              hex: "EE2722", abbr: "DI" },
  "big":           { name: "BIG",           slug: "",              hex: "E30613", abbr: "BG" },
  "supermercado":  { name: "Supermercado",  slug: "",              hex: "16A34A", abbr: "SM" },
  "mercado":       { name: "Mercado",       slug: "",              hex: "16A34A", abbr: "MC" },

  // Farmácias
  "drogasil":          { name: "Drogasil",          slug: "", hex: "FFCB05", abbr: "DG" },
  "raia":              { name: "Droga Raia",        slug: "", hex: "0033A0", abbr: "DR" },
  "droga raia":        { name: "Droga Raia",        slug: "", hex: "0033A0", abbr: "DR" },
  "pacheco":           { name: "Drogarias Pacheco", slug: "", hex: "E4002B", abbr: "PC" },
  "pague menos":       { name: "Pague Menos",       slug: "", hex: "E4002B", abbr: "PM" },
  "ultrafarma":        { name: "Ultrafarma",        slug: "", hex: "F58220", abbr: "UF" },
  "drogaria":          { name: "Drogaria",          slug: "", hex: "DC2626", abbr: "FA" },
  "farmácia":          { name: "Farmácia",          slug: "", hex: "DC2626", abbr: "FA" },
  "farmacia":          { name: "Farmácia",          slug: "", hex: "DC2626", abbr: "FA" },

  // Postos / Combustível
  "shell":   { name: "Shell",   slug: "shell",   hex: "FBCE07", abbr: "SH" },
  "ipiranga":{ name: "Ipiranga",slug: "",        hex: "0033A0", abbr: "IP" },
  "petrobras":{name: "Petrobras",slug:"petrobras",hex: "008542", abbr: "PB" },
  "ale":     { name: "ALE",     slug: "",        hex: "E30613", abbr: "AL" },
  "posto":   { name: "Posto",   slug: "",        hex: "F59E0B", abbr: "PO" },

  // Transporte / Mobilidade
  "uber":      { name: "Uber",      slug: "uber",     hex: "000000", abbr: "UB" },
  "99":        { name: "99",        slug: "",         hex: "FFD400", abbr: "99" },
  "lyft":      { name: "Lyft",      slug: "lyft",     hex: "FF00BF", abbr: "LY" },
  "blablacar": { name: "BlaBlaCar", slug: "blablacar",hex: "0067B1", abbr: "BB" },

  // Comida / Delivery
  "ifood":      { name: "iFood",       slug: "ifood",       hex: "EA1D2C", abbr: "iF" },
  "rappi":      { name: "Rappi",       slug: "rappi",       hex: "FF441F", abbr: "RP" },
  "mcdonalds":  { name: "McDonald's",  slug: "mcdonalds",   hex: "FFC72C", abbr: "MC" },
  "mcdonald":   { name: "McDonald's",  slug: "mcdonalds",   hex: "FFC72C", abbr: "MC" },
  "burger king":{ name: "Burger King", slug: "burgerking",  hex: "D62300", abbr: "BK" },
  "subway":     { name: "Subway",      slug: "subway",      hex: "008C15", abbr: "SW" },
  "starbucks":  { name: "Starbucks",   slug: "starbucks",   hex: "00704A", abbr: "SB" },
  "kfc":        { name: "KFC",         slug: "kfc",         hex: "F40027", abbr: "KF" },
  "pizza hut":  { name: "Pizza Hut",   slug: "pizzahut",    hex: "EE3124", abbr: "PH" },
  "dominos":    { name: "Domino's",    slug: "dominos",     hex: "0078AE", abbr: "DM" },
  "habibs":     { name: "Habib's",     slug: "",            hex: "E30613", abbr: "HB" },
  "habib's":    { name: "Habib's",     slug: "",            hex: "E30613", abbr: "HB" },
  "outback":    { name: "Outback",     slug: "",            hex: "8B2424", abbr: "OB" },

  // Telecom
  "claro":  { name: "Claro",  slug: "claro", hex: "E60000", abbr: "CL" },
  "vivo":   { name: "Vivo",   slug: "vivo",  hex: "660099", abbr: "VV" },
  "tim":    { name: "TIM",    slug: "",      hex: "003DA5", abbr: "TM" },
  "oi":     { name: "Oi",     slug: "",      hex: "FFD700", abbr: "OI" },

  // Utilities
  "enel":      { name: "Enel",     slug: "enel", hex: "00308F", abbr: "EN" },
  "sabesp":    { name: "Sabesp",   slug: "",     hex: "0072BC", abbr: "SB" },
  "comgás":    { name: "Comgás",   slug: "",     hex: "00A0E3", abbr: "CG" },
  "comgas":    { name: "Comgás",   slug: "",     hex: "00A0E3", abbr: "CG" },
  "energia":   { name: "Energia",  slug: "",     hex: "F59E0B", abbr: "EL" },
  "luz":       { name: "Energia",  slug: "",     hex: "F59E0B", abbr: "EL" },
  "água":      { name: "Água",     slug: "",     hex: "0EA5E9", abbr: "AG" },
  "agua":      { name: "Água",     slug: "",     hex: "0EA5E9", abbr: "AG" },
  "internet":  { name: "Internet", slug: "",     hex: "6366F1", abbr: "NT" },

  // Varejo / E-commerce
  "magalu":         { name: "Magazine Luiza",  slug: "",            hex: "0086FF", abbr: "ML" },
  "magazine luiza": { name: "Magazine Luiza",  slug: "",            hex: "0086FF", abbr: "ML" },
  "casas bahia":    { name: "Casas Bahia",     slug: "",            hex: "003DA5", abbr: "CB" },
  "americanas":     { name: "Americanas",      slug: "",            hex: "E60014", abbr: "AM" },
  "shopee":         { name: "Shopee",          slug: "shopee",      hex: "EE4D2D", abbr: "SP" },
  "mercado livre":  { name: "Mercado Livre",   slug: "mercadolivre",hex: "FFE600", abbr: "ML" },
  "aliexpress":     { name: "AliExpress",      slug: "aliexpress",  hex: "FF4747", abbr: "AE" },
  "amazon":         { name: "Amazon",          slug: "amazon",      hex: "FF9900", abbr: "AZ" },
  "shein":          { name: "Shein",           slug: "shein",       hex: "000000", abbr: "SH" },
  "renner":         { name: "Renner",          slug: "",            hex: "B62025", abbr: "RN" },
  "riachuelo":      { name: "Riachuelo",       slug: "",            hex: "E30613", abbr: "RC" },
  "c&a":            { name: "C&A",             slug: "",            hex: "003DA5", abbr: "CA" },

  // Pets
  "petz":   { name: "Petz",   slug: "", hex: "00A859", abbr: "PZ" },
  "cobasi": { name: "Cobasi", slug: "", hex: "00853E", abbr: "CB" },
};

const FALLBACK: MerchantBrand = {
  name: "Estabelecimento",
  slug: "",
  hex: "64748B",
  abbr: "",
};

/**
 * Resolve uma string livre (descrição da transação ou categoria) numa marca.
 * Procura primeiro nos mercados, depois apps/serviços e, por último, bancos.
 */
export const getMerchantBrand = (rawName: string): MerchantBrand => {
  if (!rawName) return FALLBACK;
  const lower = rawName.toLowerCase().trim();

  if (MERCHANT_BRANDS[lower]) return MERCHANT_BRANDS[lower];
  if (APP_BRANDS[lower]) return APP_BRANDS[lower];
  if (BANK_BRANDS[lower]) return BANK_BRANDS[lower];

  for (const [key, brand] of Object.entries(MERCHANT_BRANDS)) {
    if (lower.includes(key)) return brand;
  }
  for (const [key, brand] of Object.entries(APP_BRANDS)) {
    if (lower.includes(key)) return brand;
  }
  for (const [key, brand] of Object.entries(BANK_BRANDS)) {
    if (lower.includes(key)) return brand;
  }

  return { ...FALLBACK, abbr: rawName.slice(0, 2).toUpperCase() };
};
