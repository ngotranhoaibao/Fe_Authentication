
import React, { createContext, useState } from "react";
import { loginUser, register, getMe, logoutUser } from "@/services/api/auth.js";
import { getAccessToken, removeAuthTokens } from "@/services/api/index.js"; 

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
            const loginRes = await loginUser({ email, password });

            const token = loginRes?.accessToken || loginRes?.data?.accessToken || null;

            if (!token) throw new Error("Missing access token from login API");

            localStorage.setItem("accessToken", token); 

            const profile = await getMe();

            const finalUserInfo = { user: profile }; 
            setUserInfo(finalUserInfo);
            localStorage.setItem("userInfo", JSON.stringify(finalUserInfo));

            toast.success("Đăng nhập thành công");
            navigate("/", { replace: true });

            return finalUserInfo;
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.response?.data?.message || "Login failed");
            
            removeAuthTokens(); 
            setUserInfo(null);
            throw error;
        }
    };
    
   const registerUser = async (payload) => {
  try {
    // register() now returns { user, token }
    const data = await register(payload);
    // data.token.accessToken expected
    const accessToken =
      data?.token?.accessToken ?? data?.accessToken ?? null;

    if (!accessToken) {
      console.error("Register: accessToken not found in response", data);
      throw new Error("Missing access token from register API");
    }

    localStorage.setItem("accessToken", accessToken);

    const profile = await getMe();

    const finalUserInfo = { user: profile };
    setUserInfo(finalUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(finalUserInfo));

    toast.success("Đăng ký thành công");
    return finalUserInfo;
  } catch (error) {
    console.error("Register error:", error);
    toast.error(error?.response?.data?.message || error.message || "Register failed");

    removeAuthTokens();
    setUserInfo(null);
    throw error;
  }
};

    const logout = async () => {
        try {
            await logoutUser();
        } catch (e) {
            console.warn("failed to logout on server");
        }

        setUserInfo(null);
        removeAuthTokens();
        navigate("/sign-in", { replace: true });
    };

    return (
        <AuthContext.Provider
            value={{
                userInfo: {
                    ...userInfo,
                    isAuthenticated: !!userInfo?.user && !!getAccessToken(),
                },
                loginContext,
                registerUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;