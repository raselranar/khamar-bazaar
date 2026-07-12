import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client?.db("khamar-bazaar");
    console.log(db?.collection("listings"));
    const listings = await db
      ?.collection("listings")
      .find({})
      .limit(3)
      .toArray();
    console.log(listings);
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error in GET /api/listings/featured", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
  //   return NextResponse.json({ message: "server is on" });
};
