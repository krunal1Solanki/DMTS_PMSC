import projectMaster from "@/models/projectMaster.js";
import userProjectLink from "@/models/userProjectLink.js";
import siteMaster from "@/models/siteMaster.js";
import { connect } from "../../../../dbConfig/dbConfig.js";
import getDataFromToken from "../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, params: any) {
    try {
        // const info = await projectMaster.find(); 
        const info = getDataFromToken(request);
        const UserId = info.user.id;
        const linkedData = await userProjectLink.find({ UserId });
        const userProjectLinkMap: Map<string, string[]> = new Map();

        linkedData.forEach((site: any) => {
            const { UserProjectLinkId, AqualogixID } = site;
            if (userProjectLinkMap.has(UserProjectLinkId.toString())) {
                //@ts-ignore
                userProjectLinkMap.get(UserProjectLinkId.toString()).push(AqualogixID.toString());
            } else {
                userProjectLinkMap.set(UserProjectLinkId.toString(), [AqualogixID.toString()]);
            }
        });

        const projectQueries = [];

        // Iterate over the map and create project queries

        //@ts-ignore
        for (const [projectId, siteIds] of userProjectLinkMap) {
            // Query for projects
            const projectQuery = projectMaster.findById(projectId).lean().exec();
            console.log(projectQuery);
        
            // Attach a promise that includes both the project and its associated sites
            projectQueries.push(
                projectQuery.then(async (project: any) => {
                    return {
                        project,
                        sites: await siteMaster.find({ _id: { $in: siteIds } }).lean().exec(),
                    };
                })
            );
        }

        // Execute all project queries
        const projectResults = await Promise.all(projectQueries);

        // Now you have an array 'projectResults' where each element contains a project and its associated sites
        console.log("Project Results:", projectResults);


        return NextResponse.json({
            projects: projectResults
        });
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        });
    }
}
