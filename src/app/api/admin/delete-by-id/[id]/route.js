'use server'
import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Admin from '@/models/Admin';

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;  // Get ID from route parameters

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Admin ID is required' },
        { status: 400 }
      );
    }

    // Delete admin by ID
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Admin deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
