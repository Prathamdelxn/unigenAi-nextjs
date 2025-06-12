import Razorpay from 'razorpay';

export async function POST(req) {
  const { amount } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
    });
  }
}
