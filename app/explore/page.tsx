import ExplorePage from "./ExplorePage";

export const metadata = {
  title: "Explore Listings | Khamar Bazaar",
  description:
    "Browse ducks, chickens, eggs, goats, cows, and feed from local sellers.",
};

const page = async () => {
  // const searchParamsValue = await searchParams;
  // const search = new URLSearchParams(
  //   searchParamsValue as unknown as string,
  // ).toString();
  // const data = await getListings(search);
  return <ExplorePage />;
};
export default page;
