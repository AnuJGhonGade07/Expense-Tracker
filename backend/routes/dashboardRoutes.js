const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {getDashboardData,getRecentTransactions} = require('../controllers/dashboardController');

router.get('/',authMiddleware,getDashboardData);

router.get('/recent',authMiddleware,getRecentTransactions);

module.exports = router;