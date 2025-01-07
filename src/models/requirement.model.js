const mongoose = require('mongoose');

const RequirementSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        scope_definition_signoff: {
            type: String,
            enum: ['rag', 'red', 'amber', 'green'],
            default: 'rag'
        },
        epics_user_stories_signoff: {
            type: String,
            enum: ['rag', 'red', 'amber', 'green'],
            default: 'rag'
        },
        wireframes_ui_ux_signoff: {
            type: String,
            enum: ['rag', 'red', 'amber', 'green'],
            default: 'rag'
        },
    },
    {
        timestamps: true
    }
);

const Requirement = mongoose.model('requirement', RequirementSchema);

const requirementModel = () => {
    const create = async (data) => {
        const newDoc = await Requirement.create(data);
        return newDoc;
    }

    const updateOne = async (filter, data, options) => {
        return await Requirement.updateOne(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await Requirement.findOne(filter, projection, options);
    }

    const getAll = async (filter, projection, options) => {
        return await Requirement.find(filter, projection, options);
    }

    return {
        create,
        updateOne,
        findOne,
        getAll,
    }
}

module.exports = requirementModel();