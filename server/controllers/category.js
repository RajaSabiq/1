const router = require('express').Router();

// Import Helper
const Helpers = require('../helpers/helper_functions')

// Model
const Category = require('../models/category');

// Verify JWT Token Middleware
const verifyJWTWithAdmin = require('../middlewares/verify_admin_and_jwt');

//------- Add Category
router.post('/api/v1/add-category', verifyJWTWithAdmin, async (req, res) => {

    let data = await Category.create({
        cid: Helpers.createNanoId(),
        name: req.body.name,
    });
    res.status(200).json({ 'status': '200', 'message': "Category added Successfully!" });
})

//------- Edit Category
router.post('/api/v1/edit-category', verifyJWTWithAdmin, async (req, res) => {

    await Category.update(
        {
            name: req.body.name,
        },
        {
            where:
                { cid: req.body.cid }
        });
    res.status(200).json({ 'status': '200', 'message': "Category updated successfully" });
})

//------- All Category
router.get('/api/v1/get-all-category', async (req, res) => {
    let data = await Category.findAll();
    if (data) {
        res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
    }
    else {
        res.status(200).json({ 'status': '404', 'message': "No data found" });
    }
})


//------- Delete Category
router.post('/api/v1/delete-category', verifyJWTWithAdmin, async (req, res) => {
    await Category.destroy({ where: { cid: req.body.cid } });
    res.status(200).json({ 'status': '200', 'message': "Category deleted successfully" });
})


//------- category by ID
router.post('/api/v1/category-by-cid', async (req, res) => {
    let data = await Category.findOne({ where: { cid: req.body.cid } });
    res.status(200).json({ 'status': '200', 'data': data, 'message': "Data fetched successfully" });
})


module.exports = router;