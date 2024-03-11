import userModel from "@/models/userModel";
import checkingStatusModel from "@/models/checkingStatusModel"
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import calculateDistance from '../../../../helpers/calculateDistance.js'
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
            const latestCheckin = await checkingStatusModel.find({userId : _id, checkingStatus : "checkedIn"}).sort({creationDate : -1}).limit(1);

            const distance = user.distanceTravelled || 0;

            const newDistance = calculateDistance(latitude, longitude, latestCheckin[0].latitude, latestCheckin[0].longitude) + distance;
            user.set(`distanceTravelled`, newDistance);
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
export const revalidate = 0;