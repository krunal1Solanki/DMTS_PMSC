import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import getDataFromToken from '@/helpers/getDataFromToken'

connect();

export async function GET(request: NextRequest,) {
    try {
       const user = getDataFromToken(request);
       const response = NextResponse.json({
        user
       })
       return response;
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
export const revalidate = 0;