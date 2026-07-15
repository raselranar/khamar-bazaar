import clientPromise from "@/lib/mongodb";
import validateToken from "@/lib/tokenVerify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authorization = request.headers.get("authorization");
    const token = authorization?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const payload = await validateToken(token);
    if (!payload)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const client = await clientPromise;
    const db = client?.db("khamar-bazaar");
    const result = await db?.collection("listings").insertOne(body);

    // response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/listings/add", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
  //   return NextResponse.json({ message: "server is on" });
}
