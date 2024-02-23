import siteMaster from "@/models/siteMaster.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"

connect()

;
export async function GET (request : NextRequest) {
    try {
        const sites = await siteMaster.find({isDMTSActive : true});
        console.log("LLL",sites.length)
        return NextResponse.json({
            sites
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
