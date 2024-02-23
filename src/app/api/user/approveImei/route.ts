import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest,) {
    try {
        const body = await request.json();
        const {_id, imeiPMSCApproved} = body;
        const info = await userModel.findOneAndUpdate({_id}, {$set : {imeiPMSCApproved}})
        return NextResponse.json({
            message : "Status Updated"
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
