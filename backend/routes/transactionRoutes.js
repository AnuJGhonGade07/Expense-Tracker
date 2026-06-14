const express = require('express')

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { addTransaction, getTransaction, updateTransaction, deleteTransaction, getTransaction2

} = require('../controllers/transactionController')


router.post('/',authMiddleware,addTransaction);

router.get('/',authMiddleware,getTransaction);

router.get('/lmt',authMiddleware,getTransaction2);

router.put('/:id',authMiddleware,updateTransaction);

router.delete('/:id',authMiddleware,deleteTransaction);

module.exports = router;