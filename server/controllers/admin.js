const router = require('express').Router();

// Import Helper
const Helpers=require('../helpers/helper_functions')

// Model
const User = require('../models/users');

// Verify JWT Token Middleware
const verifyJWTWithAdmin=require('../middlewares/verify_admin_and_jwt');











//------- login
router.post('/admin-login',async (req,res)=>{

    const checkUser = await Helpers.findUserByEmail(req.body.email); // Find Admin

    if (checkUser === null) // Admin not Found
    {
        res.status(200).json({ 'status': '404', 'message': "User not registered with this email" });
    }
    else // Admin not found
    {
        if (checkUser.type == 'admin')
        {
            let checkPassword=Helpers.compareEncryptedPassword(req.body.password,checkUser.password);

            if (checkPassword)
            {
                let jwtToken=Helpers.generateJwtToken(req.body.email)
                Helpers.setUserData(checkUser);
                res.status(200).json({ 'status': '200','message': 'Login Successfully', 'id': checkUser.id, 'name': checkUser.userName, 'email': checkUser.email, 'type':checkUser.type, 'roll': checkUser.roll,'token': jwtToken });
            }
            else
            {
                res.status(200).json({ 'status': '404', 'message': "Invalid Credentials" });
            }
        }
        else
        {
            res.status(200).json({ 'status': '404', 'message': "You are not seen to be Admin" });
        }
    }

})





// //------- SignUp Admin
// router.post('/admin-register',async (req,res)=>{
//
//     const checkUser = await Helpers.findUserByEmail(req.body.email);
//
//     if(checkUser)
//     {
//         res.status(200).json({ 'status': '404', 'message': "Admin already exist!" });
//     }
//     else
//     {
//         let data = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: Helpers.encryptData(req.body.password),
//             type: 'admin',
//             roll: 0,
//         });
//
//         res.status(200).json({ 'status': '200', 'message': "Signed up successfully! Please log in!" });
//     }
//
//
// })
//
//
//











//
//
//
// // Update Profile -> Profile picture
// // router.post('/admin-update-profile-picture',verifyJWT,async (req,res)=>{
// //
// //     let loginUser=Helpers.getAdminData(); // get login admin id
// //
// //     let data=await Helpers.findAdminById(loginUser.id); // get admin data
// //
// //     // console.log(data);
// //
// //     if (data.profile_pic == "" || data.profile_pic == null) // if previous file not exist
// //     {
// //     }
// //     else // if previous file exists
// //     {
// //         await Helpers.deleteAdminFile(data.profile_pic);
// //     }
// //
// //     if (req.files)
// //     {
// //         let profile_pic=Helpers.saveAdminFile(req.files.profile_pic)
// //
// //         await Admin.update(
// //             {
// //                 profile_pic: profile_pic,
// //                 profile_pic_url: process.env.LOCAL_URL+process.env.PORT+process.env.GET_ADMIN_FILES+profile_pic,
// //             },
// //             {
// //                 where:
// //                     { id: loginUser.id }
// //             });
// //
// //         let newData=await Helpers.findAdminById(loginUser.id); // get admin data
// //
// //         res.status(200).json({ 'status': '200','data': newData,'url': process.env.LOCAL_URL+process.env.PORT+process.env.GET_ADMIN_FILES+profile_pic, 'message': "Profile picture updated successfully." });
// //     }
// //     else // either one of data is null
// //     {
// //         res.status(200).json({ 'status': '200', 'message': "Data contain empty or null value" });
// //     }
// //
// // })


module.exports = router;