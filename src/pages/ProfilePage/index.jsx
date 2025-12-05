// Cập nhật ProfilePage.jsx
import React, { useState, useEffect } from "react"; 
import Header from "@/components/Header";
import ProfileDetails from "@/components/ProfileDetails";
import { getMe,logoutUser } from "@/services/api/auth";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm loading state
  const [error, setError] = useState(null);   // Thêm error state

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getMe();
        setProfile(data);
      } catch (e) {
        console.error("Error fetching profile:", e);
        setError("Lỗi tải hồ sơ.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/sign-in";
    } catch (e) {
      console.error("Error logging out:", e);
      setError("Lỗi đăng xuất.");
    }
  };

  return (
    <div>
      <Header
        title="Profile"
        description="View and Manage your account details"
      />
      <ProfileDetails 
          profile={profile} 
          loading={loading} 
          error={error} 
          onLogout={handleLogout} 
      />
    </div>
  );
};

export default ProfilePage;