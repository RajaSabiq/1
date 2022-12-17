const router = require('express').Router();

// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const User = require('../models/users');

// Verify JWT Token Middleware
const verifyJWTWithAdmin = require('../middlewares/verify_admin_and_jwt');
const verifyJWTWithUser = require('../middlewares/verify_user_and_jwt');


const PORT = process.env.PORT || 4000;
const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || 'localhost';


/**
 * userName,fName,lName,password,email are mandatory
 */
//------- register
router.post('/api/v1/user-registration/:referal?', async (req, res) => {

    const checkUser = await Helpers.findUserByEmail(req.body.email);  // check if user exist

    if (checkUser) {
        res.status(409).json({ 'status': '409', 'message': "User already registered." });
    }
    else {
        let uid = Helpers.createNanoId();
        if (req.params.referal) {
            let data = await User.create({     // create user with requested data
                uid: uid,
                fName: req.body.fName,
                lName: req.body.lName,
                userName: req.body.userName,
                email: req.body.email,
                password: Helpers.encryptData(req.body.password),
                type: 'user',
                roll: 1,
                status: true,
                resetCode: '',
                emailVerified: '',
                referalLink: `${protocol}://${host}:${PORT}/user-registration/${uid}`,
                referalUserUid: '',
                commision: ''
            });
        }
        else {
            let data = await User.create({     // create user with requested data
                uid: Helpers.createNanoId(),
                fName: req.body.fName,
                lName: req.body.lName,
                userName: req.body.userName,
                email: req.body.email,
                password: Helpers.encryptData(req.body.password),
                type: 'user',
                roll: 1,
                status: true,
                resetCode: '',
                emailVerified: '',
                referalLink: `${protocol}://${host}:${PORT}/user-registration/${uid}`,
                referalUserUid: '',
                commision: ''
            });
        }
        res.status(200).json({ 'status': '200', 'message': "Registered Successfully!" });
    }
})


//------- login
router.post('/api/v1/user-login', async (req, res) => {

    const checkUser = await Helpers.findUserByEmail(req.body.email); // find user

    if (checkUser === null) // user not Found
    {
        res.status(404).json({ 'status': '404', 'message': "User not Found!" });
    }
    else // user found
    {
        if (checkUser.type == 'user') {
            let checkPassword = Helpers.compareEncryptedPassword(req.body.password, checkUser.password);

            if (checkPassword) {
                let jwtToken = Helpers.generateJwtToken(req.body.email)
                Helpers.setUserData(checkUser);
                res.status(200).json({ status: '200', message: 'Login Successfully', token: jwtToken, user: checkUser });
            }
            else {
                res.status(404).json({ 'status': '404', 'message': "Invalid Credentials" });
            }
        }
        else {
            res.status(404).json({ 'status': '404', 'message': "You are not seen to be User" });
        }
    }

})


//------- forgot password
router.post('/api/v1/user-forgot-password', async (req, res) => {

    const checkUser = await Helpers.findUserByEmail(req.body.email);  // find user

    if (checkUser) // check if user exist
    {
        const code = Math.floor(100000 + Math.random() * 900000);
        Helpers.sendForgotMail(req.body.email, code);

        await User.update(     // update reset code in db
            {
                resetCode: code
            },
            {
                where: { uid: checkUser.uid }
            });

        res.status(200).json({ 'status': '200', 'message': "Email send! Check your inbox." });
    }
    else // check if user not exist
    {
        res.status(404).json({ 'status': '404', 'message': "User not found." });
    }
})


//------- change password
router.post('/api/v1/user-change-password', async (req, res) => {

    const checkUser = await Helpers.findUserByResetCode(req.body.code);  // find user

    if (checkUser) // check if user exist
    {
        await User.update(     // update reset code in db
            {
                resetCode: '',
                password: Helpers.encryptData(req.body.password)
            },
            {
                where: { uid: checkUser.uid }
            });

        res.status(200).json({ 'status': '200', 'message': "Password changed successfully." });
    }
    else // check if user not exist
    {
        res.status(404).json({ 'status': '404', 'message': "Invalid Code." });
    }
})


//------- change password user restricted
router.post('/api/v1/user-change-password-dashboard', verifyJWTWithUser, async (req, res) => {

    const checkUser = await Helpers.findUserByUid(req.body.uid);  // find user

    if (checkUser) // check if user exist
    {
        let checkPassword = Helpers.compareEncryptedPassword(req.body.prePassword, checkUser.password);
        if (checkPassword) {
            await User.update(     // update reset code in db
                {
                    password: Helpers.encryptData(req.body.password)
                },
                {
                    where: { uid: checkUser.uid }
                });

            res.status(200).json({ 'status': '200', 'message': "Password changed successfully." });
        }
        else {
            res.status(404).json({ 'status': '404', 'message': "Invalid Password" });
        }
    }
    else // check if user not exist
    {
        res.status(404).json({ 'status': '404', 'message': "User not found." });
    }
})


//------- delete
router.post('/api/v1/user-delete', verifyJWTWithAdmin, async (req, res) => {

    const checkUser = await Helpers.findUserByUid(req.body.uid);

    if (checkUser) {
        Helpers.deleteProfileImage(checkUser.profileName);
        await User.destroy({ where: { uid: req.body.uid } });

        res.status(200).json({ 'status': '200', 'message': "User deleted successfully" });

    }
    else {
        res.status(404).json({ 'status': '404', 'message': "User not found" });
    }
})

//------- All Users
router.get('/api/v1/get-all-users', async (req, res) => {

    let data = await User.findAll({ where: { type: 'user' } });

    res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });

})


//------- User by ID
router.post('/api/v1/user-by-uid', async (req, res) => {

    let data = await User.findOne({ where: { uid: req.body.uid } });

    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(404).json({ 'status': '400', 'message': "No Data Found" });
    }
})

//------- update profile picture
router.post('/api/v1/user-update-profile-picture', verifyJWTWithUser, async (req, res) => {

    let checkUser = await Helpers.findUserByUid(req.body.uid);  // check if user exist

    if (checkUser) {
        Helpers.deleteProfileImage(checkUser.profileName);

        let fileName = Helpers.saveProfileImage(req.files.profile); // save profile image
        await User.update(     // update reset code in db
            {
                profileName: fileName,
                profileUrl: `${protocol}://${host}:${PORT}/profiles/${fileName}`
            },
            {
                where: { uid: checkUser.uid }
            });
        checkUser = await Helpers.findUserByUid(req.body.uid);
        res.status(200).json({ 'status': '200', 'message': "Profile Picture Updated.", user: checkUser });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No data found" });
    }
})

//------- update profile
router.post('/api/v1/user-update-profile-dashboard', verifyJWTWithUser, async (req, res) => {

    let checkUser = await Helpers.findUserByUid(req.body.uid);  // check if user exist

    if (checkUser) {
        await User.update(     // update reset code in db
            {
                fName: req.body.fName,
                lName: req.body.lName,
                userName: req.body.userName
            },
            {
                where: { uid: checkUser.uid }
            });
        checkUser = await Helpers.findUserByUid(req.body.uid);
        res.status(200).json({ 'status': '200', 'message': "Profile Updated.", user: checkUser });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No data found" });
    }
})

module.exports = router;