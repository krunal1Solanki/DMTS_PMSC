import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import userModel from "@/models/userModel.js"

connect()
export async function GET (request : NextRequest) {
    try {
        const users = await userModel.find({isPMSCUser : true}).select('_id OperatorName imeiPMSCApproved imeiPMSC  pmscUserData');

        return NextResponse.json({
          message: users
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;