const router = require('express').Router();

// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const Like = require('../models/likes');
const Asset = require('../models/assets');

// Verify JWT Token Middleware
const verifyJWTWithUser = require('../middlewares/verify_user_and_jwt');



//------- Like Content
router.post('/api/v1/like-content', verifyJWTWithUser, async (req, res) => {

    let data = await Like.findOne({ where: { aid: req.body.aid, uid: req.body.uid } });
    if (data) {
        let assetData = await Asset.findOne({ where: { aid: req.body.aid } });

        await Asset.update(     // update reset code in db
            {
                likeCount: parseInt(assetData.likeCount) - 1,
            },
            {
                where: { aid: req.body.aid }
            });
        await Like.destroy({ where: { aid: req.body.aid, uid: req.body.uid } });
        res.status(200).json({ 'status': '200', 'message': "Un-Liked Success" });
    }
    else {
        let data = await Like.create({
            lid: Helpers.createNanoId(),
            aid: req.body.aid,
            uid: req.body.uid,
        });

        let assetData = await Asset.findOne({ where: { aid: req.body.aid } });

        await Asset.update(     // update reset code in db
            {
                likeCount: parseInt(assetData.likeCount) + 1,
            },
            {
                where: { aid: req.body.aid }
            });
        res.status(201).json({ 'status': '200', 'message': "Liked Success" });
    }
})

//------- likes by aid
router.post('/api/v1/likes-by-aid', async (req, res) => {
    let data = await Like.findAll({ where: { aid: req.body.aid } });
    let count = await Like.count({ where: { aid: req.body.aid } });
    res.status(200).json({ 'status': '200', 'data': data, 'count': count, 'message': "Data fetched successfully" });

})

module.exports = router;