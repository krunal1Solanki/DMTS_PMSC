import userSiteHistoryModel from "@/models/userSiteHistoryModel.js";
import { connect } from "../../../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose";

connect();

export async function GET(request: NextRequest, params : any) {
    try {
        const id = params.params.id;
        console.log(id)
        const data = await userSiteHistoryModel.aggregate([
            {
                '$match' : {
                    userId : new mongoose.Types.ObjectId(id)
                }
            },
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