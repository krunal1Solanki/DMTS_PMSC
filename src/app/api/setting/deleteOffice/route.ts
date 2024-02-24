import {connect} from "../../../../dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server"
import  officeModel from '../../../../models/officeModel'
connect()

export async function POST (request : NextRequest) {
    try {

        const {officeId} = await request.json();

        await officeModel.deleteOne({_id : officeId}); 
        console.log(request)
        return NextResponse.json({
            message :  "Deleted successfully !"
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;