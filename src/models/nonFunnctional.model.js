const mongoose = require('mongoose');

const nonFunctionalSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        performance: {
            type: String,
            default: 'N/A'
        },
        security: {
            type: String,
            default: 'N/A'
        },
        accessibility: {
            type: String,
            default: 'N/A'
        },
    },
    {
        timestamps: true
    }
);

const NonFunctional = mongoose.model('nonFunctional', nonFunctionalSchema);

const nonFunctionalModel = () => {
    const create = async (data) => {
        const newReport = await NonFunctional.create(data); // Create the new document
        return { newReport };
    }

    const updateOne = async (filter, data, options) => {
        return await NonFunctional.updateOne(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await NonFunctional.findOne(filter, projection, options);
    }

    const getAll = async (filter, projection, options) => {
        return await NonFunctional.find(filter, projection, options);
    }

    return {
        create,
        updateOne,
        findOne,
        getAll,
    }
}

module.exports = nonFunctionalModel();