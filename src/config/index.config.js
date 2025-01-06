require('dotenv').config();

const config = () => {
    const dbUrl = process.env.MONGODB_URL;
    const dbHostUrl = process.env.MONGODB_HOST_URL;
    const serverPort = process.env.SERVER_PORT;
    const desktimeAPIKey = process.env.DESKTIME_API_KEY;
    const desktimeAPIUrl = process.env.DESKTIME_API_URL;

    return {
        dbUrl,
        dbHostUrl,
        serverPort,
        desktimeAPIKey,
        desktimeAPIUrl,
    }
};

module.exports = config();