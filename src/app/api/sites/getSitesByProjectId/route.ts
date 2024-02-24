import siteMaster from "@/models/siteMaster.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"

connect()

;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();
        console.log("BOD", body)
        const {projectID} = body
        let sites 
        if(projectID.length != 0)
            sites = await siteMaster.find({isDMTSActive : true, projectID });
        else 
            sites = await siteMaster.find({isDMTSActive : true });
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
export const revalidate = 0;