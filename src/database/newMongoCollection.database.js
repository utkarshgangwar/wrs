const { dbHostUrl } = require('../config/index.config');
const mongoose = require('mongoose');

const newMongoCollection = async (project_Id) => {
    const dbName = `${project_Id}`; // Use a unique identifier
    const dbConnectionUrl = `${dbHostUrl}/${dbName}`;

    const newDbConnection = mongoose.createConnection(dbConnectionUrl);

    newDbConnection.on('connected', () => {
        console.log(`Database connected and created: ${dbName}`);
    });

    newDbConnection.on('error', (error) => {
        console.error(`Database connection error for ${dbName}:`, error.message);
    });

    try {
        // Define a dummy schema and model
        const dummySchema = new mongoose.Schema({
            dummyField: { type: String, required: true },
        });
        const DummyModel = newDbConnection.model('dummyCollection', dummySchema);

        // Insert a dummy document
        await DummyModel.create({ dummyField: 'Initial document' });

        console.log(`Dummy collection and document created in database: ${dbName}`);
    } catch (error) {
        console.error(`Error creating dummy collection in database ${dbName}:`, error.message);
    }

    // Store the connection in a global object
    global.projectConnections = global.projectConnections || {};
    global.projectConnections[dbName] = newDbConnection;

    console.log(`global ---- : ${global.projectConnections}`);
};

module.exports = newMongoCollection;
