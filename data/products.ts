export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  flavour: string;
  tag?: string;
  ready?: boolean;
};
export const products: Product[] = [
  {
    id: "lavender-bloom",
    name: "The Lavender Bloom",
    description: "Florals, a little gold, and a moment all your own.",
    price: 45000,
    image: "1",
    category: "Birthday",
    flavour: "Vanilla",
    tag: "Bestseller",
  },
  {
    id: "signature-celebration",
    name: "Signature Celebration",
    description: "A beautifully finished centrepiece for your celebration.",
    price: 35000,
    image: "2",
    category: "Celebration",
    flavour: "Red Velvet",
    tag: "A crowd favourite",
  },
  {
    id: "chocolate-indulgence",
    name: "Chocolate Indulgence",
    description: "Rich chocolate layers, made for a little indulgence.",
    price: 38000,
    image: "3",
    category: "Birthday",
    flavour: "Chocolate",
    tag: "For chocolate lovers",
  },
  {
    id: "swiss-meringue",
    name: "Swiss Meringue Dream",
    description: "Soft, silky buttercream. Beautiful in every detail.",
    price: 42000,
    image: "4",
    category: "Anniversary",
    flavour: "Vanilla",
  },
  {
    id: "little-celebration",
    name: "Little Big Celebration",
    description: "A playful cake for their very special day.",
    price: 40000,
    image: "5",
    category: "Kids",
    flavour: "Vanilla",
  },
  {
    id: "golden-moment",
    name: "The Golden Moment",
    description: "An elegant finish for a milestone worth remembering.",
    price: 55000,
    image: "6",
    category: "Wedding",
    flavour: "Red Velvet",
  },
  {
    id: "banana-bread",
    name: "Chocolate Banana Bread",
    description: "A soft, golden loaf with a generous chocolate finish.",
    price: 12000,
    image: "8",
    category: "Desserts",
    flavour: "Banana",
    ready: true,
    tag: "A little everyday joy",
  },
  {
    id: "sweet-treats",
    name: "Celebration Treat Box",
    description: "Something sweet to share, gift, or keep for yourself.",
    price: 18000,
    image: "9",
    category: "Desserts",
    flavour: "Chocolate",
    ready: true,
  },
];
export const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Kids",
  "Celebration",
  "Same Day",
  "Desserts",
  "Corporate",
];
export const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
export const support =
  "https://wa.me/2348029993595?text=Hi%20Exotique%20Cakes%2C%20I%E2%80%99m%20browsing%20your%20website%20and%20need%20some%20help%20with%20my%20order.";
export const directions =
  "https://www.google.com/maps/search/?api=1&query=Exotique+Cakes+17+Esther+Osiyemi+Ilupeju+Lagos";
export type Configuration = {
  size: string;
  layers: string;
  flavour: string;
  filling: string;
  message: string;
  date: string;
  notes: string;
};
export const defaultConfig: Configuration = {
  size: '6"',
  layers: "2",
  flavour: "Vanilla",
  filling: "Vanilla Cream",
  message: "",
  date: "",
  notes: "",
};
export function priceFor(p: Product, c: Configuration) {
  return (
    p.price +
    ['6"', '8"', '10"', '12"'].indexOf(c.size) * 10000 +
    (Number(c.layers) - 2) * 6000 +
    (c.filling === "Chocolate Ganache" ? 3000 : 0)
  );
}
