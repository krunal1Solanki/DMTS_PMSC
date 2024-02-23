import { connect } from "../../../../dbConfig/dbConfig";
import questionnaireMaster from '@/models/questionnaireMaster';
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import { join, extname } from 'path';

connect();

;
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { type, userId, userName, formType, questionnaireName, questions, images } = body;
        console.log(type, userId, userName, formType, questionnaireName, questions);

        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const file = images[i].answer;
                const imageName = images[i].imageName;

                // Decode base64 string to buffer
                const buffer = Buffer.from(file, 'base64');

                const timestamp = Date.now();
                const fileExtension = extname(imageName) || '.png'; // Get the file extension or default to .png

                // Sanitize the filename and append the extension
                const sanitizedFileName = `${timestamp}_IMAGE${fileExtension}`;

                const relativePath = join('images', sanitizedFileName);
                
                const absolutePath = join(process.cwd(), 'public', relativePath);

                await writeFile(absolutePath, buffer);
                console.log(absolutePath);

                images[i].answer = absolutePath; // Store relative path in the database
            }
        }

        const info = new questionnaireMaster({
            type, userId, userName, formType, questionnaireName, questions, images
    });

        await info.save();
        console.log("finaaaalll", info);

        return NextResponse.json({
            message: "Query Raised Successfully"
        });
    } catch (err: any) {
        console.log('PP');
        return NextResponse.json({
            error: err.message
        });
    }
}
