import { connect } from "../../../../../dbConfig/dbConfig"
import questionnaireMaster from '@/models/questionnaireMaster'
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest, params: any) {
    try {
        {console.log("INnn")}
        const queryId = params.params.id;
        console.log(queryId)
        const data = await questionnaireMaster.findOneAndUpdate({_id : queryId}, {isApproved : true});
        return NextResponse.json({
            message : "Approved successfully"
        })
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;