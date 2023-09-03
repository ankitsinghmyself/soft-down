import { connect } from "@/dbConfig/dbConfig";
import Software from "@/models/softwareModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function GET(request: NextRequest) {
  try {
    // Get all software records from the database
    const softwares = await Software.find({});

    const response = NextResponse.json({
      success: true,
      softwares,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}