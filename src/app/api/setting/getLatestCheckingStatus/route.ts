import getDataFromToken from "@/helpers/getDataFromToken"
import { connect } from "../../../../dbConfig/dbConfig"
import checkingStatusModel from '@/models/checkingStatusModel'
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

connect()

export async function GET(request: NextRequest) {
    try {
        const user = await getDataFromToken(request);
        const userId = user.user.id;
        console.log(userId)
        const info = await checkingStatusModel.aggregate([
            {
              '$match': {
                'userId': new mongoose.Types.ObjectId(userId)
              }
            }, {
              '$sort': {
                'creationDate': -1
              }
            }, {
              '$limit': 1
            }
          ]
          )
    
        return NextResponse.json({
            message : info
        })
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        })
    }
}
export const revalidate = 0;