const express = require("express");
const {loginUser,registerUser,getUserInfo,verifyEmail} =require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");
const uploadToCloudinary = require("../utils/cloudinary"); 

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
 
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", async (req, res) => {
  try {
    const { image } = req.body; 

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    const result = await uploadToCloudinary(image);

    return res.status(200).json({
      imageUrl: result.url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({
      message: "Error uploading image",
      error: err.message,
    });
  }
});


module.exports = router;