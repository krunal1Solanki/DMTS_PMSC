import {connect} from "../../../../dbConfig/dbConfig"
import queryModel from '@/models/queryMaster'
import { writeFile, mkdir } from 'fs/promises';
import { readFile } from "fs";
import { join, dirname } from 'path';
import {NextRequest, NextResponse} from "next/server"
connect()
;
export async function POST (request : NextRequest) {
    try {
        let body = await request.formData();
        console.log(body)
        let _id = body.get("_id");
        let queryStatus = body.get("queryStatus");
        let remarks = body.get("remarks");
        let afterAttachments = body.get('afterAttachments');

        const timestamp = Date.now();
        if (afterAttachments) {
            //@ts-ignore
            const bytes = await afterAttachments.arrayBuffer();
            const buffer = Buffer.from(bytes);

            //@ts-ignore
            const relativePath = join('..', 'images', `${timestamp}_${afterAttachments.name}`);
            
            // Specify the absolute path
            const absolutePath = join(process.cwd(), 'public', relativePath);

            // Create the directory if it doesn't exist
            await mkdir(dirname(absolutePath), { recursive: true });
            
            await writeFile(absolutePath, buffer);
            afterAttachments = absolutePath; // Assign the absolute path if file is present
        }
        console.log("AFTER", afterAttachments )

        if(remarks)
            await queryModel.findOneAndUpdate({_id}, {$set : {queryStatus, remarks, afterAttachments}});
        else 
            await queryModel.findOneAndUpdate({_id}, {$set : {queryStatus, afterAttachments}});
        return NextResponse.json({
            message : "Query Raised Successfully"
        })
    } catch (err : any) {
        return NextResponse.json({
            error : err.message
        })
    }
}
export const revalidate = 0;