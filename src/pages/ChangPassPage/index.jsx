import React, { useState } from "react";
import ChangePassCard from "@/components/ChangePassCard";
import { resetPassword } from "@/services/api/auth";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const ChangPassPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPass || !confirmPass)
      return toast.error("Vui lòng nhập đầy đủ thông tin");

    if (newPass !== confirmPass)
      return toast.error("Mật khẩu nhập lại không khớp");

    try {
      setLoading(true);
      await resetPassword(token, newPass);

      toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      navigate("/sign-in");
    } catch (err) {
      toast.error("Token không hợp lệ hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f6f6fb] flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <div className="flex justify-center">
          <ChangePassCard
            onSubmitPassword={handleResetPassword}
            loading={loading}
            newPass={newPass}
            setNewPass={setNewPass}
            confirmPass={confirmPass}
            setConfirmPass={setConfirmPass}
            showNew={showNew}
            setShowNew={setShowNew}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangPassPage;
