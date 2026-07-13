"use server";
import { Listing, mockListings } from "./mock-data";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export type NewListing = Omit<Listing, "_id" | "createdAt" | "sellerId">;

// get data
export const getListings = async (params?: string) => {
  try {
    const query = params ? `?${params}` : "";
    console.log(query);
    // const res = await fetch(`/api/listings${query}`);
    const res = await fetch(`${baseUrl}/api/listings${query}`);

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};
// get featured data
export const getFeaturedListings = async (): Promise<Listing[]> => {
  try {
    const res = await fetch(`${baseUrl}/api/listings/featured`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return Promise.resolve([]);
  }
};
// submit new listing
export const submitListing = async (
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

export const deleteListing = async (
  id: string,
): Promise<{ success: boolean }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index = mockListings.findIndex((item) => item._id === id);
      mockListings.splice(index, 1);
      resolve({ success: true });
    }, 600),
  );
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  try {
    const res = await fetch(`${baseUrl}/api/listings/${id}`);

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
