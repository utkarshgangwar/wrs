const mongoose = require('mongoose');

const TechicalHealthSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        code_vital_stats: {
            type: String,
            default: 'N/A'
        },
        code_review: {
            type: String,
            default: 'N/A'
        },
        technical_debt: {
            type: String,
            default: 'N/A'
        },
    },
    {
        timestamps: true
    }
);

const TechicalHealth = mongoose.model('technical_health', TechicalHealthSchema);

const technicalHealthModel = () => {
    const create = async (data) => {
        const newDoc = await TechicalHealth.create(data);
        return newDoc;
    }

    const updateOne = async (filter, data, options) => {
        return await TechicalHealth.updateOne(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await TechicalHealth.findOne(filter, projection, options);
    }

    const getAll = async (filter, projection, options) => {
        return await TechicalHealth.find(filter, projection, options);
    }

    return {
        create,
        updateOne,
        findOne,
        getAll,
    }
}

module.exports = technicalHealthModel();