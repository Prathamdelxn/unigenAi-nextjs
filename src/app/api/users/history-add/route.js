import { NextResponse } from "next/server";
import dbconnect from "@/utils/db";
import History from "@/models/History";

export async function POST(req) {
  await dbconnect();

  try {
    const body = await req.json();
    const { userId, toolType, time, day, details } = body;

    // if (!userId || !toolType || !time || !day || !details) {
    //   return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    // }

    const newHistory = new History({
      userId,
      toolType,
      time,
      day,
      details,
    });

    await newHistory.save();

    return NextResponse.json({ message: "History entry added successfully", history: newHistory }, { status: 201 });
  } catch (error) {
    console.error("Error adding history:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
