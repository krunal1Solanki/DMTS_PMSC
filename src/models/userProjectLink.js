const { mongoose } = require('mongoose')
const Schema = mongoose.Schema
const connection = require('../dbConfig/dbConfig')
//const ED = rootRequire('utils/encry_decry')
  
const schema = new Schema({
    UserProjectLinkId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // This userProjectLinkId have reference of ProjectMasrer table _id
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // This userId have reference of UserMaster table _id
    },
    AqualogixID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // This aquaLogixID have reference of SiteMaster table _id
    },
    updated_at: {
        type: Date,
        default: new Date().toISOString()
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    }
}, {
    collection: 'UserProjectLink'
})

schema.pre('save', function (next) { // arrow function won't work
    var userProjectLink = this
    userProjectLink.created_at = userProjectLink.updated_at = new Date().toISOString();
    next()
})

schema.pre('update', function (next) {
    this.update({}, {
        $set: {
            updated_at: new Date().toISOString()
        }
    })
    next()
})

const UserProjectLink = mongoose.models.UserProjectLink || mongoose.model("UserProjectLink", schema);

export default UserProjectLink;
