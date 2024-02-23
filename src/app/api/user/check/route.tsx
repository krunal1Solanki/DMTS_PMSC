import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest,) {
    try {
  
        const user = await userModel.find({isPMSCUser :true});
        console.log(user.length);
     return NextResponse.json({
        message : "User has been deleted successfully"
     })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
