const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            enum: ["none", "work", "schedule", "resource"],
            default: "work"
        },
        probability: {
            type: String,
            enum: ["none", "low", "medium", "high"],
            default: "low"
        },
        impact: {
            type: String,
            enum: ["none", "low", "medium", "high"],
            default: "low"
        },
        owner: {
            type: String,
            trim: true,
        },
        mitigation_plan: {
            type: String,
            trim: true,
        },
        contingency_plan: {
            type: String,
            trim: true
        },
        expected_resolution: {
            type: Date,
        },
        // week: {
        //     type: Number,
        //     min: 1,
        //     required: true,
        //     immutable: true,
        // }
    },
    {
        timestamps: true
    }
);

const Report = mongoose.model('Report', reportSchema);

const projectParameterModel = () => {
    const create = async (data) => {
        const newReport = await Report.create(data); // Create the new document
        return newReport;
    }

    const updateOne = async (filter, data, options) => {
        return await Report.updateOne(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await Report.findOne(filter, projection, options);
    }

    const getAll = async (filter, projection, options) => {
        return await Report.find(filter, projection, options);
    }

    return {
        create,
        updateOne,
        findOne,
        getAll,
    }
}

module.exports = projectParameterModel();