const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    managers: {
        type: [String],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    closeDate: {
        type: Date,
        required: true
    },
    currentSprint: {
        type: Number,
        min: 1,
        default: 1
    },
    totalSprints: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    executiveSummary: {
        type: [String],
    },
    desktime: {
        type: Object,
    }
},
    {
        timestamps: true
    }
);


const Project = mongoose.model('Project', projectSchema);

const projectModel = () => {
    const createProject = async (data) => {
        const newProject = await Project.create(data); // Create the new document
        const count = await Project.countDocuments(); // Get the count of documents
        return { newProject, count }; // Return both
    }

    return {
        createProject,
    }
}

module.exports = projectModel();
