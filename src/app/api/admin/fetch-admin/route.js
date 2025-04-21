



'use server'
import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Admin from '@/models/Admin';

export async function GET() {
    try {
      await connectDB();
  
      const admins = await Admin.find().sort({ createdAt: -1 });
  
      return NextResponse.json({ success: true, data: admins }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
  }