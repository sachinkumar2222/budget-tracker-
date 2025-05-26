const User = require("../models/User")
const Income = require("../models/Income")
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

exports.addIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        const {icon,source,amount,date} = req.body;
        
        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are Require"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date : new Date(date)
        });
         
        await newIncome.save();
        return res.status(200).json(newIncome);
    }catch(err){
        return res.status(500).json({message : "server Error"});
    }
}

exports.getAllIncome = async (req,res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1});
        return res.status(200).json(income);
    }catch(err){
         return res.status(500).json({message : "server Error"});
    }
}

exports.deleteIncome = async (req,res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        return res.json({message:"income deleted successfully"});
    }catch(err){
         return res.status(500).json({message : "server Error"});
    }
}

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Income');

    // Add header row
    worksheet.columns = [
      { header: 'Source', key: 'source', width: 25 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    // Add data rows
    income.forEach(item => {
      worksheet.addRow({
        source: item.source,
        amount: item.amount,
        date: item.date,
      });
    });

    const filePath = path.join(__dirname, '..', 'income_details.xlsx');

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, 'income_details.xlsx', err => {
      if (err) {
        return res.status(500).json({ message: 'Error downloading file' });
      }

      // Optional: clean up file after download
      fs.unlink(filePath, () => {});
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
