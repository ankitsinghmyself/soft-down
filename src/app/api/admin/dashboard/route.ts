import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400})
        }
        if(user.isAdmin !== true){

            return NextResponse.json({
                mesaaage: "You are not an admin", isAdmin: false, status: 400
                
                })
        }
        if(user.isAdmin === true){
            return NextResponse.json({
                mesaaage: "Admin found",
                data: user,
                isAdmin: true,
                status: 200
            })
        }else{
            return NextResponse.json({error: "You are not an admin!", isAdmin: false}, {status: 400})
        }
      
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}