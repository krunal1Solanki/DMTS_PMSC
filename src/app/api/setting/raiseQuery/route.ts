import { connect } from "../../../../dbConfig/dbConfig";
import queryModel from '@/models/queryMaster';
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';   
import { readFile } from "fs";
import userModel from "@/models/userModel";
import notificationModel from '@/models/notificationModel'
import sendNotification from "@/helpers/sendNotification";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.formData();
        const file = body.get("attachments");
        const selectedSite = body.get("selectedSite");
        const selectedUser = body.get("selectedUser");
        const querySubject = body.get("querySubject");
        const queryDescription = body.get("queryDescription");
        const selectedPriority = body.get("selectedPriority");
        const complaintSource = body.get("complaintSource");
        const complaintNumber = body.get("complaintNumber");
        const complaintPhoneNumber = body.get("complaintPhoneNumber");
        //@ts-ignore
        const siteDetails = JSON.parse(body.get("siteDetails"));
        //@ts-ignore
        const responsibleUser = JSON.parse(body.get("responsibleUser"))

        const timestamp = Date.now();
        let attachments = null; // Initialize attachments to null

        if (file) {
            //@ts-ignore
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            //@ts-ignore
            const relativePath = join('..', 'images', `${timestamp}_${file.name}`);
            
            // Specify the absolute path
            const absolutePath = join(process.cwd(), 'public', relativePath);

            // Create the directory if it doesn't exist
            await mkdir(dirname(absolutePath), { recursive: true });
            
            await writeFile(absolutePath, buffer);
            attachments = absolutePath; // Assign the absolute path if file is present
        }

        await queryModel.create({
            selectedSite,
            selectedUser,
            querySubject,
            queryDescription,
            selectedPriority,
            attachments, // Add the attachments field conditionally
            responsibleUser,
            complaintNumber,
            siteDetails,
            complaintPhoneNumber,
            complaintSource
        });

        const user = await userModel.findOne({
            OperatorName : selectedUser,
        })


        console.log("THISS uis my uswess",user);
        const title = "Query Found !";
        const bodyNot = "Query has been assinged to you please check!";
        await sendNotification(user.notificationToken, title, bodyNot); 
        await notificationModel.create({
            title,
            body : bodyNot,
            userId : user._id
        })

        console.log(body);
        return NextResponse.json({
            message: "Query Raised Successfully"
        });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({
            error: err.message
        });
    }
}

export const revalidate = 0;
