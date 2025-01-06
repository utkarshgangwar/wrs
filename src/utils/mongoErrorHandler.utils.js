const handleMongoError = (error) => {
    const response = {
        statusCode: 500,
        message: "Database Error, Try again.",
        details: error?.message || error?.msg,
    };

    if (error.code === 11000) { // MongoDB duplicate key error
        const duplicateField = Object.keys(error.keyValue)[0];
        const duplicateValue = error.keyValue[duplicateField];

        response.statusCode = 409; // Conflict HTTP status code
        response.message = "Validation Error";
        response.details = `The ${duplicateField} '${duplicateValue}' is already in use. Please choose a different value.`;
    }

    // Add more MongoDB-specific error handling if needed
    return response;
};

module.exports = handleMongoError;