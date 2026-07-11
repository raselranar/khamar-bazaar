import { Listing, mockListings } from "./mock-data";

export type NewListing = Omit<Listing, "_id" | "createdAt" | "sellerId">;

// get data
export const getListings = (): Promise<Listing[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockListings), 600));
};
// get featured data
export const getFeaturedListings = (): Promise<Listing[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockListings.slice(0, 3)), 600),
  );
};
// submit new listing
export const submitListing = (
  newList: NewListing,
): Promise<{ success: boolean }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      mockListings.push({
        ...newList,
        _id: `l${mockListings.length + 1}`,
        sellerId: "u1",
        createdAt: new Date(),
      });
      resolve({ success: true });
    }, 600),
  );
};
