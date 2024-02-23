import { type } from "os";

const { mongoose } = require('mongoose')
const Schema = mongoose.Schema
//const ED = rootRequire('utils/encry_decry')
  
const schema = new Schema({
    groupName : {
        type : String, 
        required : true
    },
    sites: {
        type : Array
    },
    creationDate: {
        type: Date,
        default: Date.now // Use a function to get the current date and time
    },
    isEmergency : {
        type : Boolean,
        default : false
    },
    isPreventive : {
        type : Boolean,
        default : false    
    }
}, {
    collection: 'siteGroupModel'
})

schema.pre('save', function (next) {
    if (!this.creationDate) {
        this.creationDate = new Date();
    }
    next();
});

const siteGroupModel = mongoose.models.siteGroupModel || mongoose.model("siteGroupModel", schema);

export default siteGroupModel;
