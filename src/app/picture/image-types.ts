export type ImageTypes =
  | "professional"
  | "social-media"
  | "casual"
  | "event"
  | "product"
  | "artistic"
  | "headshot"
  | "fitness"
  | "fashion";

export const IMAGE_TYPES: {
  name: string;
  description: string;
  value: ImageTypes;
}[] = [
  {
    name: "Professional",
    value: "professional",
    description:
      "Suitable for business settings, resumes, corporate websites, and LinkedIn profiles.",
  },
  {
    name: "Social Media",
    value: "social-media",
    description:
      "Casual and creative images intended for platforms like Instagram, Facebook, Twitter, etc.",
  },
  {
    name: "Casual",
    value: "casual",
    description: "Everyday photos, including selfies or personal moments",
  },
  {
    name: "Event",
    value: "event",
    description:
      "Pictures from events such as conferences, weddings, parties, or ceremonies.",
  },
  {
    name: "Product",
    value: "product",
    description:
      "Images of products for e-commerce, catalogs, or promotional materials.",
  },
  {
    name: "Artistic",
    value: "artistic",
    description:
      "Creative or artistic photos focused on expression and originality.",
  },
  {
    name: "Headshot",
    value: "headshot",
    description:
      "Professional headshots for acting portfolios, business cards, or professional profiles.",
  },
  {
    name: "Fitness",
    value: "fitness",
    description:
      "Images related to fitness activities, workouts, or healthy lifestyles.",
  },
  {
    name: "Fashion",
    value: "fashion",
    description:
      "Photos showcasing clothing, accessories, or fashion-related con",
  },
];
