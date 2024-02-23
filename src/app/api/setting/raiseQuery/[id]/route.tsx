import { connect } from "../../../../../dbConfig/dbConfig"
import queryModel from '@/models/queryMaster'
import { NextRequest, NextResponse } from "next/server"
import { join } from 'path'
import { readFile, writeFile } from "fs/promises";

connect()
;
export async function GET(request: NextRequest, params: any) {
    try {
        const queryId = params.params.id

        const queryDetails = await queryModel.findOne({ _id: queryId });

        if (!queryDetails) {
            return NextResponse.json({
                error: "Query not found",
            });
        }

        // Read the file content
        const fileBuffer = await readFile(queryDetails.attachments);

        return NextResponse.json({
            queryDetails: {
                selectedSite: queryDetails.selectedSite,
                selectedUser: queryDetails.selectedUser,
                querySubject: queryDetails.querySubject,
                queryDescription: queryDetails.queryDescription,
                selectedPriority: queryDetails.selectedPriority,
                attachments: fileBuffer.toString('base64'), // Sending base64 encoded file content
                responsibleUser: queryDetails.responsibleUser,
            },
        });
    } catch (err: any) {
        console.log('PP')
        return NextResponse.json({
            error: err.message
        })
    }
}
