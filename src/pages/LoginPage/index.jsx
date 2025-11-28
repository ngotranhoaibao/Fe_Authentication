import React, { useState, useContext } from "react";
import LoginCard from "@/components/LoginCard";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/authContext";
import { toast } from "react-hot-toast";
const LoginPage = () => {
  const { loginContext } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Payload login gửi:", { email, password }); // log payload
      await loginContext(email, password);
    } catch (error) {
      console.error("LoginPage error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-full h-full bg-[lightgray]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
          <LoginCard
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
