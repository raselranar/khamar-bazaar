import { Listing, mockListings } from "./mock-data";

// get data
export const getListings = () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockListings), 600));
};
// get featured data
export const getFeaturedListings = (): Promise<Listing[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockListings.slice(0, 3)), 600),
  );
};
