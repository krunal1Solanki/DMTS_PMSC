import fs from 'fs';
import { connect } from '../../../../dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';

import questionnaireModel from '../../../../models/questionnaireMaster';

connect();
async function decodeImagesToBase64(images : any) {
  const decodedImages = [];
  for (const image of images) {
    const imageData = await readFile(image.answer, { encoding: 'base64' });
    decodedImages.push({
      ...image,
      answer: imageData,
    });
  }
  return decodedImages;
}

export async function GET(request: NextRequest) {
  try {
    // Save the document to the database
    const info = await questionnaireModel.find({ type: 'answer' }).lean();

    const decodedInfo = [];

    for (const questionnaire of info) {
        console.log(questionnaire.images)
      const decodedImages = await decodeImagesToBase64(questionnaire.images);
      decodedInfo.push({
        ...questionnaire,
        images: decodedImages,
      });
    }

    console.log(decodedInfo);

    return NextResponse.json({
      message: decodedInfo,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      error: err.message,
    });
  }
}
