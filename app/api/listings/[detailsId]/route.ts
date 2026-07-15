import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  context: { params: Promise<{ detailsId: string }> },
) => {
  const { detailsId } = await context.params;
  try {
    const client = await clientPromise;
    const db = client?.db("khamar-bazaar");
    // console.log(db?.collection("listings"));
    const query: { _id: ObjectId } = {
      _id: new ObjectId(detailsId),
    };
    const listings = await db?.collection("listings").findOne(query);
    // console.log(listings);
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error in GET /api/listings/[detailsId]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
  //   return NextResponse.json({ message: "server is on" });
};
