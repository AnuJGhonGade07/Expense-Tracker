const Transaction = require('../models/Transaction');

const addTransaction = async(req,res) =>{

    try {
        const {title,amount,category,type} = req.body;

        if(!title|| !amount || !category || !type){
            return res.status(400).json({
                message:'All fields required'
            })
        }

        const transaction = await Transaction.create({
            title,amount,category,type, user: req.user
        });

        res.status(201).json(
            transaction
        );
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getTransaction = async (req, res) => {
  try {

    const {
      search,
      type,
      category,
      page = 1,
      limit = 5
    } = req.query;

    const query = {
      user: req.user
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i"
      };
    }

    if (type) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    const transactions =
      await Transaction.find(query)
        .sort({
          createdAt: -1
        })
        .skip(
          (page - 1) * limit
        )
        .limit(Number(limit));

    const total =
      await Transaction.countDocuments(
        query
      );

    res.status(200).json({
      total,
      page: Number(page),
      transactions
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};

const getTransaction2 = async (req, res) => {
  try {

    const {
      search,
      type,
      category,
      page = 1,
      limit = 20
    } = req.query;

    const query = {
      user: req.user
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i"
      };
    }

    if (type) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    const transactions =
      await Transaction.find(query)
        .sort({
          createdAt: -1
        })
        .skip(
          (page - 1) * limit
        )
        .limit(Number(limit));

    const total =
      await Transaction.countDocuments(
        query
      );

    res.status(200).json({
      total,
      page: Number(page),
      transactions
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};
const updateTransaction = async(req,res) =>{

    try {
        const transaction = await Transaction.findById(
            req.params.id 
        );

        if(!transaction){
            return res.status(404).json({
                message:'Transaction not Found'
            })
        }

        if(transaction.user.toString()!== req.user){
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,req.body,{
                returnDocument: "after"
            }
        );
        res.json(updatedTransaction)
    } catch (error) {
        res.status(500).json({
            message:'Server Error'
        });
    }
}

const deleteTransaction = async (req,res) => {

    try {
        const transaction = await Transaction.findById(req.params.id)

        if(!transaction){
            return res.status(404).json({
                    message:"Transaction not found"
                    });
        }

        if(transaction.user.toString()!== req.user){
            return res.status(403).json({
                    message:"Access Denied"
                    });
        }
        await transaction.deleteOne();

        res.json({
            message:"Transaction deleted"
        });
    } catch (error) {
        res.status(500).json({
            message:'Server Error'
        })
    }
    
}

module.exports = {addTransaction, getTransaction, updateTransaction, deleteTransaction , getTransaction2}
