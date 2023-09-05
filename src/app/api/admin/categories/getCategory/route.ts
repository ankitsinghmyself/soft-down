import { connect } from "@/dbConfig/dbConfig";
import SoftwareCategory from "@/models/softwareCategoryModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function GET(req: NextRequest) {
  try {
    const Category = await SoftwareCategory.find({});
    const response = NextResponse.json({
      success: true,
      Category,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
