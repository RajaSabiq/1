const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// User Schema
const User = sequelize.define('users', {
        uid: {
            type: DataTypes.STRING,
            // defaultValue: null,
            primaryKey:true
        },
        fName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        lName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        userName: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        email: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        password: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        type: {
            type: DataTypes.STRING,
            defaultValue:null
        },
        roll: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        resetCode: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        emailVerified: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        profileName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        profileUrl: {
            type: DataTypes.TEXT,
            defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZF0vZRu0hWNVNvT1189lraUnqcba6Eu1Nw&usqp=CAU"
        },
        referalUserUid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        commision: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        referalLink: {
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


module.exports = User;