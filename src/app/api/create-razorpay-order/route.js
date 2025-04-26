// app/api/create-razorpay-order/route.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { plan, cycle, amount, email } = await req.json();
    
    const options = {
      amount: amount, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `plan_${plan}_${cycle}_${Date.now()}`,
      notes: {
        plan,
        cycle,
        email
      }
    };

    const order = await razorpay.orders.create(options);

    return Response.json({
      success: true,
      order
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}