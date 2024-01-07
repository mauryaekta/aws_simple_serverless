const { commonHeaders } = require('./commonHeader')

module.exports.successResponse = (statusCode, message, data) => {
    return {
        statusCode: statusCode,
        headers: commonHeaders(),
        body: JSON.stringify({
            message: message,
            data: data
        })
    }
}

module.exports.failureResponse = (statusCode, message) => {
    return {
        statusCode,
        headers: commonHeaders(),
        body: JSON.stringify({ error: message, statusCode: statusCode }),
    };
}