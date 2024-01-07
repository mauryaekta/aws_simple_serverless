const { putData, query } = require('../../common/query');
const { v4: uuidv4 } = require('uuid')
const { dynamoDB } = require('../../config/awsService')
const { config } = require('../../config/config')
const { successResponse, failureResponse } = require('../../common/commonMessage')
const { hashPassword } = require('../../common/helper')

module.exports.handler = async (event) => {
    const reqBody = JSON.parse(event.body)
    console.log("......", reqBody)
    const { dynamoTable: { USER_TABLE } } = config()
    console.log('..........: ', USER_TABLE);
    try {
        const isUserExist = await query(dynamoDB, USER_TABLE, 'email', reqBody.email)
        if (isUserExist.Items && isUserExist.Items.length) return failureResponse(400, 'User already exist')
        const id = uuidv4()
        const hashedPassword = await hashPassword(reqBody.password)
        const items = { id, ...reqBody, password: hashedPassword }
        await putData(dynamoDB, USER_TABLE, items)
        return successResponse(201, 'User created successfully', true)
    } catch (error) {
        console.log('Create user failed:', error.message);
        return failureResponse(500, error.message)
    }
}