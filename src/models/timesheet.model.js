const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const timesheetSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        employeeId: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        date: {
            type: String,
            required: true
        },
        seconds: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Timesheet = mongoose.model('timesheet', timesheetSchema);

const timesheetModel = () => {
    const create = async (data) => {
        return await Timesheet.create(data);
    }

    const findAndUpdate = async (filter, data, options) => {
        return await Timesheet.findOneAndUpdate(filter, data, options);
    }

    const findOne = async (filter, projection, options) => {
        return await Timesheet.findOne(filter, projection, options);
    }

    const aggByProjectId = async (projectId) => {
        const aggArr = [
            {
                $match: {
                    projectId: new ObjectId(projectId),
                }
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employeeData"
                }
            },
            {
                $unwind: {
                    path: "$employeeData",
                    // includeArrayIndex: "index",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $group: {
                    _id: "$date",
                    empDoc: {
                        $push: {
                            k: "$employeeData.name",
                            v: { $divide: ["$seconds", 3600] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    empDoc: { $arrayToObject: "$empDoc" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            { date: "$_id" },
                            "$empDoc"
                        ]
                    }
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ];

        const result = await Timesheet.aggregate(aggArr);
        return result;
    }

    return {
        create,
        findAndUpdate,
        findOne,
        aggByProjectId
    }
}

module.exports = timesheetModel();