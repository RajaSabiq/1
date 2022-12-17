const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// Category Schema
const Asset = sequelize.define('assets', {
        aid: {
            type: DataTypes.STRING,
            // defaultValue: null,
            primaryKey:true
        },
        uid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        title: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        thumbnail: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        thumbnailUrl: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        categoryUid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        categoryName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        region: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        asset: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        assetUrl: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        filetype: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        price: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        likeCount: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        watchCount: {
            type: DataTypes.STRING,
            defaultValue: 0
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


module.exports = Asset;