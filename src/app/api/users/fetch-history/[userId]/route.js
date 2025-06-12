import { NextResponse } from "next/server";
import dbconnect from "@/utils/db";
import History from "@/models/History";

export async function GET(req, { params }) {
  await dbconnect();

  const { userId } = params;

  try {
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const userHistory = await History.find({ userId }).sort({ _id: -1 }); // Latest first

    return NextResponse.json({ history: userHistory }, { status: 200 });
  } catch (error) {
    console.error("Error fetching history by user ID:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
