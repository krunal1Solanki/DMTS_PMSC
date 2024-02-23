const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const officeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,  // Assuming latitude is a numeric value
        required: true,
    },
    longitude: {
        type: Number,  // Assuming longitude is a numeric value
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,  // Assuming pincode is a string
        required: true,
    },
    inChargeName: {
        type: String,
        required: true,
    },
    inChargeMobile: {
        type: String,  // Assuming inChargeMobile is a string
        required: true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, {
    collection: 'officeModel', 
});

const officeModel = mongoose.models.officeModel || mongoose.model("officeModel", officeSchema);

export default officeModel;
