import React, { useContext, useState } from "react";
import SignupCard from "../../components/SignupCard";
import AuthContext from "@/contexts/authContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { registerUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ email, password, username });

      toast.success("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Register failed");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-full h-full bg-[lightgray]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
          <SignupCard
            handleRegister={handleRegister}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
