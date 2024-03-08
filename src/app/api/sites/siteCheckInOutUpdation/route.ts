import { connect } from "../../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import siteGroupModel from "@/models/siteGroupMode.js";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const { groupId, pumpName, checkInTime, checkOutTime } = body;

    if (!groupId || !pumpName || (!checkInTime && !checkOutTime)) {
      throw new Error("Invalid request parameters");
    }

    const updateField = checkInTime ? 'sites.$.checkInTime' : 'sites.$.checkOutTime';
    const updateValue = checkInTime || checkOutTime;
    console.log({
        updateField, updateValue
    })
    // Update the specified field in the document with the given groupId and pumpName
    const result = await siteGroupModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(groupId),
        'sites.pumpName': pumpName,
      },
      {
        $set: {
          [updateField]: updateValue,
        },
      }
    );

    if (result.nModified === 0) {
      throw new Error("Group not found or no modifications made");
    }

    return NextResponse.json({
      message: "Updated successfully",
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      error: err.message,
    });
  }
}

export const revalidate = 0;
