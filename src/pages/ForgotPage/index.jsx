import React, { useEffect, useState } from "react";
import ForgotCard from "@/components/ForgotCard";
import { forgotPassword } from "@/services/api/auth";
import { toast } from "react-hot-toast";

const COOLDOWN_KEY = "forgot_reset_time"; 
const COOLDOWN = 60; 

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const savedTime = localStorage.getItem(COOLDOWN_KEY);

    if (savedTime) {
      const timeLeft = Math.floor((savedTime - Date.now()) / 1000);
      if (timeLeft > 0) setCooldown(timeLeft);
      else localStorage.removeItem(COOLDOWN_KEY);
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(COOLDOWN_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleForgot = async () => {
    if (!email) return toast.error("Vui lòng nhập email");
    if (cooldown > 0) {
      return toast.error(`Vui lòng chờ ${cooldown}s để gửi lại`);
    }

    try {
      setLoading(true);
      await forgotPassword({ email });
      toast.success("Đã gửi email. Vui lòng kiểm tra hộp thư!");

      const expireTime = Date.now() + COOLDOWN * 1000;
      localStorage.setItem(COOLDOWN_KEY, expireTime);
      setCooldown(COOLDOWN);

    } catch (err) {
      toast.error("Không thể gửi email. Thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6fb]">
      <ForgotCard
        email={email}
        setEmail={setEmail}
        loading={loading}
        cooldown={cooldown}
        onSubmit={handleForgot}
      />
    </div>
  );
};

export default ForgotPage;
