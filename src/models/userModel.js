const  mongoose  = require('mongoose')
const Schema = mongoose.Schema
  
const schema = new Schema({
    OperatorName: {
        type: String,
        unique : true
    },
    pmscUserData : Object,
    notificationToken : String,
    isPMSCUser: Boolean,
    employeeId : {
        type: Number,
        unique: true
    },
    userType: {
        type: Number
    },
    distanceTravelled : Number,
    Designation: {
        type: String,
        default: 2, // 1 - Admin, 2 - User
    },
    assignedGroups: [{
        groupId: {
            type: String,
            required: false,
        },
        groupName: {
            type: String,
            required: false,
        },
        isPreventive: {
            type: Boolean,
            required: false,
        },
        createAt: {
            type: Date,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
    }],
    emergencyGroup : Object,
    EmploymentType: {
        type: String,
        //enum: ["Admin", "Desire", "Contractor", "Gov User", "Operator"],
        default: "Operator"
    },
    checkingStatus: {
        type: String,
        enum: ["checkedIn", "checkedOut"],
        default: "checkedOut"
    },
    IMEINumber: {
        type: String,
    },
    imeiPMSC : String,
    imeiPMSCApproved : Boolean,
    isImeiApproved: {
        type: Boolean,
    },
    //RoleID
    EmploymentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: false,
    },
    CompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        // This CompanyId have reference of CompanyMaster table _id
    },
    MobileNo: {
        type: String,
        unique: true
    },
    Password: {
        type: String,
        // required: true
    },
    PasswordExpiryOn: {
        type: Date,
        default: new Date().toISOString()
    },
    Active: {
        type: Boolean,
        default: true
    },
    DeActiveDate: {
        type: Date
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
    collection: 'UserMaster'
})

const userModel = mongoose.models.userModel || mongoose.model("userModel", schema);

export default userModel;
