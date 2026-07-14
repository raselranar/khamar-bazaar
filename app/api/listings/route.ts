import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface QueryParams {
  category?: string;
  search?: string;
  price?: { $gte?: number; $lte?: number };
  $or?: [
    { title: { $regex: string; $options: string } },
    { shortDescription: { $regex: string; $options: string } },
  ];
  page?: number;
}

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const { category, search, minPrice, maxPrice, sort, page } =
      Object.fromEntries(searchParams.entries());
    const query: QueryParams = {};
    // filter by category
    if (category) {
      query.category = category;
    }
    // filter by search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    // Price Range Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }
    const pipeline: Record<string, unknown>[] = [{ $match: query }];
    if (sort) {
      const sortDir = sort === "asc" ? 1 : -1;
      pipeline.push({ $sort: { price: sortDir } });
    }

    const skip = page ? (Number(page) - 1) * 3 : 0;
    pipeline.push({ $skip: skip }, { $limit: 3 });
    const client = await clientPromise;
    const db = client?.db("khamar-bazaar");
    const listingCount = await db?.collection("listings").countDocuments();
    const listings = await db
      ?.collection("listings")
      .aggregate(pipeline)
      .toArray();
    console.log(listingCount);
    return NextResponse.json({ data: listings, listingCount });
  } catch (error) {
    console.error("Error in GET /api/listings", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
  //   return NextResponse.json({ message: "server is on" });
};
