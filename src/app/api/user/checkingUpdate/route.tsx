import userModel from "@/models/userModel";
import checkingStatusModel from "@/models/checkingStatusModel"
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest, params: any) {
    try {
        const body = await request.json();
        const {userId : _id, latitude, longitude, checkingStatus} = body;

        const user  = await userModel.findOne({_id});

        if(!user) {
            NextResponse.json({
                message : "User not found!"
            })
        }
        console.log("checking Status", checkingStatus)
        

        if(checkingStatus == "checkedIn") {
            user.checkingStatus = "checkedOut";
            await user.save();
            await checkingStatusModel.create({
                checkingStatus : "checkedOut",
                latitude,
                longitude,
                userId : _id    
            })
        } else {
            user.checkingStatus = "checkedIn";
            await user.save();
            await checkingStatusModel.create({
                checkingStatus : "checkedIn",
                latitude,
                longitude,
                userId : _id    
            })
        }
        


        return NextResponse.json({
            message: "Checking Status Updated Successfully"
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
