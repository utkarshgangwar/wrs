const mongoose = require('mongoose');

const CommercialHealthSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
        },
        all_invoices_raised: {
            type: String,
            enum: ['rag', 'red', 'amber', 'green'],
            default: 'rag'
        },
        all_invoices_paid: {
            type: String,
            enum: ['rag', 'red', 'amber', 'green'],
            default: 'rag'
        },
        original_vs_actual_effort: {
            type: String,
            enum: ['rag', 'red', 'amber', 'green'],
            default: 'rag'
        },
        sow: { // original effort hours
            type: Number,
            required: true,
        },
        timesheet: {
            type: Number,
            required: true,
        },
        shadow: {
            type: Number,
            required: true
        },
        actual_sow: {
            type: Number,
            required: true
        },
        percentage_sow: {
            type: Number,
            required: true
        },
        burn_rate: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const TechicalHealth = mongoose.model('commerial_health', CommercialHealthSchema);

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