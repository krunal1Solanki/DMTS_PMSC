import userModel from "@/models/userModel.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
connect()
;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();
        console.log(body.group);

        const info = await userModel.findByIdAndUpdate(body.user._id, { $set: { emergencyGroup: body.group } });
        return NextResponse.json({
            message : "Route assigned successfully"
        })
   
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;