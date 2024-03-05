import queryModel from "@/models/queryMaster"
import { connect } from "../../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest, params: any) {
    try {

        const complaints = await queryModel.find();
        

        return NextResponse.json({
            message: "Ok"
        })
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;