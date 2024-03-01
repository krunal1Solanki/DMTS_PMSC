import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import getDataFromToken from './getDataFromToken';
import UserProjectLink from '@/models/userProjectLink';
import mongoose from 'mongoose';

const getAssignedSites = async (request: NextRequest) => {
    try {
       const user = getDataFromToken(request);
       let sites = await UserProjectLink.aggregate([
        {
          '$match': {
            'UserId': new mongoose.Types.ObjectId(user.user.id),
          }
        }, {
          '$lookup': {
            'from': 'SiteMaster', 
            'localField': 'AqualogixID', 
            'foreignField': '_id', 
            'as': 'result'
          }
        }, {
          '$unwind': {
            'path': '$result'
          }
        },
        {
            '$project' : {
                UserProjectLinkId : 1,
                'result._id' : 1,
                'result.pumpName' : 1,
                'result.latitude' : 1,
                'result.longitude' : 1,
                'result.address' : 1,
                'result.addressId' : 1,
                "result.IMEI" : 1,
                "result.isDMTSActive" : 1
            }
        }
      ])

      sites = sites.map((item : any) => {
        const site = item.result
        return  {
            projectId : item.UserProjectLinkId,
            siteId : site._id,
            pumpName : site.pumpName,
            latitude : site.latitude,
            longitude : site.longitude,
            address : site.address,
            addressId : site.addressId,
            isDMTSActive : site.isDMTSActive
        }
      })
      
      return sites;
    } catch (error: any) {
        console.log(error.message)
    }
};


export default getAssignedSites
