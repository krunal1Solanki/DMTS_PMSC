import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import questionnaireModel from '../../../../models/questionnaireMaster';

connect();


export async function DELETE(request: NextRequest) {
    try {
      // Extract the questionnaireId from the request body
      const body = await request?.json();
      const { questionnaireId } = body;
  
      // Validate if questionnaireId is provided
      if (!questionnaireId) {
        throw new Error('Questionnaire ID is required for deletion.');
      }
  
      // Delete the questionnaire from the database
      await questionnaireModel.findByIdAndDelete(questionnaireId as string);
  
      // Retrieve the updated list of questionnaires after deletion
      const updatedQuestionnaires = await questionnaireModel.find();
  
      return NextResponse.json({
        message: updatedQuestionnaires,
        success: true
      });
    } catch (err : any) {
      return NextResponse.json({
        error: err.message
      });
    }
  }