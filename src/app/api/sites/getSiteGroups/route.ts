import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteGroupModel from "@/models/siteGroupMode.js";

connect()

;
export async function GET (request : NextRequest) {
    try {
        const info = await siteGroupModel.find();
        return NextResponse.json({
            message : info
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;