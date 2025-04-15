// src/app/api/users/update-user/[Id]/route.js
'use server'
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Users from "@/models/Users";

export async function PUT(request, { params }) {
  await dbConnect();

  const { Id } = params; // Extract the dynamic Id parameter
  console.log("Received Id:", Id);

  const { name, email,  plan, imageGenerator, vIdeoGenerator, audioGenerator, codeGenerator } = await request.json(); // Get updated user data from the request body

  // Check if the Id is valId and required fields are present
  if (!Id || !name || !email ) {
    return NextResponse.json({ message: 'Missing required fields (name, email, password)' }, { status: 400 });
  }

  try {
    // Find and update the user by Id
    const updatedUser = await Users.findByIdAndUpdate(
      Id,
      {
        name,
        email,
     // you might want to hash it before saving
        plan,
        imageGenerator,
        vIdeoGenerator,
        audioGenerator,
        codeGenerator,
      }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      console.log("No user found with Id:", Id);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
