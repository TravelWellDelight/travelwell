import { Destination } from "@/types/package";

export const destinations: Destination[] = [
  {
    id: "dest-001",
    slug: "kerala",
    name: "Kerala",
    country: "India",
    region: "South India",
    tagline: "God's Own Country",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    packageCount: 6,
    featured: true,
  },
  {
    id: "dest-002",
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    region: "North India",
    tagline: "Land of Kings",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    packageCount: 8,
    featured: true,
  },
  {
    id: "dest-003",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    tagline: "Island of the Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    packageCount: 4,
    featured: true,
  },
  {
    id: "dest-004",
    slug: "himachal",
    name: "Himachal Pradesh",
    country: "India",
    region: "North India",
    tagline: "Where mountains meet the sky",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    packageCount: 5,
    featured: true,
  },
  {
    id: "dest-005",
    slug: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    region: "Southeast Asia",
    tagline: "From Hanoi to Hoi An",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    packageCount: 3,
    featured: false,
  },
  {
    id: "dest-006",
    slug: "ladakh",
    name: "Ladakh",
    country: "India",
    region: "North India",
    tagline: "Land of High Passes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    packageCount: 4,
    featured: true,
  },
];

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured);
}
