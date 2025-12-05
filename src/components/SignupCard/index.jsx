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

const SignupCard = ({
  handleRegister,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  role,
  setRole,
  loading = false,
}) => {
  return (
    <Card className="w-full max-w-sm p-8">
      <CardTitle className="text-2xl font-bold text-center">
        Create your account 
      </CardTitle>
      <CardContent className="flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto p-0">
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <Label htmlFor="name" className="block text-left">
            Name
          </Label>
          <Input
            type="text"
            placeholder="Nhập tên của bạn"
            className="h-9 w-full bg-transparent border border-input"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          <Label htmlFor="email" className="block text-left">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Nhập email của bạn"
            className="h-9 w-full bg-transparent border border-input"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Label htmlFor="password" className="block text-left">
            Password
          </Label>
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            className="h-9 w-full bg-transparent border border-input"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <Label htmlFor="role" className="block text-left">
            Select your role
          </Label>
          <select
            id="role"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="user">User </option>
            <option value="admin">Admin </option>
          </select>
          <Button
            type="submit"
            className="w-full h-9 bg-[#007bff] text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" /> loading...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>

        <div className="mt-2 text-center">
          <span className="text-sm text-gray-500">
            Already have an account?
            <Link to="/sign-in" className="text-primary ml-1 font-medium">
              Sign in
            </Link>
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-0" />
      <CardDescription className="hidden" />
    </Card>
  );
};

export default SignupCard;
