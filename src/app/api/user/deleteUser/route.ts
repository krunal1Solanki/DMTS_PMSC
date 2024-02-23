import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest,) {
    try {
     const {userId} = await request.json();
    

     await userModel.deleteOne({_id: userId});

     return NextResponse.json({
        message : "User has been deleted successfully"
     })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
