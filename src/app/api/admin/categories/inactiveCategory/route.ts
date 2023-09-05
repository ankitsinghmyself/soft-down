import { connect } from "@/dbConfig/dbConfig";
import SoftwareCategory from "@/models/softwareCategoryModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    const urlObject = new URL(url);
    const categoryID = urlObject.searchParams.get("CategoryId");
    // isActie set to false
    const category = await SoftwareCategory.findByIdAndUpdate(
        categoryID as string,
        { isActive: false },
        { new: true }
    );
    const response = NextResponse.json({
        success: true,
        category,
    });
    return response;
    

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
