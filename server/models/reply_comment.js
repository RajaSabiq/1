const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// Category Schema
const ReplyComment = sequelize.define('reply_comments', {
        rkid: {
            type: DataTypes.STRING,
            // defaultValue: null,
            primaryKey:true
        },
        kid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        uid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        aid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        message: {
            type: DataTypes.STRING,
            defaultValue: null
        },
    },
// Other Settings
    {
        //  Change Table Name
        //  tableName: 'userData',
        // Disable TimeStamps
        // timestamps: false,

        // Disable Single Timestamps
        // updatedAt: false,
        // createdAt: false,

        // Change Name of Entity
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',

        // Change Engine
        // engine: 'MYISAM'
    });


module.exports = ReplyComment;