import { connect } from "@/dbConfig/dbConfig";
import  SoftwareCategory from "@/models/softwareCategoryModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name } = reqBody;
    // Create a new software document
    const newCategory = new SoftwareCategory({
      name,
    });
    // Save the category document
    await newCategory.save();
    return NextResponse.redirect("/admin/categories");
  } catch (error) {
    return NextResponse.redirect("/admin/categories");
  }
}
