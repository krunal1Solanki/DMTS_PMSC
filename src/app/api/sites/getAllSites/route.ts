import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteMaster from "@/models/siteMaster.js"
import officeModel from "@/models/officeModel.js";

connect()

;
export async function GET (request : NextRequest) {
    try {
        let info = await siteMaster.find();

        const moreInfo = await officeModel.find();
        const modifiedInfo = moreInfo.map((item : any) => {
            item.pumpName = item.name
            return item;
        });
        info = [...info.filter((item : any) => item.isDMTSActive == true), ...modifiedInfo];
        //@ts-ignore
        console.log(info.length)
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