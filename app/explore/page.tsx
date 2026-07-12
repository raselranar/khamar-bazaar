import { getListings } from "@/lib/api";
import ExplorePage from "./ExplorePage";

export const metadata = {
  title: "Explore Listings | Khamar Bazaar",
  description:
    "Browse ducks, chickens, eggs, goats, cows, and feed from local sellers.",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const page = async ({ searchParams }: PageProps) => {
  const searchParamsValue = await searchParams;
  const search = new URLSearchParams(
    searchParamsValue as unknown as string,
  ).toString();
  // const data = await getListings(search);
  return <ExplorePage searchQuery={search} />;
};
export default page;
