import {connect} from "../../../../dbConfig/dbConfig.js"
import {NextRequest, NextResponse} from "next/server"
import siteGroupModel from '../../../../models/siteGroupMode.js'

connect()

;
export async function POST (request : NextRequest) {
    try {
        const body = await request.json();
        const {groupName, sites} = body;
        console.log("THIS IS MY BODY", body)
    

        const existingGroup = await siteGroupModel.findOne({groupName});
        console.log(existingGroup)
        if(existingGroup) {
            throw new Error('Group Exists!')
        }
        console.log(typeof sites[0].siteId)
        const group = await siteGroupModel.create({
            groupName,
            sites,
            creationDate: new Date(Date.now())
        })

        return NextResponse.json({
          message: "Group has beed created successfully!"
        });
    } catch (err : any) {
        console.log("E NDD")
        console.log(err)
        return NextResponse.json({
            message : err.message
        })
    }
}
export const revalidate = 0;