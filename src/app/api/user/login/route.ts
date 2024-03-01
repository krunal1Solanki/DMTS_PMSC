import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import  bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import checkingStatusModel from "@/models/checkingStatusModel";
import { isErrored } from "stream";

connect();

export async function POST(request: NextRequest,) {
    try {
        const { OperatorName, password, imeiNumber, notificationToken } = await request.json();
        //imeiPMSC, imeiPMSCApproved
        // no, no,
        // 
        const user = await userModel.findOne({"pmscUserData.employeeId" : OperatorName });
        console.log({ user });

        const info = await checkingStatusModel.find({userId : user._id}).sort({creationDate : -1}).limit(1);

        if(imeiNumber) {
            const imei = user.imeiPMSC;
            const imeiPMSCApproved = user.imeiPMSCApproved;
            if(!imei || (imei && imei != imeiNumber && imeiPMSCApproved)) {
                user.imeiPMSC =  imeiNumber;
                await user.save();
                return NextResponse.json({
                    message : "IMEI in under approval",
                })
            }
            if(imei && !imeiPMSCApproved) {
                return NextResponse.json({
                    message : "IMEI is not approved yet",
                })
            }
         }

        if (!user) return NextResponse.json({
            message: "User not found!"
        });

        const isMatched = await bcryptjs.compare(password, user.Password);

        if (!isMatched) return NextResponse.json({
            message: "Please enter correct password!"
        });

        const newUser = {
            id : user._id,
            OperatorName : user.OperatorName,
            Designation : user.Designation,
            EmploymentType : user.EmploymentType,
            MobileNo : user.MobileNo,
            Password : user.Password,
            pmscUserData : user.pmscUserData,
            notificationToken : notificationToken
        };
        
        console.log("BEFORE", newUser)
        const token = jwt.sign({ user : newUser }, 'PIKACHU', { expiresIn: '1h' });

        const response = NextResponse.json({
            message: "User found!",
            user,
            info
        });
        
        console.log("TOKEN", token)
        response.cookies.set("token", token, {httpOnly : true});

        return response;
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
export const revalidate = 0;