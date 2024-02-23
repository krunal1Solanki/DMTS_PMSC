const { mongoose } = require('mongoose')
const Schema = mongoose.Schema
//const ED = rootRequire('utils/encry_decry')
  
const schema = new Schema({
    // ProjectId: {
    //     type: Number,
    //     required: true
    // },
    //_id have reference in SiteMaster as projectID
    ProjectName: {
        type: String,
        required: true
    },
    dmtsOption: {
        type: Boolean,
        default: true
    },
    StateName: {
        type: String,
        required: true
    },    
    Active: {
        type: Boolean,
        default: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        // This CompanyId have reference of CompanyMaster table _id
    },
    parameters: {
        type: [
            {
                title: String,
                isActive: Boolean,
                parameter: String,
                logo: String,
                measurement: String,
                formula: String,
                min: String,  
                max: String,            
            }
        ],
        required: true
    },
    feedbacks: {
        type: [
            {
                title: String,
                isActive: Boolean,
                parameter: String,
                logo: String,
                measurement: String,
                formula: String                        
            }
        ],
        required: true
    },
    graphs: {
        type: [
            {
                title: String,
                isActive: Boolean,
                parameter: String,
                logo: String,
                measurement: String,
                formula: String                        
            }
        ],
        required: true
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
    collection: 'ProjectMaster'
})

const projectMaster = mongoose.models.ProjectMaster || mongoose.model("ProjectMaster", schema);

export default projectMaster;
