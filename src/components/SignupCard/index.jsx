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
  loading = false,
}) => {
  return (
    <Card className="w-full max-w-sm p-8">
    <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
      <CardContent className="flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto p-0">
        <form className="w-full flex flex-col gap-4">
          <Label htmlFor="name" className="block text-left">Name</Label>
          <Input
            type="text"
            placeholder="Enter your name"
            className="h-9 w-full bg-transparent border border-input"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <Label htmlFor="email" className="block text-left">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-9 w-full bg-transparent border border-input"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Label htmlFor="password" className="block text-left">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            className="h-9 w-full bg-transparent border border-input"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button type="submit" onClick={handleRegister} className="w-full h-9 bg-[#007bff] text-white">
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" /> loading
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-2 text-center">
          <span className="text-sm text-gray-500">
            Already have an account?
            <Link to="/sign-in" data-discover="true" className="text-primary">
              Login
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
