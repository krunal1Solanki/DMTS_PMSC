import userModel from "@/models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connect();

export async function GET(request: NextRequest,) {
    try {
       
        const response = NextResponse.json({
            message: "Logged out!",
        });

        response.cookies.set("token", "", {httpOnly : true,expires : new Date(0)});
        
        return response;
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
