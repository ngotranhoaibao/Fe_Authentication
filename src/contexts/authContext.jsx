import { createContext, useState } from "react";
import { loginUser, register, getMe } from "@/services/api/auth.js";
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
      const data = res.data; 
      localStorage.setItem("userInfo", JSON.stringify(data));
      const meRes = await getMe();
      const updated = { ...data, user: meRes.data }; 
      setUserInfo(updated);
      localStorage.setItem("userInfo", JSON.stringify(updated));

      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

 const registerUser = async (payload) => {
  try {
    const res = await register(payload); 
    const data = res.data;

    localStorage.setItem("userInfo", JSON.stringify(data));

    const meRes = await getMe();
    const updated = { ...data, user: meRes.data };
    setUserInfo(updated);
    localStorage.setItem("userInfo", JSON.stringify(updated));

    return updated; 
  } catch (error) {
    if (error.response?.data?.errorCode?.length) {
      error.response.data.errorCode.forEach((e) => toast.error(e.message));
    } else {
      toast.error(error.response?.data?.message || "Register failed");
    }
    throw error; 
  }
};



  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    navigate("/sign-in", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ userInfo, loginContext, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
