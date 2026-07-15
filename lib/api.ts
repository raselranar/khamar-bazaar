"use server";
import { getUserTokenClient } from "./getUserTokenClient";
import { Listing } from "./mock-data";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export type NewListing = Omit<Listing, "_id" | "createdAt" | "sellerId">;

const authHeaders = async () => {
  const token = await getUserTokenClient();

  return { authorization: `Bearer ${token}` };
};

// get data
export const getListings = async (params?: string) => {
  try {
    const query = params ? `?${params}` : "";

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
// get featured data
export const getListingsBySellerId = async (
  sellerId: string | undefined,
): Promise<Listing[]> => {
  try {
    const res = await fetch(`${baseUrl}/api/listings/seller/${sellerId}`, {
      headers: await authHeaders(),
    });
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
  console.log(newList);
  const res = await fetch(`${baseUrl}/api/listings/add`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(newList),
  });
  if (!res.ok) return { success: false };
  return { success: true };
};

export const deleteListing = async (
  id: string,
): Promise<{ success: boolean }> => {
  const res = await fetch(`${baseUrl}/api/listings/delete/${id}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  if (!res.ok) return { success: false };
  return { success: true };
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
