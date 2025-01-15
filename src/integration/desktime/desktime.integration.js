const { desktimeAPIKey, desktimeAPIUrl } = require('../../config/index.config');
const https = require('node:https');

const desktime = () => {
  const getProjects = async () => {
    const url = `${desktimeAPIUrl}projects?apiKey=${desktimeAPIKey}`;

    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = '';

          // Collect chunks of data
          res.on('data', (chunk) => {
            data += chunk;
          });

          // When the entire response has been received
          res.on('end', () => {
            try {
              // Attempt to parse the response as JSON
              const parsedData = JSON.parse(data);
              resolve(parsedData);
            } catch (error) {
              // Parsing error
              reject(new Error(`Error parsing JSON: ${error.message}`));
            }
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };

  const getEmployeeWorkingHoursByProject = async (userId, date) => {
    const url = `${desktimeAPIUrl}employee/projects?apiKey=${desktimeAPIKey}&id=${userId}&date=${date}`;
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        })
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          }
          catch (error) {
            reject(new Error(`Error parsing JSON: ${error.message}`));
          }
        });
      })
        .on('error', (error) => {
          reject(error);
        });
    });
  };

  const getEmployees = () => {
    const url = `${desktimeAPIUrl}employees?apiKey=${desktimeAPIKey}`;

    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunks) => {
          data += chunks;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(new Error(`Error parsing JSON: ${error.message}`));
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }

  return {
    getProjects,
    getEmployeeWorkingHoursByProject,
    getEmployees,
  };
};

module.exports = desktime();
