import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import userSiteHistoryModel from "@/models/userSiteHistoryModel.js"

connect()

;
export async function GET (request : NextRequest) {
    try {
        const info = await userSiteHistoryModel.find().sort({creationDate : -1});
        return NextResponse.json({
            message : info
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
