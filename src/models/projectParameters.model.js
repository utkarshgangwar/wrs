const mongoose = require('mongoose');

const projectParameterSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: true,
    },
    risk: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green'],
        default: 'rag'
    },
    commercial: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green'],
        default: 'rag'
    },
    requirement: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green'],
        default: 'rag'
    },
    technical_health: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green'],
        default: 'rag'
    },
    functional: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green']
    },
    non_functional: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green'],
        default: 'rag'
    },
    schedule: {
        type: String,
        enum: ['rag', 'red', 'amber', 'green'],
        default: 'rag'
    },
    week: {
        type: Number,
        required: true,
        min: 1,
    }
},
    {
        timestamps: true
    }
);


const ProjectParameter = mongoose.model('ProjectParameter', projectParameterSchema);

const projectParameterModel = () => {
    const create = async (data) => {
        const newDoc = await ProjectParameter.create(data); // Create the new document
        return newDoc;
    }

    const findOne = async (filter, projection, options) => {
        const data = await ProjectParameter.findOne(filter, projection, options);
        return data;
    }

    return {
        create,
        findOne
    }
}

module.exports = projectParameterModel();
