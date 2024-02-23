import { connect } from "../../../../../dbConfig/dbConfig"
import groupModel from '@/models/siteGroupMode'
import { NextRequest, NextResponse } from "next/server"

connect()

;
export async function GET(request: NextRequest, params: any) {
    try {
        const queryId = params.params.groupId;
        console.log(queryId)
        const data = await groupModel.findOne({_id : queryId});
        return NextResponse.json({
            data
        })
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
