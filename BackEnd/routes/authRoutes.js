const express = require("express");
const {loginUser,registerUser,getUserInfo,verifyEmail} =require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
 
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = req.file.path; 
  return res.status(200).json({ imageUrl });
});


module.exports = router;