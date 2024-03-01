import { connect } from "../../../../../dbConfig/dbConfig"
import userSiteHistoryModel from '@/models/userSiteHistoryModel'
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest, params: any) {
    try {
        {console.log("INnn", params)}
        const queryId = params.params.id;
        const data = await userSiteHistoryModel.findOneAndUpdate({_id : queryId}, {status : "completed"});
        return NextResponse.json({
            message : "User history updated successfully"
        })
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;