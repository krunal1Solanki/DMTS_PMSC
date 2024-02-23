import projectMaster from "@/models/projectMaster.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"

connect()
export async function GET (request : NextRequest) {
    try {
        const info = await projectMaster.find();
        return NextResponse.json({
            projects : info
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
