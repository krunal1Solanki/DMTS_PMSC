import {connect} from "../../../../dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server"
import  questionnaireModel from '../../../../models/questionnaireMaster'
connect()
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();
       
        const { questionnaireName, questions, images, type } = body;


        const newQuestionnaire = new questionnaireModel({
            questionnaireName,
            questions,
            images,
            formType : type
        });

        // Save the document to the database
        console.log("BODYY", body)
        const info = await newQuestionnaire.save();
        return NextResponse.json({
            message :  info
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
