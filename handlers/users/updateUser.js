const { query, updateData } = require('../../common/query');
const { dynamoDB } = require('../../config/awsService')
const { config } = require('../../config/config')
const { successResponse, failureResponse } = require('../../common/commonMessage')

module.exports.handler = async (event) => {
    const reqBody = JSON.parse(event.body)
    const { dynamoTable: { USER_TABLE } } = config()
    const partitionKey = event.pathParameters.id;
    try {
        const user = await query(dynamoDB, USER_TABLE, 'id', partitionKey)
        if (!user.Items || !user.Items.length) return failureResponse(400, 'User not exist')
        await updateData(dynamoDB, USER_TABLE, partitionKey, reqBody)
        return successResponse(200, 'User Updated successfully', true)
    } catch (error) {
        console.log('Updated user failed:', error.message);
        return failureResponse(500, error.message)
    }
}