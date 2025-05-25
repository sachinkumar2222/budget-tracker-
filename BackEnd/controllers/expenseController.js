const User = require("../models/User")
const Expense = require("../models/Expense")
const xlsx = require("xlsx")

exports.addExpense = async (req,res) => {
    const userId = req.user.id;

    try{
        const {icon,category,amount,date} = req.body;
        
        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are Require"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date : new Date(date)
        });
         
        await newExpense.save();
        return res.status(200).json(newExpense);
    }catch(err){
        return res.status(500).json({message : "server Error"});
    }
}

exports.getAllExpense = async (req,res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        return res.status(200).json({expense});
    }catch(err){
         return res.status(500).json({message : "server Error"});
    }
}

exports.deleteExpense = async (req,res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        return res.json({message:"Expense deleted successfully"});
    }catch(err){
         return res.status(500).json({message : "server Error"});
    }
}

exports.downloadExpenseExcel = async (req,res) => {
    const userId = req.user.id;
    try{
        const Expense = await Expense.find({userId}).sort({date: -1});

        const data = Expense.map((item)=>({
            category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,"Expense_details.xlsx");
        res.download("incom_details.xlsx");
    }catch(err){
         return res.status(500).json({message : "server Error"});
    }
}