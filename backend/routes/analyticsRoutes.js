const express = require("express");

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {getCategoryAnalytics, getMonthlyAnalytics} = require('../controllers/analyticsController');

router.get('/category',authMiddleware,getCategoryAnalytics);

router.get('/monthly',authMiddleware,getMonthlyAnalytics);

module.exports = router;