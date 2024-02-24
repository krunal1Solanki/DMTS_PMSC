import userModel from "@/models/userModel.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import mongoose from "mongoose";

connect()

;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json()
        const {userId, groupId} = body;
        const result = await userModel.updateOne(
            { _id: new mongoose.Types.ObjectId(userId) },
            { $pull: { assignedGroups: { groupId: groupId } } }
          );
      
        return NextResponse.json({
          message: "OK"
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;