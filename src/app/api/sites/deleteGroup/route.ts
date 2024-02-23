import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteGroupModel from "@/models/siteGroupMode.js";
import userModel from "@/models/userModel.js";

connect()

;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();
        const {groupId} = body;
        console.log("ISSSS", groupId)

        await userModel.updateMany(
            {},
            {
              $pull: {
                assignedGroups: { groupId: groupId },
              },
            }
          );
      

        await siteGroupModel.deleteOne({_id : groupId});

        return NextResponse.json({
            message : "Deleted Successfully"
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
