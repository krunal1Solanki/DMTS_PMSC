import { connect } from "../../../../dbConfig/dbConfig";
import questionnaireMaster from '@/models/questionnaireMaster';
import { NextRequest, NextResponse } from "next/server";
import { writeFile , mkdir} from 'fs/promises';
import { join, dirname } from 'path';


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
                console.log("FILE", file, "FILE")
                const timestamp = Date.now();
        
                // Decode base64 string to buffer
                const buffer = Buffer.from(file, 'base64');
                
                //@ts-ignore
                const relativePath = join('..', 'images', `${timestamp}_${imageName}`);
                
                // Specify the absolute path
                const absolutePath = join(process.cwd(), 'public', relativePath);
        
                // Create the directory if it doesn't exist
                await mkdir(dirname(absolutePath), { recursive: true });
                
                await writeFile(absolutePath, buffer);
        
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
export const revalidate = 0;