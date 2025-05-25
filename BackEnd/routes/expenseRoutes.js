const express = require("express")
const {addExpense,deleteExpense,getAllExpense,downloadExpenseExcel} = require("../controllers/expenseController");

const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get", protect, getAllExpense);
router.post("/add", protect, addExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;