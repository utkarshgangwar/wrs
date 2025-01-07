const mongoose = require('mongoose');

const FunctionalSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        first_time_pass_rate: {
            type: String,
            default: 'N/A'
        },
        rejection_rate: {
            type: String,
            default: 'N/A'
        },
        regression_pass: {
            type: String,
            default: 'N/A'
        },
        reopen_rate_of_bugs: {
            type: String,
            default: 'N/A'
        },
        leakage: {
            type: String,
            default: 'N/A'
        },
        test_coverage: {
            type: String,
            default: 'N/A'
        },
        bugs_density: {
            type: String,
            default: 'N/A'
        },
        total: {
            type: String,
            default: 'N/A'
        },
    },
    {
        timestamps: true
    }
);

const Functional = mongoose.model('functional', FunctionalSchema);

const functionalModel = () => {
    const create = async (data) => {
        const newDoc = await Functional.create(data); // Create the new document
        return newDoc;
    }

    const updateOne = async (filter, data, options) => {
        return await Functional.updateOne(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await Functional.findOne(filter, projection, options);
    }

    const getAll = async (filter, projection, options) => {
        return await Functional.find(filter, projection, options);
    }

    return {
        create,
        updateOne,
        findOne,
        getAll,
    }
}

module.exports = functionalModel();