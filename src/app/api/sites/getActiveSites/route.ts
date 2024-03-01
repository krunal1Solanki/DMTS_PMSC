import siteMaster from "@/models/siteMaster.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import UserProjectLink from "@/models/userProjectLink.js";
import getDataFromToken from "@/helpers/getDataFromToken";
import getAssignedSites from "@/helpers/getAssignedSites";


connect()

;
export async function GET (request : NextRequest) {
    try {
        let sites = await getAssignedSites(request);
        sites = sites.filter((item : any) => item.isDMTSActive == true);
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