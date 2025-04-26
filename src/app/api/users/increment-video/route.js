import { NextResponse } from 'next/server';
import dbConnect from "@/utils/db";
import User from '@/models/Users';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $inc: { videoGenerator: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Video count incremented', user: updatedUser });
  } catch (error) {
    console.error('Error incrementing videoGenerator:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
