const express = require("express")
const {addIncome,deleteIncome,getAllIncome,downloadIncomeExcel} = require("../controllers/incomeController");

const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get", protect, getAllIncome);
router.post("/add", protect, addIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;