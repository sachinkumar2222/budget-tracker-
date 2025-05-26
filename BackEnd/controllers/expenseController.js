const User = require("../models/User")
const Expense = require("../models/Expense")
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

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

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expense');

    // Add header row
    worksheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    // Add data rows
    expense.forEach(item => {
      worksheet.addRow({
        category: item.category,
        amount: item.amount,
        date: item.date,
      });
    });

    const filePath = path.join(__dirname, '..', 'expense_details.xlsx');

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, 'expense_details.xlsx', err => {
      if (err) {
        return res.status(500).json({ message: 'Error downloading file' });
      }

      // Optional: delete file after download
      fs.unlink(filePath, () => {});
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
