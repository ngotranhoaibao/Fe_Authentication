import React, { useState, createContext } from "react";
import { loginUser, getMe, register } from "@/services/api/auth.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  const loginContext = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      if (res.status === 200) {
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/");
      }
      try {
        const me = await getMe();
        if (me.status === 200) {
          const old = JSON.parse(localStorage.getItem("userInfo")) || {};
          const updated = { ...old, user: me.data?.user || me.data };
          localStorage.setItem("userInfo", JSON.stringify(updated));
          setUserInfo(updated);
          toast.success("Đăng nhập thành công!");
        } else {
          toast.error("Không thể lấy thông tin người dùng!");
        }
      } catch (err) {
        console.error("Lỗi getMe:", err);
        toast.error("Không thể lấy thông tin người dùng!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {}
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    navigate("/sign-in", { replace: true });
  };

  const registerUser = async (payload) => {
    try {
      const res = await register(payload);
      if (res.status === 200) {
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, loginContext, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
