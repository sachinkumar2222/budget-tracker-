// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadToCloudinary = async (image) => {
  try {
    // "image" should be a base64 string or an image URL
    const result = await cloudinary.uploader.upload(image, {
      folder: "budgetTracker/profile", // optional folder
    });
    return result;
  } catch (err) {
    console.error("Cloudinary error in uploadToCloudinary:", err);
    throw err;
  }
};

module.exports = uploadToCloudinary;
