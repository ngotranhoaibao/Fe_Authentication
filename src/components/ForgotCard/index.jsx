import React from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ForgotCard = ({ onSubmit, loading, email, setEmail, cooldown = 0 }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    if (cooldown > 0 || loading) return;
    await onSubmit(email);
  };

  const isDisabled = loading || cooldown > 0;

  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg relative">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2"></div>

      <CardContent className="pt-8 px-8">
        <CardTitle className="text-2xl text-center font-extrabold mb-1">
          Forgot Password
        </CardTitle>

        <p className="text-center text-sm text-slate-500 mb-6">
          Enter your email and we'll send a verification link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="forgot-email" className="mb-2">
              Email
            </Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
            className="bg-primary w-full h-11 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner />
                Sending...
              </>
            ) : cooldown > 0 ? (
              `Resend in ${cooldown}s`
            ) : (
              "Send verification email"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center px-8 pb-6">
        <button
          type="button"
          onClick={() => navigate("/sign-in")}
          className="text-sm text-slate-600 underline decoration-dotted"
          disabled={loading}
        >
          Back to Sign In
        </button>
      </CardFooter>
    </Card>
  );
};

export default ForgotCard;
