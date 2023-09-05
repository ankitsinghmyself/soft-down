import { connect } from "@/dbConfig/dbConfig";
import Software from "@/models/softwareModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, description, category, link, image } = reqBody;
    // Create a new software document
    const newSoftware = new Software({
      name,
      description,
      category,
      link,
      image,
    });

    // Save the new software record to the database
    const savedSoftware = await newSoftware.save();

    const response = NextResponse.json({
      message: "Software added successfully",
      success: true,
      software: savedSoftware,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
