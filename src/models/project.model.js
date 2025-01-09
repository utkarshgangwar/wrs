const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    desktime_project_id: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
    },
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
        type: Number,
        required: true
    },
    closeDate: {
        type: Date,
        // required: true
    },
    currentSprint: {
        type: Number,
        min: 1,
        default: 1
    },
    totalSprints: {
        type: Number,
        // required: true,
        min: 1,
        default: 1
    },
    executiveSummary: {
        type: [String],
    },
    desktimeInfo: {
        type: Object,
    },
    archived: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true
    }
);

projectSchema.index({ archived: 1, desktime_project_id: 1 });
const Project = mongoose.model('Project', projectSchema);

const projectModel = () => {
    const createProject = async (data) => {
        const newProject = await Project.create(data); // Create the new document
        // const count = await Project.countDocuments(); // Get the count of documents
        // return { newProject, count }; // Return both
        return newProject;
    }

    const findAndUpdate = async (filter, data, options) => {
        const doc = await Project.findOneAndUpdate(filter, data, options);
        return doc;
    }

    const find = async (filter, projection, options) => {
        return await Project.find(filter, projection, options);
    }

    return {
        createProject,
        findAndUpdate,
        find,
    }
}

module.exports = projectModel();
