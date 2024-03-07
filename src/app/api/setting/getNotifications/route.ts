import getDataFromToken from "@/helpers/getDataFromToken"
import { connect } from "../../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import notificationModel from "@/models/notificationModel"

connect()

export async function GET(request: NextRequest) {
    try {
        const user = getDataFromToken(request);
        const userId = user.user.id
        const data = await notificationModel.find({userId});
        return NextResponse.json({
            message :data
        })
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;