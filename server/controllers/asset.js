const router = require('express').Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const User = require('../models/users');
const Asset = require('../models/assets');
const TalentFiles = require('../models/talent_file');
const Likes = require('../models/likes');
const Views = require('../models/views');
const Comments = require('../models/comments');

User.hasMany(Asset, { foreignKey: 'uid' });
Asset.belongsTo(User, { foreignKey: 'uid' });

Asset.hasMany(TalentFiles, { foreignKey: 'aid' });
TalentFiles.belongsTo(Asset, { foreignKey: 'aid' });

// Verify JWT Token Middleware
const verifyJWTWithUser = require('../middlewares/verify_user_and_jwt');

const PORT = process.env.PORT || 4000;
const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || 'localhost';

//------- add
router.post('/api/v1/add-content', verifyJWTWithUser, async (req, res) => {

    if (req.body.categoryName === 'talent' && req.body.filetype == 'img') {
        if (req.files.talentImg) {
            let fileNameThumbnail = "";
            const aid = Helpers.createNanoId();
            if (req.files.thumbnail) {
                fileNameThumbnail = Helpers.saveThumbnail(req.files.thumbnail); // save thumbnail image
            }
            data = await Asset.create({
                aid: aid,
                uid: req.body.uid,
                title: req.body.title,
                thumbnail: fileNameThumbnail,
                thumbnailUrl: `${protocol}://${host}:${PORT}/thumbnail/${fileNameThumbnail}`,
                categoryName: req.body.categoryName,
                region: req.body.region,
                description: req.body.description,
                filetype: 'img',
                price: '',
                status: '',
            });

            if (data) {
                let files = req.files.talentImg;
                if (files.length > 0) {
                    files.forEach(async (file) => {
                        let fileName = Helpers.saveTalentImages(file);
                        let data = await TalentFiles.create({
                            iid: Helpers.createNanoId(),
                            uid: req.body.uid,
                            aid: aid,
                            name: fileName,
                            url: `${protocol}://${host}:${PORT}/assets/${fileName}`,
                        })
                    })
                } else {
                    let fileName = Helpers.saveTalentImages(files);
                    let data = await TalentFiles.create({
                        iid: Helpers.createNanoId(),
                        uid: req.body.uid,
                        aid: aid,
                        name: fileName,
                        url: `${protocol}://${host}:${PORT}/assets/${fileName}`,
                    })
                }
            }
            res.status(200).json({ 'status': '200', 'message': "Content Uploaded Successfully." });
        }
    } else {
        let fileNameThumbnail = "";
        let fileNameAsset = "";

        if (req.files.thumbnail) {
            fileNameThumbnail = Helpers.saveThumbnail(req.files.thumbnail); // save thumbnail image
        }
        if (req.files.asset) {
            fileNameAsset = Helpers.saveAsset(req.files.asset); // save asset
        }

        let data = await Asset.create({
            aid: Helpers.createNanoId(),
            uid: req.body.uid,
            title: req.body.title,
            thumbnail: fileNameThumbnail,
            thumbnailUrl: `${protocol}://${host}:${PORT}/thumbnail/${fileNameThumbnail}`,
            categoryName: req.body.categoryName,
            region: req.body.region,
            description: req.body.description,
            asset: fileNameAsset,
            assetUrl: `${protocol}://${host}:${PORT}/assets/${fileNameAsset}`,
            filetype: 'video',
            price: '',
            status: '',
        });
        res.status(200).json({ 'status': '200', 'message': "Content Uploaded Successfully." });
    }

})


//------- delete
router.post('/api/v1/delete-content', verifyJWTWithUser, async (req, res) => {

    let asset = await Helpers.findAssetByAid(req.body.aid);

    if (asset) {
        Helpers.deleteThumbnail(asset.thumbnail);
        Helpers.deleteAsset(asset.asset);

        let talentImgs = await TalentFiles.findAll({ where: { aid: req.body.aid } })
        talentImgs.forEach(async (file) => {
            Helpers.deleteTalentFiles(file.name)
        })

        await Asset.destroy({ where: { aid: req.body.aid } });
        await Likes.destroy({ where: { aid: req.body.aid } });
        await Comments.destroy({ where: { aid: req.body.aid } });
        await Views.destroy({ where: { aid: req.body.aid } });

        res.status(200).json({ 'status': '200', 'message': "Content deleted Successfully." });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No data found." });
    }

})

