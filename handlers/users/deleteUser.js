const { config } = require('../../config/config')
const { dynamoDB } = require('../../config/awsService')
const { failureResponse, successResponse } = require('../../common/commonMessage')
const { query } = require('../../common/query')

module.exports.handler = async (event) => {
    const { dynamoTable: { USER_TABLE } } = config()
    const id = event.pathParameters.id;
    try {
        const user = await query(dynamoDB, USER_TABLE, 'id', id)
        if (!user.Items || !user.Items.length) return failureResponse(400, 'User not exist')
        await dynamoDB.delete({
            TableName: USER_TABLE,
            Key: {
                id: id
            }
        }).promise()
        return successResponse(200, 'User Delete SuccessFully', true)
    } catch (error) {
        return failureResponse(500, error.message)
    }
}