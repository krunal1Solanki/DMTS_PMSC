import checkingStatusModel from "@/models/checkingStatusModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function GET(request: NextRequest) {
    try {
        const info = await checkingStatusModel.aggregate([
            {
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
            }
          ]);
        return NextResponse.json({
            message: info
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;