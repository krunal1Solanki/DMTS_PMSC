const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;  // Import ObjectId type

const schema = new Schema(
  {
    title : String,
    body : String,
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
    collection: 'notificationModel', // Set your desired collection name
  }
);

const notificationModel = mongoose.models.notificationModel || mongoose.model("notificationModel", schema);

export default notificationModel;
