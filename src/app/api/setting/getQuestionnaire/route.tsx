import {connect} from "../../../../dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server"
import  questionnaireModel from '../../../../models/questionnaireMaster'
connect()
export async function GET (request : NextRequest) {
    try {
        // Save the document to the database
        const info = await questionnaireModel.find({type : "question"});
        return NextResponse.json({
            message :  info
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
