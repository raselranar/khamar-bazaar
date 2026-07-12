import { Listing, mockListings } from "./mock-data";

export type NewListing = Omit<Listing, "_id" | "createdAt" | "sellerId">;

// get data
export const getListings = async () => {
  try {
    const res = await fetch("/api/listings");
    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};
// get featured data
export const getFeaturedListings = async (): Promise<Listing[]> => {
  try {
    const res = await fetch("/api/listings/featured");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return Promise.resolve([]);
  }
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

export const deleteListing = (id: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index = mockListings.findIndex((item) => item._id === id);
      mockListings.splice(index, 1);
      resolve({ success: true });
    }, 600),
  );
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  const listItem = mockListings.find((item) => item._id === id);
  if (!listItem) return null;
  return listItem;
};
