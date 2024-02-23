import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import officeModel from '../../../../models/officeModel';

connect();

;
export async function GET(request: NextRequest) {
    try {

        const data = await officeModel.find();
       
        return NextResponse.json({
            message: "Office record fetched successfully",
            data 
        });
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
