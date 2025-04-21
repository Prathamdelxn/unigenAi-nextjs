// app/api/admin/route.js

'use server'
import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Admin from '@/models/Admin';

// Allow CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Admin with this email already exists" },
        {
          status: 409,
          headers: corsHeaders,
        }
      );
    }

    const newAdmin = new Admin({ name, email, password });
    const savedAdmin = await newAdmin.save();

    return NextResponse.json(
      { success: true, data: savedAdmin },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
