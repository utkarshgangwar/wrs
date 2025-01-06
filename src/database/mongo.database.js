const mongoose = require('mongoose');
const { dbUrl } = require('../config/index.config');

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("DB connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};


module.exports = connectDB;