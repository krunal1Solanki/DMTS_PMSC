import userModel from "@/models/userModel.js";
import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import userSiteHistoryModel from '@/models/userSiteHistoryModel.js'
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
        return NextResponse.json({
          message: "Groups has been successfully assigned !"
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
