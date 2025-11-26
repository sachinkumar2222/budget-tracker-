const multer = require("multer");
const cloudinary = require("cloudinary").v2;
// ▼▼▼ FIX: Ensure you use { } destructuring here ▼▼▼
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "budget-tracker_uploads", // The folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// 3. Initialize Multer
const upload = multer({ storage: storage });

module.exports = upload;