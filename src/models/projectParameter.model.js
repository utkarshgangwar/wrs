const mongoose = require('mongoose');

const projectParameterSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        sub: {
            type: [String],
        },
        // status: {
        //     type: String,
        //     enum: ['none', 'red', 'amber', 'green'],
        //     default: 'none'
        // }
    },
    {
        timestamps: true
    }
);

const ProjectParameter = mongoose.model('ProjectParameter', projectParameterSchema);

const projectParameterModel = () => {
    const createProjectParameter = async (data) => {
        const newProjectParameter = await ProjectParameter.create(data); // Create the new document
        const count = await ProjectParameter.countDocuments(); // Get the count of documents
        return { newProjectParameter, count }; // Return both
    }

    return {
        createProjectParameter,
    }
}

module.exports = projectParameterModel();