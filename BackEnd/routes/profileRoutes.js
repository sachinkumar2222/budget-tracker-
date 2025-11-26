const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateUserProfile, changePassword } = require("../controllers/profileController");

const router = express.Router();

// Route: /api/v1/profile/update
// Method: PUT
// Desc: Update name, phone, address, image
router.put("/update", protect, updateUserProfile);

// Route: /api/v1/profile/change-password
// Method: PUT
// Desc: Update password
router.put("/change-password", protect, changePassword);

module.exports = router;