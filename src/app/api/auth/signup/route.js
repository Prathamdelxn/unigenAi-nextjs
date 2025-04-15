
'use server'
import connectDB from '@/utils/db';
import User from '@/models/Users';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ success: false, message: 'All fields are required' }), {
        status: 400,
      });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: 'Email already registered' }), {
        status: 409,
      });
    }

    const newUser = await User.create({ name, email, password ,plan:"Basic",imageGenerator:0, videoGenerator:0,audioGenerator:0,codeGenerator:0});

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User registered successfully',
        user: { name: newUser.name, email: newUser.email},
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), {
      status: 500,
    });
  }
}
