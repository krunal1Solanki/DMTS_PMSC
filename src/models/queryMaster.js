import { any } from "zod";

const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    selectedSite: {
      type: String,
      required: true,
    },
    remarks : String,
    closingDate : Date,
    selectedUser: {
      type: String,
      required: true,
    },
    complaintNumber : String,
    complaintSource : String,
    complaintPhoneNumber : String,
    responsibleUser : Object,
    querySubject: {
      type: String,
      required: true,
    },
    queryDescription: {
      type: String,
      required: true,
    },
    selectedPriority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    siteDetails : Object,
    attachments: {
      type: String, // Assuming you store file paths or URLs
    },
    queryStatus: {
      type: String,
      enum: ['pending', 'resolved', 'hold'],
      required: true,
      default: 'pending',
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'queryModel', // Set your desired collection name
  }
);

const queryModel = mongoose.models.queryModel || mongoose.model("queryModel", schema);

export default queryModel;
