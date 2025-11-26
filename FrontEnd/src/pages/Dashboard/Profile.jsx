import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { LuCamera, LuUser, LuMail, LuPhone, LuMapPin, LuLock, LuSave } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths"; // Import updated paths
import toast from "react-hot-toast";
import { getInitials } from "../../utils/helper";

const Profile = () => {
  const { user, updateUser } = useUserAuth();
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profileImageUrl: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        profileImageUrl: user.profileImageUrl || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // 1. Handle Image Upload (updated: send base64 JSON, not FormData)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result; // "data:image/png;base64,..."

      try {
        const response = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          { image: base64Image } // backend: const { image } = req.body;
        );

        if (response.data && response.data.imageUrl) {
          setProfileData((prev) => ({
            ...prev,
            profileImageUrl: response.data.imageUrl,
          }));
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Image upload failed: no URL returned");
        }
      } catch (error) {
        console.error("Image upload failed", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to upload image");
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  // 2. Update Profile Details
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.put(API_PATHS.PROFILE.UPDATE_PROFILE, {
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        profileImageUrl: profileData.profileImageUrl,
      });

      if (response.data) {
        updateUser(response.data);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // 3. Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.PROFILE.CHANGE_PASSWORD, passwordData);
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto w-full max-w-4xl">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-purple-50 overflow-hidden">
              {profileData.profileImageUrl ? (
                <img
                  src={profileData.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-primary">
                  {getInitials(profileData.fullName)}
                </div>
              )}
            </div>
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 bg-white border border-gray-200 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-50 transition"
            >
              <LuCamera className="text-primary" />
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{profileData.fullName}</h2>
            <p className="text-gray-500">{profileData.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Details Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Personal Details
            </h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Full Name
                </label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition">
                  <LuUser className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-3 border border-transparent cursor-not-allowed">
                  <LuMail className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={profileData.email}
                    disabled
                    className="w-full bg-transparent outline-none text-sm text-gray-500"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition">
                  <LuPhone className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Address
                </label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition">
                  <LuMapPin className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    placeholder="123 Street, City, Country"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                {loading ? "Saving..." : (
                  <>
                    <LuSave className="text-lg" /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Change Password
            </h3>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Current Password
                </label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition">
                  <LuLock className="text-gray-400 text-lg" />
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChangeInput}
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  New Password
                </label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition">
                  <LuLock className="text-gray-400 text-lg" />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChangeInput}
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-900 transition"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
