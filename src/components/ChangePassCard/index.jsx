import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ChangePassCard = ({
  onSubmitPassword,
  loading,
  newPass,
  setNewPass,
  confirmPass,
  setConfirmPass,
  showConfirm,
  setShowConfirm,
  showNew,
  setShowNew,
}) => {
  

  return (
    <Card className="w-full max-w-xl rounded-xl shadow-lg relative">
      <CardContent className="pt-8 px-8">
        <CardTitle className="text-2xl text-center font-extrabold mb-1">
          Change Password
        </CardTitle>

        <p className="text-center text-sm text-slate-500 mb-6">
          Update your password for better security.
        </p>

        <form onSubmit={onSubmitPassword} className="space-y-5">
          <div>
            <Label htmlFor="newPassword" className="mb-2">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                placeholder="Enter your new password"
                className="h-11 pr-12"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {showNew ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="mb-2">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your new password"
                className="h-11 pr-12"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-2"
          >
            {loading && <Spinner className="w-5 h-5 animate-spin" />}
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassCard;
