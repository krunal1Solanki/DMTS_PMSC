import { connect } from "../../../../dbConfig/dbConfig";
import siteGroupMode from '@/models/siteGroupMode';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { groupId, pumpName } = body;

        // Update the document with the provided groupId and matching pumpName
        const updatedInfo = await siteGroupMode.findOneAndUpdate(
            {
                _id: groupId,
                "sites.pumpName": pumpName
            },
            {
                $set: { "sites.$.completed": true }
            },
            { new: true } // Return the updated document
        );

        if (!updatedInfo) {
            throw new Error("Group or pump not found");
        }

        return NextResponse.json({
            message: "Site group assigned successfully"
        });
        
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        });
    }
}

export const revalidate = 0;
