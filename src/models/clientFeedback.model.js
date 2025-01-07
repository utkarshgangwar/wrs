const mongoose = require('mongoose');

const ClientFeedbackSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        last: {
            type: [String],
        },
        reward_recognition: {
            type: [String],
        },
        appreciation: {
            type: [String],
        },
    },
    {
        timestamps: true
    }
);

const ClientFeedback = mongoose.model('client_feedback', ClientFeedbackSchema);

const clientFeedbackModel = () => {
    const create = async (data) => {
        const newDoc = await ClientFeedback.create(data);
        return newDoc;
    }

    const updateOne = async (filter, data, options) => {
        return await ClientFeedback.updateOne(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await ClientFeedback.findOne(filter, projection, options);
    }

    const getAll = async (filter, projection, options) => {
        return await ClientFeedback.find(filter, projection, options);
    }

    return {
        create,
        updateOne,
        findOne,
        getAll,
    }
}

module.exports = clientFeedbackModel();