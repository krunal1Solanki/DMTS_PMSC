import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import officeModel from '../../../../models/officeModel';

connect();

export async function POST(request: NextRequest) {
    try {
        // Parse the JSON body from the request
        const body = await request.json();

        // Extract fields from the request body
        const { name, state, block, latitude, longitude, address, pincode, inChargeName, inChargeMobile, officeId } = body;

        // Create a new instance of the officeModel with the extracted fields
        const newOffice = {
            name,
            state,
            block,
            latitude,
            longitude,
            address,
            pincode,
            inChargeName,
            inChargeMobile,
        };

        // Save the document to the database
        const editedOffice = await officeModel.findOneAndUpdate({_id : officeId}, {...newOffice});

        return NextResponse.json({
            message: "Office record edit successfully",
            data: editedOffice,
        });
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
