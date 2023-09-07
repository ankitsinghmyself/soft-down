import { connect } from "@/dbConfig/dbConfig";
import Software from "@/models/softwareModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function GET(request: NextRequest) {
  try {
    const url = request.url;
    const urlObject = new URL(url);
    const softwareId = urlObject.searchParams.get('softwareId');
    const software = await Software.findOne({_id: softwareId });

    if (!software) {
      return NextResponse.json({ success: false, message: "Software not found" }, { status: 404 });
    }

    const response = NextResponse.json({
      success: true,
      software,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}