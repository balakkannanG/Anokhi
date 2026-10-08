export const ringCategories = [
  { label: "All Rings", handle: "rings" },
  { label: "Engagement Rings", handle: "engagement-rings" },
  { label: "Solitaire Rings", handle: "solitaire-rings" },
  { label: "Diamond Rings", handle: "diamond-rings" },
  { label: "Wedding Rings", handle: "wedding-rings" },
  { label: "Couple Rings", handle: "couple-rings" },
  { label: "Eternity Rings", handle: "eternity-rings" },
  { label: "Bridal Rings", handle: "bridal-rings" },
  { label: "Statement Rings", handle: "statement-rings" },
  { label: "Custom Rings", handle: "custom-rings" },
] as const;

export const jewelleryCategories = [
  { label: "All Jewellery", handle: "jewellery" },
  { label: "Earrings", handle: "earrings" },
  { label: "Necklaces", handle: "necklaces" },
  { label: "Pendants", handle: "pendants" },
  { label: "Bracelets", handle: "bracelets" },
  { label: "Bangles", handle: "bangles" },
  { label: "Jewellery Sets", handle: "jewellery-sets" },
] as const;

export const discoverLinks = [
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/shop?sort=best-selling" },
  { label: "Collections", href: "/collections" },
] as const;
