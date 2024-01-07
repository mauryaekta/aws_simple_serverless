module.exports.query = async (dynamoDB, tableName, fieldName, value) => {
    const params = {
        TableName: tableName,
        FilterExpression: `#${fieldName} = :val`,
        ExpressionAttributeNames: {
            [`#${fieldName}`]: fieldName
        },
        ExpressionAttributeValues: {
            ':val': value
        }
    }
    return dynamoDB.scan(params).promise();
}

module.exports.putData = async (dynamoDB, tableName, Items) => {
    const params = {
        TableName: tableName,
        Item: Items
    }
    return dynamoDB.put(params).promise();
}

module.exports.updateData = async (dynamoDB, tableName, partitionKey, updateFields) => {
    const updateExpressionParts = []
    const ExpressionAttributeNames = {}
    const ExpressionAttributeValues = {}
    Object.keys(updateFields).forEach(key => {
        updateExpressionParts.push(`#${key} = :${key}`)
        ExpressionAttributeNames[`#${key}`] = key
        ExpressionAttributeValues[`:${key}`] = updateFields[key]
    })

    const updateExpression = `SET ${updateExpressionParts.join(',')}`
    const params = {
        TableName: tableName,
        Key: {
            id: partitionKey
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
    }

    return await dynamoDB.update(params).promise();
}

