import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { subscriptionAmount, hostingCost, aiToolCost } = body;

    // Validate inputs
    if (
      typeof subscriptionAmount !== 'number' ||
      typeof hostingCost !== 'number' ||
      typeof aiToolCost !== 'number'
    ) {
      return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
    }

    // Razorpay Fee (2%)
    const razorpayFee = parseFloat((subscriptionAmount * 0.02).toFixed(2));

    // Net Revenue Calculation
    const netRevenue = parseFloat(
      (subscriptionAmount - razorpayFee - hostingCost - aiToolCost).toFixed(2)
    );

    return NextResponse.json({
      subscriptionAmount,
      razorpayFee,
      hostingCost,
      aiToolCost,
      netRevenue,
    });
  } catch (error) {
    console.error('Revenue calculation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
