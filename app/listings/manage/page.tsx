import { getUserSession } from "@/lib/userSession";
import ManageListingsPageClient from "./ManageListingsPageClient";
import { getListingsBySellerId } from "@/lib/api";

export const metadata = {
  title: "Manage Listings | Khamar Bazaar",
  description: "Review and manage your active listings from one place.",
};

export default async function ManageListingsPage() {
  const session = await getUserSession();
  const data = await getListingsBySellerId(session?.session?.userId);

  return <ManageListingsPageClient listings={data} />;
}
