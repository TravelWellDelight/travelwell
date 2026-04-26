export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  region: string;
  category: string[];
  duration: { nights: number; days: number };
  groupSize: { min: number; max: number };
  price: { perPerson: number; originalPrice?: number; currency: "INR" };
  images: { hero: string; gallery: string[] };
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  highlights: string[];
  availability: "available" | "limited" | "sold_out";
  rating?: number;
  reviewCount?: number;
  featured: boolean;
  createdAt: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  image: string;
  packageCount: number;
  featured: boolean;
}
