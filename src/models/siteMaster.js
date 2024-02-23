const { mongoose } = require('mongoose')
const Schema = mongoose.Schema
  
const schema = new Schema({
    //_id have reference in UserProjectLink as userId
    pumpName: {
        type: String,
        required: true
    },
    pumpType: {
        type: String,
        required: true
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // This projectID have reference of ProjectMaster table _id
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    location: {
        type: {
          type: String,
          default: "Point"
        },
        coordinates: [Number],
        //required: true
    },
    operatorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    /* operatorRefId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, */
    population: {
        type: Number,
        required: true
    },
    isGreenEnergy: {
        type: Boolean,
        required: true
    },
    noConnections: {
        type: Number,
        required: true
    },
    numberOfSourcessources: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    typePump: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
        /**
         * state:"GJ"
         * district:"AD"
         * block:"A"
         * village:"Village"
         * panchayat:"Panchayat"
         */
    },
    addressId: {
        type: Object,
        required: true
        /**
         * stateId:"GJ"
         * districtId:"AD"
         * blockId:"A"
         */
    },
    scheme: {
        type: String,
        required: true
    },
    yearCommissioning: {
        type: Number,
        required: true
    },
    noOfSolarPanels: {
        type: Number,
        required: true
    },
    locationWaterSource: {
        type: String,
        //required: true
    },
    IMEI: { 
        type: String,
        required: true
    },
    // state: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    aqualogixID: {
        type: String,
    },
    operatorName: {
        type: String,
    },
    Active: {
        type: Boolean,
        default: true
    },
    sourceType: {
        type: String,
        enum: ["SurfaceWater", "GroundWater"],
        required: true
    },
    rating: {
        type: String
    },
    IPDomain: {
        type: String
    },
    simNo: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    pump: {
        type: Object,
        //Date of Installation
        //Date of Replacement
    },
    motor: {
        type: Object,
    },
    flowMeter: {
        type: Object,
    },
    pressureMeter: {
        type: Object,
    },
    multiFunctionMeter: {
        type: Object,
    },
    pHSensor: {
        type: Object,
    },
    levelSensor: {
        type: Object,
    },
    turbidityMonitor: {
        type: Object,
    },
    chlorineSensor: {
        type: Object,
    },
    actuatorSensor: {
        type: [ {
            "id": mongoose.Schema.Types.ObjectId,
            "serialNo": String,
            "actuatorType": String,
            "installationOfDate": Date,
            "replacementOfDate": Date,
            "replacementStatus": Boolean
        }],
    },
    solor: {
        type: Object,
    },
    dieselGenerator: {
        type: Object,
    },
    updatedDate: {
        type: Date,
        default: new Date().toISOString()
    },
    isDMTSActive : {
        type : Boolean,
        default : false
    },
    createdDate: {
        type: Date,
        default: new Date().toISOString()
    }
}, {
    collection: 'SiteMaster'
})

const siteMaster = mongoose.models.siteMaster || mongoose.model("siteMaster", schema);

export default siteMaster;
