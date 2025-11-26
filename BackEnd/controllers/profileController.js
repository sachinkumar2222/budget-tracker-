// controllers/userController.js

const User = require("../models/User");
const { validatePassword } = require("../utils/helper");
const uploadToCloudinary = require("../utils/cloudinary"); // ✅ NEW

// Update Profile Details (Name, Phone, Address, Image)
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from 'protect' middleware
    const { fullName, phoneNumber, address, profileImageUrl, profileImage } =
      req.body;
    // profileImage = base64 string (optional)

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a raw image (base64) is sent, upload to Cloudinary
    let finalProfileImageUrl = profileImageUrl || user.profileImageUrl;

    if (profileImage) {
      const uploadRes = await uploadToCloudinary(profileImage);
      finalProfileImageUrl = uploadRes.url;
    }

    // Update fields if they are provided in the request
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;
    if (finalProfileImageUrl) user.profileImageUrl = finalProfileImageUrl;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
      profileImageUrl: updatedUser.profileImageUrl,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({
      message: "Error updating profile",
      error: err.message,
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide both old and new passwords" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special char.",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({
      message: "Error changing password",
      error: err.message,
    });
  }
};