//------- all
router.get('/api/v1/all-content', async (req, res) => {
    let data = await Asset.findAll({ include: [User, TalentFiles], order: [['createdAt', 'DESC']] });
    res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
})


//------- update asset
router.post('/api/v1/update-asset', verifyJWTWithUser, async (req, res) => {

    let asset = await Helpers.findAssetByAid(req.body.aid);
    if (asset) {
        Helpers.deleteAsset(asset.asset);
        let fileNameAsset = Helpers.saveAsset(req.files.asset); // save asset

        await Asset.update(     // update reset code in db
            {
                asset: fileNameAsset,
                assetUrl: `${protocol}://${host}:${PORT}/assets/${fileNameAsset}`,
            },
            {
                where: { aid: req.body.aid }
            });
        res.status(200).json({ 'status': '200', 'message': "Content Updated." });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No data found." });
    }
})


//------- update thumbnail
router.post('/api/v1/update-thumbnail', verifyJWTWithUser, async (req, res) => {

    let asset = await Helpers.findAssetByAid(req.body.aid);
    if (asset) {
        Helpers.deleteThumbnail(asset.thumbnail);
        let fileNameThumbnail = Helpers.saveThumbnail(req.files.thumbnail); // save thumbnail image
        await Asset.update(     // update reset code in db
            {
                thumbnail: fileNameThumbnail,
                thumbnailUrl: `${protocol}://${host}:${PORT}/thumbnail/${fileNameThumbnail}`,
            },
            {
                where: { aid: req.body.aid }
            });

        res.status(200).json({ 'status': '200', 'message': "Thumbnail Updated." });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No data found." });
    }
})

//-------  by aid
router.post('/api/v1/content-by-aid', async (req, res) => {

    let data = await Asset.findOne({ include: [User, TalentFiles], where: { aid: req.body.aid } });

    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No Data Found" });
    }


})


//-------  ALL by aid
router.post('/api/v1/all-content-by-aid', async (req, res) => {

    let data = await Asset.findAll({ include: [User], order: [['createdAt', 'DESC']], where: { aid: req.body.aid } });

    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No Data Found" });
    }


})

//-------  all by uid
router.post('/api/v1/all-content-by-uid', async (req, res) => {

    let data = await Asset.findAll({ include: [User], order: [['createdAt', 'DESC']], where: { uid: req.body.uid } });

    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No Data Found" });
    }
})

//-------  by cid
router.post('/api/v1/content-by-cname', async (req, res) => {

    let data = await Asset.findAll({ include: [User], order: [['createdAt', 'DESC']], where: { categoryName: req.body.categoryName } });
    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No Data Found" });
    }
})

//-------  by searchName
router.post('/api/v1/content-by-search', async (req, res) => {

    let data = await Asset.findAll({
        include: [User],
        order: [['title', 'ASC']],
        where: {
            title: {
                [Op.like]: `%${req.body.search}%`
            }
        }
    });
    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No Data Found" });
    }
})

//------- update content
router.post('/api/v1/update-content', verifyJWTWithUser, async (req, res) => {

    let asset = await Helpers.findAssetByAid(req.body.aid);
    if (asset) {
        await Asset.update(     // update reset code in db
            {
                title: req.body.title,
                categoryName: req.body.categoryName,
                region: req.body.region,
                description: req.body.description
            },
            {
                where: { aid: req.body.aid }
            });

        res.status(200).json({ 'status': '200', 'message': "Content Updated." });
    }
    else {
        res.status(404).json({ 'status': '404', 'message': "No data found." });
    }
})

module.exports = router;