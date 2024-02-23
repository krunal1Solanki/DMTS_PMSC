const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;  // Import ObjectId type

const schema = new Schema(
  {
    checkingStatus: {
      type: String,
      enum: ["checkedIn", "checkedOut"],
      required: true
    },
    longitude: Number,
    latitude: Number,
    userId: {
      type: ObjectId,  // Corrected declaration for ObjectId
      required: true
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'checkingStatusModel', // Set your desired collection name
  }
);

const checkingStatusModel = mongoose.models.checkingStatusModel || mongoose.model("checkingStatusModel", schema);

export default checkingStatusModel;
