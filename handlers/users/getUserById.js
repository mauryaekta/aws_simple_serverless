const { config } = require('../../config/config')
const { dynamoDB } = require('../../config/awsService')
const { failureResponse, successResponse } = require('../../common/commonMessage')
const { query } = require('../../common/query')

module.exports.handler = async (event) => {
    const { dynamoTable: { USER_TABLE } } = config()
    const id = event.pathParameters.id;
    try {
        const user = await query(dynamoDB, USER_TABLE, 'id', id)
        if (!user || !user.Items || user.Items.length === 0) return failureResponse(404, 'User not found')
        return successResponse(200, 'User found', user.Items)
    } catch (error) {
        return failureResponse(500, error.message)
    }
}