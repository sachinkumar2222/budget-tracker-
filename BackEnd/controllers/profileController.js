const User = require("../models/User");
const { validatePassword } = require("../utils/helper"); // Assuming you have this helper
const bcrypt = require("bcryptjs");

// Update Profile Details (Name, Phone, Address, Image)
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Comes from 'protect' middleware
        const { fullName, phoneNumber, address, profileImageUrl } = req.body;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if they are provided in the request
        if (fullName) user.fullName = fullName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address;
        if (profileImageUrl) user.profileImageUrl = profileImageUrl;

        // Save (This will trigger the 'pre save' hook, but password isn't modified so it's fine)
        const updatedUser = await user.save();

        // Return updated info (excluding password)
        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            address: updatedUser.address,
            profileImageUrl: updatedUser.profileImageUrl,
        });

    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide both old and new passwords" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 1. Check if old password matches
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        // 2. Validate new password strength
        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special char.",
            });
        }

        // 3. Update password
        // Direct assignment triggers the schema 'pre save' hook which hashes it
        user.password = newPassword; 
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ message: "Error changing password", error: err.message });
    }
};