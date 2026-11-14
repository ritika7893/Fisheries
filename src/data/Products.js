export const categories = [
  {
    name: "Whole fish",
    slug: "whole-fish",
    description: "The day's best catch, cleaned your way.",
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85",
    count: "12 varieties",
  },
  {
    name: "Fillets & steaks",
    slug: "fillets",
    description: "Beautifully cut, ready for the pan.",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85",
    count: "8 varieties",
  },
  {
    name: "Prawns & shellfish",
    slug: "shellfish",
    description: "Sweet, tender, and responsibly sourced.",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85",
    count: "6 varieties",
  },
  {
    name: "Crab & lobster",
    slug: "crab",
    description: "A little something for the occasion.",
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85",
    count: "4 varieties",
  },
];

export const products = [
  {
    id: "salmon",
    slug: "coastal-salmon-fillet",
    name: "Coastal salmon fillet",
    species: "Salmon · Farm raised",
    category: "fillets",
    origin: "Kochi, Kerala",
    price: 520,
    compareAt: 620,
    rating: 4.9,
    reviews: 128,
    badge: "Best seller",
    fresh: true,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "500 g", multiplier: 1 },
      { label: "1 kg", multiplier: 1.92 },
    ],
    description:
      "Silky, rich and beautifully marbled. Our salmon is carefully raised, harvested to order and hand-cut for a tender, buttery finish.",
  },
  {
    id: "pomfret",
    slug: "silver-pomfret",
    name: "Silver pomfret",
    species: "Wild caught · Indian Ocean",
    category: "whole-fish",
    origin: "Malvan, Maharashtra",
    price: 780,
    compareAt: null,
    rating: 4.8,
    reviews: 96,
    badge: "Just landed",
    fresh: true,
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "500 g", multiplier: 1 },
      { label: "1 kg", multiplier: 1.9 },
    ],
    description:
      "A coastal favourite with delicate, sweet flesh and just the right amount of richness. Choose it whole, cleaned and ready for your favourite curry.",
  },
  {
    id: "prawns",
    slug: "tiger-prawns",
    name: "Tiger prawns",
    species: "Responsibly farmed · Peeled & deveined",
    category: "shellfish",
    origin: "Kochi, Kerala",
    price: 460,
    compareAt: 540,
    rating: 4.9,
    reviews: 74,
    badge: "15% off",
    fresh: false,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "250 g", multiplier: 1 },
      { label: "500 g", multiplier: 1.9 },
    ],
    description:
      "Plump, sweet tiger prawns, expertly peeled and deveined to save you time. Raised with care and frozen at peak freshness.",
  },
  {
    id: "seabass",
    slug: "indian-seabass",
    name: "Indian seabass",
    species: "Wild caught · Skin-on fillet",
    category: "fillets",
    origin: "Ratnagiri, Maharashtra",
    price: 390,
    compareAt: null,
    rating: 4.7,
    reviews: 58,
    badge: "Chef's pick",
    fresh: true,
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "300 g", multiplier: 1 },
      { label: "600 g", multiplier: 1.95 },
    ],
    description:
      "A firm, clean-tasting fillet with delicate flakes and a crisp-skin finish. Sourced from small-scale fishers along the Konkan coast.",
  },
  {
    id: "tuna",
    slug: "yellowfin-tuna-steak",
    name: "Yellowfin tuna steak",
    species: "Wild caught · Sashimi grade",
    category: "fillets",
    origin: "Mangaluru, Karnataka",
    price: 560,
    compareAt: null,
    rating: 4.8,
    reviews: 43,
    badge: "New arrival",
    fresh: true,
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "250 g", multiplier: 1 },
      { label: "500 g", multiplier: 1.95 },
    ],
    description:
      "Deep-red, meaty and full of flavour. Cut thick for a quick sear, a poke bowl or a special weekend grill.",
  },
  {
    id: "crab",
    slug: "coastal-mud-crab",
    name: "Coastal mud crab",
    species: "Wild caught · Live selection",
    category: "crab",
    origin: "Kochi, Kerala",
    price: 690,
    compareAt: 760,
    rating: 4.9,
    reviews: 37,
    badge: "Small batch",
    fresh: false,
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "500 g", multiplier: 1 },
      { label: "1 kg", multiplier: 1.9 },
    ],
    description:
      "Meaty, sweet coastal mud crab, selected by hand from trusted partners. A special-occasion centrepiece with exceptional flavour.",
  },
  {
    id: "sardines",
    slug: "fresh-sardines",
    name: "Fresh sardines",
    species: "Wild caught · Day-boat catch",
    category: "whole-fish",
    origin: "Alappuzha, Kerala",
    price: 180,
    compareAt: null,
    rating: 4.6,
    reviews: 52,
    badge: "Day's catch",
    fresh: true,
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "500 g", multiplier: 1 },
      { label: "1 kg", multiplier: 1.9 },
    ],
    description:
      "Fresh off the day boat, these little flavour bombs are full of goodness. Best grilled simply with a squeeze of lime.",
  },
  {
    id: "squid",
    slug: "cleaned-squid",
    name: "Cleaned coastal squid",
    species: "Wild caught · Ready to cook",
    category: "shellfish",
    origin: "Kannur, Kerala",
    price: 320,
    compareAt: null,
    rating: 4.7,
    reviews: 31,
    badge: "Easy prep",
    fresh: true,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85",
    options: [
      { label: "250 g", multiplier: 1 },
      { label: "500 g", multiplier: 1.9 },
    ],
    description:
      "Tender squid, cleaned and sliced by hand. Quick-cooking and wonderfully versatile, from a simple stir-fry to a crisp calamari.",
  },
];

export const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
