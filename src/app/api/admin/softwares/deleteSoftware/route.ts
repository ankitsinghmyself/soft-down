
import { connect } from "@/dbConfig/dbConfig";
import Software from "@/models/softwareModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Initialize your database connection

export async function DELETE(req: NextRequest) {
  try {
    const url = req.url;
    const urlObject = new URL(url);
    const softwareId = urlObject.searchParams.get('softwareId');

    // Make sure to check if softwareId is present before using it
    if (!softwareId) {
      return NextResponse.json({ error: "Missing softwareId" }, { status: 400 });
    }


    // Delete the software record from the database
    const deletedSoftware = await Software.findByIdAndDelete(softwareId as string);

    if (!deletedSoftware) {
      return NextResponse.json({ error: "Software not found" }, { status: 404 });
    }

    const response = NextResponse.json({
      message: "Software deleted successfully",
      success: true,
      software: deletedSoftware,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
