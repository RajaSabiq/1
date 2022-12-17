const router = require('express').Router();

// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const ReplyComment = require('../models/reply_comment');
const User = require('../models/users');

// User.hasMany(ReplyComment, {foreignKey: 'uid'})
// ReplyComment.belongsTo(User, {foreignKey: 'uid'})


// Verify JWT Token Middleware
const verifyJWTWithUser = require('../middlewares/verify_user_and_jwt');
const verifyJWTWithAdmin = require('../middlewares/verify_admin_and_jwt');


//------- Add reply Comment
router.post('/api/v1/add-reply-comment', verifyJWTWithUser, async (req, res) => {

    let data = await ReplyComment.create({
        rkid: Helpers.createNanoId(),
        kid: req.body.kid,
        aid: req.body.aid,
        uid: req.body.uid,
        message: req.body.message,
    });
    res.status(200).json({ 'status': '200', 'message': "Comment Added!" });
})


//------- reply comment by rkid
router.post('/api/v1/reply-comment-by-kid', async (req, res) => {

    let data = await ReplyComment.findAll({ where: { kid: req.body.kid } });
    let count = await ReplyComment.count({ where: { kid: req.body.kid } });

    res.status(200).json({ 'status': '200', 'data': data, 'count': count, 'message': "Data fetched successfully" });

})

//------- Update Comment
// router.post('/api/v1/edit-comment-by-uid-kid',verifyJWTWithUser,async (req,res)=>{
//
//     await Comment.update(
//         {
//             message: req.body.message,
//         },
//         {
//             where:
//                 { kid: req.body.kid, uid: req.body.uid }
//         });
//
//     res.status(200).json({ 'status': '200', 'message': "Category updated successfully" });
//
// })


// router.get('/api/v1/get-all-comments',async (req,res)=>{
//
//     let data= await Comment.findAll();
//
//     if (data)
//     {
//         res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched successfully" });
//     }
//     else
//     {
//         res.status(200).json({ 'status': '404','message': "No data found" });
//     }
// })
//

// //------- Delete Comment
// // router.post('/api/v1/delete-comment',verifyJWTWithAdmin,async (req,res)=>{
// //     await Comment.destroy({where: { kid: req.body.kid }});
// //     res.status(200).json({ 'status': '200', 'message': "Comment deleted successfully" });
// // })
//

// //------- comment by ID
// router.post('/api/v1/comment-by-kid',async (req,res)=>{
//     let data= await Comment.findOne({where: { kid: req.body.kid }});
//     res.status(200).json({ 'status': '200','data': data, 'message': "Data fetched successfully" });
// })
//
//
//
//
// //------- comment by aid
// router.post('/api/v1/comment-by-aid',async (req,res)=>{
//     let data= await Comment.findOne({where: { aid: req.body.aid }});
//     let count= await Comment.count({where: { aid: req.body.aid }});
//     res.status(200).json({ 'status': '200','data': data,'count': count,'message': "Data fetched successfully" });
// })

module.exports = router;