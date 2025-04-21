import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Plan from '@/models/Plan';

export async function GET(request) {
  await dbConnect();

  try {
    // Fetch all plans and sort them by monthlyPrice in ascending order
    const plans = await Plan.find().sort({ monthlyPrice: 1 }).exec();

    // If no plans are found
    if (!plans.length) {
      return NextResponse.json(
        { success: false, message: 'No plans found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: plans }, { status: 200 });
  } catch (error) {
    console.error('Plan fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
