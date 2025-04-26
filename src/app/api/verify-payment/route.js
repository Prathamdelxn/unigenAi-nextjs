// app/api/verify-payment/route.js
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== body.razorpay_signature) {
      return Response.json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Update user's plan in database
    const updateResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/update-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        plan: body.plan,
        cycle: body.cycle
      }),
    });

    const updateData = await updateResponse.json();

    if (!updateData.success) {
      return Response.json({
        success: false,
        message: updateData.message || 'Failed to update plan'
      });
    }

    return Response.json({
      success: true,
      message: 'Payment verified and plan updated successfully'
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}