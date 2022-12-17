const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var fs = require('fs');
const uniqid = require('uniqid');

let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');

// User Model
const User = require('../models/users');
const Category = require('../models/category');
const Asset = require('../models/assets');


// Global Variables
let user = null;

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
    }
}));

// create nanoid
module.exports.createNanoId = function () {
    let id = uniqid();
    console.log(id);
    return id;
}

// Encrypt Data
module.exports.encryptData = function (data) {
    return bcrypt.hashSync(data, 5);
}

// Compare encrypt password
module.exports.compareEncryptedPassword = function (orignalPassword, hashPassword) {
    return bcrypt.compareSync(orignalPassword, hashPassword)
}

// Generate JWT token
module.exports.generateJwtToken = function (data) {
    return jwt.sign({ email: data }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

// Find User by email
module.exports.findUserByEmail = async function (email) {
    return await User.findOne({ where: { email: email } })
}


// Find User by phone
module.exports.findUserByPhone = async function (phone) {
    return await User.findOne({ where: { phone: phone } })
}

// Find User by reset code
module.exports.findUserByResetCode = async function (code) {
    return await User.findOne({ where: { resetCode: code } })
}

// Find User by id
module.exports.findUserById = async function (id) {
    return await User.findOne({ where: { id: id } })
}

// Find User by uid
module.exports.findUserByUid = async function (uid) {
    return await User.findOne({ where: { uid: uid } })
}

// Find category by cid
module.exports.findCategoryByCid = async function (cid) {
    return await Category.findOne({ where: { cid: cid } })
}

// Find asset by aid
module.exports.findAssetByAid = async function (aid) {
    return await Asset.findOne({ where: { aid: aid } })
}

// set login data
module.exports.setUserData = function (data) {
    user = data;
    return;
}

// get login data
module.exports.getUserData = function () {
    return user;
}

// // Find extra feature by id
// module.exports.findExtraFeatureById=async function (id) {
//     return await Extra.findOne({where: {id: id}})
// }

// set admin data
module.exports.setUserData = function (data) {
    user = data;
    return;
}

// get admin data
module.exports.getUserData = function () {
    return user;
}

// save profile images
module.exports.saveProfileImage = function (_file) {
    let file = _file;
    let fileName = Math.floor(100000000000000000 + Math.random() * 999999999999999999) + file.name;

    file.mv('./public/profiles/' + fileName, (err) => {
        if (err) {
            console.log(err)
        }
    })

    return fileName;
}


// save thumbnail
module.exports.saveThumbnail = function (_file) {
    let file = _file;
    let fileName = Math.floor(100000000000000000 + Math.random() * 999999999999999999) + file.name;

    file.mv('./public/thumbnail/' + fileName, (err) => {
        if (err) {
            console.log(err)
        }
    })

    return fileName;
}


// save asset
module.exports.saveAsset = function (_file) {
    let file = _file;
    let fileName = Math.floor(100000000000000000 + Math.random() * 999999999999999999) + file.name;

    file.mv('./public/assets/' + fileName, (err) => {
        if (err) {
            console.log(err)
        }
    })

    return fileName;
}


// save asset
module.exports.saveTalentImages = function (_file) {
    let file = _file;
    let fileName = Math.floor(100000000000000000 + Math.random() * 999999999999999999) + file.name;

    file.mv('./public/assets/' + fileName, (err) => {
        if (err) {
            console.log(err)
        }
    })

    return fileName;
}


// delete property
module.exports.deleteProfileImage = async function (fileName) {
    await fs.unlink('./public/profiles/' + fileName, function (err) {
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}


// delete thumbnail
module.exports.deleteThumbnail = async function (fileName) {
    await fs.unlink('./public/thumbnail/' + fileName, function (err) {
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}


// delete asset
module.exports.deleteAsset = async function (fileName) {
    await fs.unlink('./public/assets/' + fileName, function (err) {
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}


// delete talent files
module.exports.deleteTalentFiles = async function (fileName) {
    await fs.unlink('./public/assets/' + fileName, function (err) {
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}


// send html email
module.exports.sendForgotMail = function (email_to, code) {

    let mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email_to,
        subject: 'SpiceArt Forgot Password',
        html: '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '    <title>Reset Password</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<p>Hi! you have requested to change password and your password reset code is <b>' + code + '</b></p>\n' +
            '<p>If you not create this request than change your password immediately and report as soon as possible</p>\n' +
            '</body>\n' +
            '</html>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        // else
        //     {
        //     console.log('Email sent: ' + info.response);
        //     return 1;
        // }
    });
}





