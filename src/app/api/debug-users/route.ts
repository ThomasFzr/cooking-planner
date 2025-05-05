import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await connectToDatabase();
  const users = await db.collection("users").find().toArray();
  return NextResponse.json({ count: users.length, users });
}
