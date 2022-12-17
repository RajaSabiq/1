const {DataTypes} = require('sequelize');

// DB Connection
const sequelize = require('../connection/db_connection');

// Talent Files Schema
const TalentFiles = sequelize.define('talent_files', {
        iid: {
            type: DataTypes.STRING,
            // defaultValue: null,
            primaryKey:true
        },
        uid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        aid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: null
        }
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


module.exports = TalentFiles;