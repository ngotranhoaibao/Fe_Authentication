import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
const LoginCard = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  loading = false,
}) => {
  return (
    <Card className="w-full max-w-sm ">
      <CardTitle className="text-2xl font-bold text-center">
        Welcome Back
      </CardTitle>
      <p className="text-center text-sm text-gray-500">
        Log in to your project management dashboard
      </p>
      <CardContent className="flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto p-0">
        <form className="w-full space-y-3">
          <Label htmlFor="email" className="">
            Email
          </Label>
          <Input
            data-slot="input"
            type="email"
            placeholder="Enter your email"
            className="h-9 w-full bg-transparent border border-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            data-slot="input"
            type="password"
            placeholder="Enter your password"
            className="h-9 w-full bg-transparent border border-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />
          <div className="flex items-center justify-between">            
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <p className="text-sm text-gray-500">Remember me</p>
            </div>
            
            <a className="text-sm text-primary">Forgot your password?</a>
          </div>
          <Button
            data-slot="button"
            onClick={handleLogin}
            className="w-full h-9 bg-[#007bff] text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" /> loading
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-2 text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?
            <Link to="/sign-up" data-discover="true" className="text-primary">
              Signup
            </Link>
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-0" />
      <CardDescription className="hidden" />
    </Card>
  );
};

export default LoginCard;
