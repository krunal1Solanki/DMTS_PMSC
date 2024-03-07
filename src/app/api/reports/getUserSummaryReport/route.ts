import userSiteHistoryModel from "@/models/userSiteHistoryModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function GET(request: NextRequest) {
    try {

        const data = await userSiteHistoryModel.aggregate([
            {
                '$lookup': {
                    'from': 'siteGroupModel',
                    'localField': 'groupId',
                    'foreignField': '_id',
                    'as': 'groupData'
                }
            }, {
                '$lookup': {
                    'from': 'UserMaster',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'userData'
                }
            }, {
                '$unwind': {
                    'path': '$userData'
                }
            }, {
                '$unwind': {
                    'path': '$groupData'
                }
            }
        ]);


        return NextResponse.json({
            message: data
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;