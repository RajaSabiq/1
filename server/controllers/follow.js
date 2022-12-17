const router = require('express').Router();

// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const Follow = require('../models/follow');

// Verify JWT Token Middleware
const verifyJWTWithUser = require('../middlewares/verify_user_and_jwt');



//------- Follow Content
router.post('/api/v1/follow', verifyJWTWithUser, async (req, res) => {

    let data = await Follow.findOne({ where: { uid: req.body.uid, fUid: req.body.fUid } });

    if (data) {
        await Follow.destroy({ where: { uid: req.body.uid, fUid: req.body.fUid } });
        res.status(200).json({ 'status': '200', 'message': "Un-follow Success" });
    }
    else {
        let data = await Follow.create({
            fid: Helpers.createNanoId(),
            fUid: req.body.fUid,
            uid: req.body.uid,
        });
        res.status(202).json({ 'status': '200', 'message': "Follow Success" });
    }
})

//------- follow by uid
router.post('/api/v1/follow-by-uid', async (req, res) => {
    let data = await Follow.findAll({ where: { uid: req.body.uid } });
    let count = await Follow.count({ where: { uid: req.body.uid } });
    res.status(200).json({ 'status': '200', 'data': data, 'count': count, 'message': "Data fetched successfully" });
})

module.exports = router;