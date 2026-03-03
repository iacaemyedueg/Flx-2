import { Product, Category } from '../types';

// Mock data matching the design screenshots

export const PRODUCTS: Product[] = [
  // Flash Sales / Popular
  {
    id: 1,
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    description: "Gamepad with ergonomic design",
    category: "gaming",
    image: "https://m.media-amazon.com/images/I/61sQkH1sWvL._AC_SX679_.jpg", // Red gamepad
    rating: { rate: 5, count: 88 }
  },
  {
    id: 2,
    title: "AK-900 Wired Keyboard",
    price: 960,
    description: "Mechanical gaming keyboard",
    category: "gaming",
    image: "https://m.media-amazon.com/images/I/71fC9l2A1BL._AC_SX679_.jpg", // RGB Keyboard
    rating: { rate: 4, count: 75 }
  },
  {
    id: 3,
    title: "IPS LCD Gaming Monitor",
    price: 370,
    description: "High refresh rate monitor",
    category: "gaming",
    image: "https://m.media-amazon.com/images/I/71s7HbyAsEL._AC_SX679_.jpg", // Monitor
    rating: { rate: 5, count: 99 }
  },
  {
    id: 4,
    title: "S-Series Comfort Chair",
    price: 375,
    description: "Ergonomic chair for long sessions",
    category: "furniture",
    image: "https://m.media-amazon.com/images/I/61sXjD5CqCL._AC_SX679_.jpg", // Chair
    rating: { rate: 4.5, count: 99 }
  },
  // Best Selling
  {
    id: 5,
    title: "The North Coat",
    price: 260,
    description: "Warm winter coat",
    category: "clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg", // Pink coat placeholder
    rating: { rate: 5, count: 65 }
  },
  {
    id: 6,
    title: "Gucci Duffle Bag",
    price: 960,
    description: "Luxury travel bag",
    category: "accessories",
    image: "https://m.media-amazon.com/images/I/711T2+9nO+L._AC_SX679_.jpg", // Bag
    rating: { rate: 4.5, count: 65 }
  },
  {
    id: 7,
    title: "RGB Liquid CPU Cooler",
    price: 160,
    description: "Keep your PC cool",
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/61X4X-eA2iL._AC_SX679_.jpg", // Cooler
    rating: { rate: 4.5, count: 65 }
  },
  {
    id: 8,
    title: "Small Bookshelf",
    price: 360,
    description: "Wooden bookshelf",
    category: "furniture",
    image: "https://m.media-amazon.com/images/I/71+pOdQ7iKL._AC_SX679_.jpg", // Shelf
    rating: { rate: 5, count: 65 }
  },
  // Explore
  {
    id: 9,
    title: "Breed Dry Dog Food",
    price: 100,
    description: "Healthy food for dogs",
    category: "pets",
    image: "https://m.media-amazon.com/images/I/81+2X8-Xy+L._AC_SX679_.jpg",
    rating: { rate: 3, count: 35 }
  },
  {
    id: 10,
    title: "CANON EOS DSLR Camera",
    price: 360,
    description: "Professional camera",
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SX679_.jpg",
    rating: { rate: 4, count: 95 }
  },
  {
    id: 11,
    title: "ASUS FHD Gaming Laptop",
    price: 700,
    description: "High performance laptop",
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71z3pGz5i+L._AC_SX679_.jpg",
    rating: { rate: 5, count: 325 }
  },
  {
    id: 12,
    title: "Curology Product Set",
    price: 500,
    description: "Skin care set",
    category: "beauty",
    image: "https://m.media-amazon.com/images/I/61+9+9+9+9L._AC_SX679_.jpg", // Placeholder
    rating: { rate: 4, count: 145 }
  },
  {
    id: 13,
    title: "Kids Electric Car",
    price: 960,
    description: "Red electric car for kids",
    category: "toys",
    image: "https://m.media-amazon.com/images/I/61+9+9+9+9L._AC_SX679_.jpg", // Placeholder
    rating: { rate: 5, count: 65 }
  },
  {
    id: 14,
    title: "Jr. Zoom Soccer Cleats",
    price: 1160,
    description: "Professional soccer shoes",
    category: "sports",
    image: "https://m.media-amazon.com/images/I/61+9+9+9+9L._AC_SX679_.jpg", // Placeholder
    rating: { rate: 5, count: 35 }
  },
  {
    id: 15,
    title: "GP11 Shooter USB Gamepad",
    price: 660,
    description: "Black gamepad",
    category: "gaming",
    image: "https://m.media-amazon.com/images/I/61+9+9+9+9L._AC_SX679_.jpg", // Placeholder
    rating: { rate: 4.5, count: 55 }
  },
  {
    id: 16,
    title: "Quilted Satin Jacket",
    price: 660,
    description: "Green jacket",
    category: "clothing",
    image: "https://m.media-amazon.com/images/I/61+9+9+9+9L._AC_SX679_.jpg", // Placeholder
    rating: { rate: 4.5, count: 55 }
  }
];

const CATEGORIES: Category[] = [
  { id: 'phones', name: 'Phones', image: '' },
  { id: 'computers', name: 'Computers', image: '' },
  { id: 'smartwatch', name: 'SmartWatch', image: '' },
  { id: 'camera', name: 'Camera', image: '' },
  { id: 'headphones', name: 'HeadPhones', image: '' },
  { id: 'gaming', name: 'Gaming', image: '' }
];

export const api = {
  getProducts: async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return PRODUCTS;
  },
  
  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return CATEGORIES;
  },

  getProductById: async (id: number): Promise<Product | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return PRODUCTS.find(p => p.id === id);
  }
};
