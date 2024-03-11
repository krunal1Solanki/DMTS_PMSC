import userModel from "@/models/userModel.js";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, params : any) {

    try {
        const body = await request.json();
        const {id, groupName} = body;
        console.log(body)

        if(!id || !groupName) {
            return NextResponse.json({
                message : `${!id ? 'id' : 'group name'} NOT FOUND`
            })
        };

        const user = await userModel.find({_id : id});
        console.log('user', user[0].assignedGroups)

        for(let i = 0; i < user[0].assignedGroups.length; i ++) {
            console.log(i, "HITHERE", user[0].assignedGroups[i])
            if(user[0].assignedGroups[i].groupName == groupName) {
                user[0].set(`assignedGroups.${i}.status`, 'completed');
                console.log("AFTER", user[0].assignedGroups)
            }
        }

        await user[0].save();

        
        return NextResponse.json({
            message: "Route staus updated successfully",
        });

    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}

export const revalidate = 0;
