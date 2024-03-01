import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteMaster from "@/models/siteMaster.js"
import officeModel from "@/models/officeModel.js";
import getAssignedSites from "@/helpers/getAssignedSites";

connect()

;
export async function GET (request : NextRequest) {
    try {
        let info = await getAssignedSites(request);

        const moreInfo = await officeModel.find();
        const modifiedInfo = moreInfo.map((item : any) => {
            item.pumpName = item.name
            return item;
        });
        info = [...info, ...modifiedInfo];
        console.log({info})
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