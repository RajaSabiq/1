const router = require('express').Router();

// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const Views = require('../models/views');
const Asset = require('../models/assets');


//------- View Content
router.post('/api/v1/add-view', async (req, res) => {

    if (req.body.uid === 0) {
        let data = await Views.create({
            vid: Helpers.createNanoId(),
            aid: req.body.aid
        });
        let assetData = await Asset.findOne({ where: { aid: req.body.aid } });
        await Asset.update(
            {
                watchCount: parseInt(assetData.watchCount) + 1,
            },
            {
                where: { aid: req.body.aid }
            });
        res.status(200).json({ 'status': '200', 'message': "View Added" });
    } else {
        let data = await Views.findOne({ where: { aid: req.body.aid, uid: req.body.uid } });

        if (data) {
            res.status(200).json({ 'status': '500', 'message': "View added already" });
        }
        else {
            let data = await Views.create({
                vid: Helpers.createNanoId(),
                aid: req.body.aid,
                uid: req.body.uid,
            });

            let assetData = await Asset.findOne({ where: { aid: req.body.aid } });

            await Asset.update(     // update reset code in db
                {
                    watchCount: parseInt(assetData.watchCount) + 1,
                },
                {
                    where: { aid: req.body.aid }
                });

            res.status(200).json({ 'status': '200', 'message': "View Added" });
        }
    }

})


//------- view by aid
router.post('/api/v1/view-by-aid', async (req, res) => {
    let data = await Views.findAll({ where: { aid: req.body.aid } });
    let count = await Views.count({ where: { aid: req.body.aid } });
    res.status(200).json({ 'status': '200', 'data': data, 'count': count, 'message': "Data fetched successfully" });
})

module.exports = router;