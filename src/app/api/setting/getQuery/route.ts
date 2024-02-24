import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import queryModel from "../../../../models/queryMaster";

connect();

export async function GET(request: NextRequest) {
    try {
        // Save the document to the database
        const queryDocuments = await queryModel.find();
        const processedQueries = await Promise.all(
            queryDocuments.map(async (query: any) => {
                let attachmentsData = null; // Initialize attachments data to null
                
                if (query.attachments) {
                    // Read the file content if attachments field exists
                    //@ts-ignore
                    const fileBuffer = await readFile(query.attachments);
                    attachmentsData = fileBuffer.toString("base64"); // Sending base64 encoded file content
                }

                return {
                    _id: query._id,
                    selectedSite: query.selectedSite,
                    selectedUser: query.selectedUser,
                    querySubject: query.querySubject,
                    queryDescription: query.queryDescription,
                    selectedPriority: query.selectedPriority,
                    attachments: attachmentsData, // Assign attachmentsData or null based on the condition
                    responsibleUser: query.responsibleUser || "None",
                    queryStatus: query.queryStatus,
                    complaintPhoneNumber: query.complaintPhoneNumber,
                    complaintSource: query.complaintSource,
                    complaintNumber: query.complaintNumber
                };
            })
        );

        return NextResponse.json({
            info: processedQueries,
        });
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
export const revalidate = 0;