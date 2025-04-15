// src/app/api/users/delete-user/[id]/route.js
'use server'
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Users from "@/models/Users";

export async function DELETE(request, { params }) {
  await dbConnect();
  
  const { Id } =await params;
  console.log("Received ID:", Id);
  
  if (!Id) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }
  
  try {
    const deletedUser = await Users.findByIdAndDelete(Id);
    
    if (!deletedUser) {
      console.log("No user found with ID:", Id);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'User deleted successfully', 
      user: deletedUser 
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ 
      message: 'Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}