import userModel from "@/models/userModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {


        const users = await userModel.find();
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.assignedGroups) {
                for (let j = 0; j < user.assignedGroups.length; j++) {
                    if (user.assignedGroups[j].isPreventive) {
                        user.set(`assignedGroups.${j}.status`, "pending");
                        console.log("CHANGED", user.assignedGroups[j]);
                        const info = await user.save();
                        console.log("INFOOOOOO", info);
                    }
                }
            }
        }
        

        return NextResponse.json({
            message: "Route assigned successfully",
        });

    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}

export const revalidate = 0;
