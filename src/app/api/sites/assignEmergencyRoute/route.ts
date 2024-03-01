import userModel from "@/models/userModel.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import sendNotification from "@/helpers/sendNotification.js";
connect()
;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();

        const info = await userModel.findByIdAndUpdate(body.user._id, { $set: { emergencyGroup: body.group } });
        await sendNotification(info.notificationToken, "Emergency Group", "You have been assigned emergency group please check!")
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