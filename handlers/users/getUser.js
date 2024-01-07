const { config } = require('../../config/config')
const { dynamoDB } = require('../../config/awsService')
const { failureResponse, successResponse } = require('../../common/commonMessage')

module.exports.handler = async (event) => {
    const { dynamoTable: { USER_TABLE } } = config()
    try {
        const user = await dynamoDB.scan({ TableName: USER_TABLE }).promise()
        if (!user.Items || !user.Items.length) return failureResponse(404, 'User not found')
        return successResponse(200, 'User Get SuccessFully', user.Items)
    } catch (error) {
        return failureResponse(500, error.message)
    }
}