import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface QueryParams {
  category?: string;
  search?: string;
  price?: { $gte?: number; $lte?: number };
  $or?: [
    { name: { $regex: string; $options: string } },
    { description: { $regex: string; $options: string } },
  ];
}

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const { category, search, minPrice, maxPrice } = Object.fromEntries(
      searchParams.entries(),
    );
    const query: QueryParams = {};
    // filter by category
    if (category) {
      query.category = category;
    }
    // filter by search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Price Range Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    console.log(category, search, minPrice, maxPrice);
    const client = await clientPromise;
    const db = client?.db("khamar-bazaar");
    console.log(db?.collection("listings"));
    const listings = await db?.collection("listings").find(query).toArray();
    console.log(listings);
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error in GET /api/listings", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
  //   return NextResponse.json({ message: "server is on" });
};
