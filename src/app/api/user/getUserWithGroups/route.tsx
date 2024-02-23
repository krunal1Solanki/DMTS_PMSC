import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteGroupModel from '../../../../models/siteGroupMode.js'
import userModel from "@/models/userModel.js"

connect()
export async function GET (request : NextRequest) {
    try {
        const users = await userModel.find({isPMSCUser : true}).select('_id assignedGroups OperatorName imeiPMSCApproved imeiPMSC  pmscUserData');

        return NextResponse.json({
          message: users
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
