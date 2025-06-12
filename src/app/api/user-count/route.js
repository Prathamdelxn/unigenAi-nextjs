// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import dbconnect from '@/utils/db'
// import User from '@/models/Users'; // adjust path if needed

// export async function GET() {
//   try {
//     // Connect to MongoDB
//    dbconnect();

//     const count = await User.countDocuments();

//     return NextResponse.json({ success: true, count });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: 'Failed to fetch user count' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
 import dbconnect from '@/utils/db'
import User from '@/models/Users'; // ✅ Make sure this path is correct

export async function GET() {
  try {
    // Connect to MongoDB if not already connected
    dbconnect();

    const users = await User.find();

    const totalUsers = users.length;
    let imageTotal = 0;
    let videoTotal = 0;
    let audioTotal = 0;
    let codeTotal = 0;

    for (const user of users) {
      imageTotal += user.imageGenerator || 0;
      videoTotal += user.videoGenerator || 0;
      audioTotal += user.audioGenerator || 0;
      codeTotal += user.codeGenerator || 0;
    }

    const grandTotal = imageTotal + videoTotal + audioTotal + codeTotal;

    return NextResponse.json({
      success: true,
      totalUsers,
      imageTotal,
      videoTotal,
      audioTotal,
      codeTotal,
      grandTotal,
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching user stats' }, { status: 500 });
  }
}
