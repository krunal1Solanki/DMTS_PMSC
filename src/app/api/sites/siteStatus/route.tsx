import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteMaster from "@/models/siteMaster.js"

connect()

;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json()
        const updatedInfo = await siteMaster.findOneAndUpdate(
          { _id: body._id },
          { $set: { isDMTSActive: body.isDMTSActive } },
          { new: true } // This option returns the modified document instead of the original one
        );
        
        console.log('SACECEC', updatedInfo);
        
        return NextResponse.json({
          message: "OK"
        });
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
