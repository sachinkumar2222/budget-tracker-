import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerificationPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`/api/auth/verify-email/${token}`);
        setMessage(res.data);
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setMessage(
          err.response?.data || "Invalid or expired verification link."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h2 className={`text-2xl font-bold mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>Email Verification</h2>
      <p className="text-base text-gray-700">{message}</p>
      {success && <p className="text-sm text-gray-500 mt-2">Redirecting to login page...</p>}
    </div>
  );
};

export default EmailVerificationPage;
