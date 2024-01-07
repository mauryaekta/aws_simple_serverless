require('dotenv').config()

exports.config = () => ({
    dynamoTable: {
        USER_TABLE: 'userTable'
    }
})