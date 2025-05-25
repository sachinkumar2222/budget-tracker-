const Expense = require("../models/Expense");
const Income = require("../models/Income");
const {isValidObjectId,Types} = require("mongoose")

exports.getDashboardData = async (req,res) =>{
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match : {userId : userObjectId} },
            { $group : {_id: null ,total : {$sum : "$amount"}}},
        ]);

        console.log("totalIncome", {totalIncome, userId : isValidObjectId(userId)})

        const totalExpense = await Expense.aggregate([
            { $match : {userId : userObjectId} },
            { $group : {_id: null ,total : {$sum : "$amount"}}},
        ]);
         
        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: {$gte : new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date : -1});
        
        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum,transaction)=> sum + transaction.amount,0
        )
         
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: {$gte : new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({date : -1});
        
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        //last 5 transaction (income + expense)
       const last5Incomes = await Income.find({ userId }).sort({ date: -1 }).limit(5);

        const last5Expenses = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const lastTransactions = [
        ...last5Incomes.map((txn) => ({
            ...txn.toObject(),
            type: "income",
        })),
        ...last5Expenses.map((txn) => ({
            ...txn.toObject(),
            type: "expense",
        })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

          
        res.json({
            totalBalance : (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0,
            totalExpense : totalExpense[0]?.total || 0,
            last60DaysIncome : {
                total : incomeLast60Days ,
                transactions : last60DaysIncomeTransaction,
            },
            last30DaysExpense : {
                total : expenseLast30Days ,
                transactions : last30DaysExpenseTransaction
            },
            recentTransactions : lastTransactions,
        })
    }catch(err){
       console.log("error while deshboard data ",err)
       return res.status(500).json({message : "server Error"});
    }
}