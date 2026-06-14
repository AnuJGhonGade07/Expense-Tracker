const mongoose = require("mongoose");
const Transaction = require('../models/Transaction');

const getCategoryAnalytics = async (req,res) => {
    
    try {
            const analytics =
            await Transaction.aggregate([
            {
            $match:{
            user:new mongoose.Types.ObjectId(req.user)}
            },
            {
                $group:{
                    _id:"$category",
                    amount:{$sum:"$amount"}
                        }
            },
            {
            $project:{
            _id:0,
            category:"$_id",
            amount:1}}
            ]);
    res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

const getMonthlyAnalytics = async (req,res) => {
    try{
        const analytics = await Transaction.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(req.user)
                }
            },
            {
                $group:{
                    _id:{
                        month:{
                        $dateToString:{
                            format: '%Y-%m',
                            date: '$date'}
                        },

                        type: '$type'
                    },
                    total: {$sum:'$amount'},

            }

            },{
                $sort:{
                    '_id.month':1
                }
            }

        ])
        res.status(200).json(analytics)
    }catch(error){
            res.status(500).json({
                message: "Server Error"
    });
    }
}

module.exports = {
    getCategoryAnalytics, getMonthlyAnalytics
};