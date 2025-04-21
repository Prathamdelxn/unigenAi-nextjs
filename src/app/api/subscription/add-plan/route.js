import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Plan from '@/models/Plan';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const {
      name,
      monthlyPrice,
      yearlyPrice,
      description = '',
      features = [],
      icon = '⭐',
      color = 'bg-blue-500',
      active = true,
    } = body;

    if (!name || !monthlyPrice || !yearlyPrice) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPlan = await Plan.create({
      name,
      monthlyPrice,
      yearlyPrice,
      description,
      features,
      icon,
      color,
      active,
    });

    return NextResponse.json({ success: true, data: newPlan }, { status: 201 });
  } catch (error) {
    console.error('Plan creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
