const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    desktime_user_id: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('employee', employeeSchema);

const employeeModel = () => {
    const create = async (data) => {
        return await Employee.create();
    }

    const insertMany = async (data) => {
        return await Employee.insertMany([data]);
    }

    const updateOneUser = async (filter, data, options) => {
        return await Employee.updateOne(filter, data, options);
    }

    const findAndUpdate = async (filter, data, options) => {
        return await Employee.findOneAndUpdate(filter, data, options);
    }

    const getUserById = async (filter, projection, options) => {
        return await Employee.findOne(filter, projection, options)
    }

    return {
        create,
        insertMany,
        updateOneUser,
        findAndUpdate,
        getUserById
    }
}

module.exports = employeeModel();