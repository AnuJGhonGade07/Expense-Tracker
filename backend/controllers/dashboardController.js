const Transaction = require('../models/Transaction');

const getDashboardData = async (req,res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user
        })

        const totalIncome = transactions.filter((t)=>t.type ==='income')
                .reduce((sum,t)=> sum+t.amount,0);

        const totalExpense = transactions.filter((t)=>t.type === 'expense')
                    .reduce((sum,t)=>sum+t.amount,0)

        const balance = totalIncome - totalExpense

        res.status(200).json({
            totalExpense,totalIncome,balance, totalTransactions:transactions.length,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        })
    }
}



const getRecentTransactions = async (req, res) => {
  try {

    const transactions =
      await Transaction.find({
        user: req.user
      })
      .sort({
        createdAt: -1
      })
      .limit(5);

    res.status(200).json(
      transactions
    );

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
    getDashboardData,getRecentTransactions
}