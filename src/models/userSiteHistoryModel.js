import { type } from "os";

const { mongoose, mongo } = require('mongoose')
const Schema = mongoose.Schema
  
const schema = new Schema({
    groupName : {
        type : String, 
        required : true
    },
    groupId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    userName : {
        type : String
    },
    status: {
        type: String,
        enum: ['completed', 'pending'],
        required: true,
        default : 'pending'
    },
    creationDate: {
        type: Date,
        default: Date.now // Use a function to get the current date and time
    }
}, {
    collection: 'userSiteHistoryModel'
})

schema.pre('save', function (next) {
    if (!this.creationDate) {
        this.creationDate = new Date();
    }
    next();
});

const userSiteHistoryModel = mongoose.models.userSiteHistoryModel || mongoose.model("userSiteHistoryModel", schema);

export default userSiteHistoryModel;
