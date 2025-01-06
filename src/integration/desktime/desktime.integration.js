const { desktimeAPIKey, desktimeAPIUrl } = require('../../config/index.config');
const https = require('node:https');

const desktime = () => {
    const getProjects = async () => {
        const url = `${desktimeAPIUrl}projects?apiKey=${desktimeAPIKey}`;
        https.get(url, (res) => {
            res.on('data', (d) => {
                console.log(d);
            })
        }).on('error', (error) => {
            console.log(error);
        })
    }

    return {
        getProjects,

    }
}

module.exports = desktime();