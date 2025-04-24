



'use server'
import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Admin from '@/models/Admin';
export async function GET() {
  try {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected to DB');

    const admins = await Admin.find().sort({ createdAt: -1 });
    console.log('Fetched admins:', admins);

    return NextResponse.json({ success: true, data: admins }, { status: 200 });
  } catch (err) {
    console.error('Error in GET /api/admin/fetch-admin:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
