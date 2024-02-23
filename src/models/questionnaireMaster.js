const { mongoose } = require('mongoose')
const Schema = mongoose.Schema
//const ED = rootRequire('utils/encry_decry')
const schema = new Schema({
    type : {
        type : String,
        enum : ['question', 'answer'],
        default : 'question'
    },
    userId : mongoose.Types.ObjectId,
    userName : String,
    isApproved : Boolean,
    formType: {
        type: String,
         required: true,
    },
    creationDate: {
        type: Date,
        default: new Date().toISOString(),
    },
    questionnaireName : {
        type : String,
    },
    // Fields for questionModel
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            answerType: {
                type: String,
                enum: ['rating', 'yesno', 'text'],
                required: true,
            },
            answer : String
        }
    ],
    // Fields for imageModel
    images: [
        {
            imageName: {
                type: String,
                required: true,
            },
            latitude : String,
            longitude : String,
            answer : String
        }
    ],
}, {
    collection: 'questionnaireModel',
});

const questionnaireModel = mongoose.models.questionnaireModel || mongoose.model("questionnaireModel", schema);

export default questionnaireModel;
