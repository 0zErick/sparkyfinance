import {
  Zap, Droplet, Flame, Wifi, Home, Car, Wrench, GraduationCap,
  ArrowLeftRight, Receipt, ShoppingCart, Pill, Fuel, Utensils,
  Phone, Tv, Music, Dumbbell, Heart, Briefcase, Plane, Hotel,
  Bus, Train, Bike, Baby, PawPrint, Shirt, Gift, PartyPopper,
  Coffee, Pizza, Beer, Cigarette, Scissors, Stethoscope, BookOpen,
  Landmark, Building2, Hammer, Package, CreditCard, DollarSign,
  PiggyBank, TrendingUp, FileText, Shield, Church, Gamepad2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICON_REGISTRY: Record<string, LucideIcon> = {
  zap: Zap, droplet: Droplet, flame: Flame, wifi: Wifi, home: Home,
  car: Car, wrench: Wrench, "graduation-cap": GraduationCap,
  "arrow-left-right": ArrowLeftRight, receipt: Receipt,
  "shopping-cart": ShoppingCart, pill: Pill, fuel: Fuel, utensils: Utensils,
  phone: Phone, tv: Tv, music: Music, dumbbell: Dumbbell, heart: Heart,
  briefcase: Briefcase, plane: Plane, hotel: Hotel, bus: Bus, train: Train,
  bike: Bike, baby: Baby, "paw-print": PawPrint, shirt: Shirt, gift: Gift,
  "party-popper": PartyPopper, coffee: Coffee, pizza: Pizza, beer: Beer,
  cigarette: Cigarette, scissors: Scissors, stethoscope: Stethoscope,
  "book-open": BookOpen, landmark: Landmark, building: Building2,
  hammer: Hammer, package: Package, "credit-card": CreditCard,
  "dollar-sign": DollarSign, "piggy-bank": PiggyBank,
  "trending-up": TrendingUp, "file-text": FileText, shield: Shield,
  church: Church, gamepad: Gamepad2,
};

export const getBrandIcon = (name?: string): LucideIcon | null => {
  if (!name) return null;
  return ICON_REGISTRY[name] ?? null;
};
