export interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash: string; // Mock only
  role: "user" | "admin";
  location: string;
  createdAt: Date;
}

export interface Listing {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Duck" | "Chicken" | "Goat" | "Egg" | "Cow";
  price: number;
  age?: string;
  breed: string;
  location: string;
  imageUrl?: string;
  sellerId: string;
  createdAt: Date;
}

export const mockUsers: User[] = [
  {
    _id: "u1",
    name: "Rahim Uddin",
    email: "rahim@demo.com",
    passwordHash: "hashed_demo_123", // Mock only
    role: "user",
    location: "Bochaganj, Rangpur",
    createdAt: new Date("2025-10-10"),
  },
];

export const mockListings: Listing[] = [
  {
    _id: "l1",
    title: "Mature Muscovy Duck (China Hanhs)",
    shortDescription:
      "Healthy, free-range Muscovy duck. Excellent for breeding or meat.",
    fullDescription:
      "Raised by the pond, fed naturally with grains and small fish. Very active and healthy. Weight is around 3.5kg.",
    category: "Duck",
    price: 1200,
    age: "8 months",
    breed: "Muscovy",
    location: "Bochaganj, Rangpur",
    imageUrl:
      "https://images.unsplash.com/photo-1598255913220-302302194364?auto=format&fit=crop&q=80&w=800",
    sellerId: "u1",
    createdAt: new Date("2026-07-01"),
  },
  {
    _id: "l2",
    title: "Sonali Chicken - Farm Fresh",
    shortDescription: "Deshi-tasting Sonali chickens, naturally raised.",
    fullDescription:
      "Perfect for family events. These Sonali chickens are raised on high-quality feed and open space. Average weight 1.2kg.",
    category: "Chicken",
    price: 350,
    age: "2.5 months",
    breed: "Sonali",
    location: "Dinajpur Sadar",
    imageUrl:
      "https://images.unsplash.com/photo-1548550023-2bf3c49b4baf?auto=format&fit=crop&q=80&w=800",
    sellerId: "u1",
    createdAt: new Date("2026-07-05"),
  },
  {
    _id: "l3",
    title: "Black Bengal Goat (Buck)",
    shortDescription: "Pure breed Black Bengal goat, fully vaccinated.",
    fullDescription:
      "Highly disease-resistant and adaptable Black Bengal goat. Ideal for farming or Qurbani preparation.",
    category: "Goat",
    price: 15500,
    age: "1.2 years",
    breed: "Black Bengal",
    location: "Thakurgaon",
    imageUrl:
      "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=800",
    sellerId: "u2",
    createdAt: new Date("2026-07-08"),
  },
  {
    _id: "l4",
    title: "Organic Duck Eggs (1 Hali)",
    shortDescription: "Freshly collected duck eggs from our farm.",
    fullDescription:
      "Large, nutritious duck eggs collected daily. Price is per hali (4 pieces). Bulk orders available.",
    category: "Egg",
    price: 70,
    location: "Panchagarh",
    imageUrl:
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=800",
    sellerId: "u1",
    breed: "Black Bengal",
    createdAt: new Date("2026-07-09"),
  },
];
