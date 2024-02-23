import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest,) {
    try {
     const body = await request.json();
     const w = await userModel.findOneAndUpdate({ employeeId : body.pmscUserData.employeeId}, {...body});

     return NextResponse.json({
        message : "User has been edited successfully"
     })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
