import userModel from "@/models/userModel.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import userSiteHistoryModel from '@/models/userSiteHistoryModel.js'
import getDataFromToken from "@/helpers/getDataFromToken";
import sendNotfication from "@/helpers/sendNotification";

connect()

;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();
        const {userId, groups} = body;

        for(let i = 0; i < groups.length; i ++) {
            groups[i].createAt = new Date();
        }
        const user = await userModel.findOne({_id : userId});
        console.log(user.assignedGroups, groups);
        let ids = user.assignedGroups.map((item : any) => item.groupId);

        for(let i = 0; i < groups.length; i ++) {
            if(ids.includes(groups[i].groupId)) {
                return NextResponse.json({
                    message : "Some Groups Are Already Assigned"
                })
            }
        }

        user.assignedGroups = [...user.assignedGroups, ...groups];
        user.save();
        for(let i = 0; i < groups.length; i ++) {
            await userSiteHistoryModel.create({
                userName : user.OperatorName,
                userId : userId,
                groupId : groups[i].groupId,
                groupName : groups[i].groupName,
            })
        }


        const userData = await getDataFromToken(request);
        const token = userData.notificationToken;
        await sendNotfication(token, "Group Assigned !", 'New group has been assigned please check.')
        return NextResponse.json({
          message: "Groups has been successfully assigned !"
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;