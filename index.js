const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/mongo.database');
const { serverPort } = require('./src/config/index.config');
const routes = require('./src/routes/index.routes');
const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use('/v1/', routes); // Mount all routes under /v1

app.listen(serverPort, () => {
    connectDB();
    console.log(`Server is running on port ${serverPort}`);
});