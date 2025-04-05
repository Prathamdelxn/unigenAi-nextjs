
// 'use server'
// import connectDB from '@/utils/db';
// import User from '@/models/Users';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Email and password are required' }),
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const user = await User.findOne({ email });

//     if (!user) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'User not found' }),
//         { status: 404 }
//       );
//     }

//     if (user.password !== password) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Invalid credentials' }),
//         { status: 401 }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: 'Login successful',
//         user: { name: user.name, email: user.email },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Login error:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: 'Internal server error' }),
//       { status: 500 }
//     );
//   }
// }



'use server'

import connectDB from '@/utils/db';
import User from '@/models/Users';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' } // valid for 7 days
    );

    // Send token in the response (alternatively set a secure cookie)
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        token, // send token to the frontend
        user: { name: user.name, email: user.email },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Optionally set the token as a secure HttpOnly cookie:
          // 'Set-Cookie': `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`
        }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
