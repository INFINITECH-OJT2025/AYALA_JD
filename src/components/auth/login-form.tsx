"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Invalid login credentials");
      }

      const data = await response.json();
      if (data.user.email !== "anyayahanjosedexter@gmail.com") {
        throw new Error("Access denied. Only the admin can log in.");
      }

      sessionStorage.setItem("authToken", data.token);
      router.push("/admin/overview/dashboard");
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      setError(errorMessage);
      toast.error(errorMessage); // Toast for error
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setForgotPasswordMessage("Please enter your email to reset password.");
      toast.error("Please enter your email to reset password."); // Toast for validation
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send password reset email.");
      }

      setForgotPasswordMessage("Password reset link sent to your email.");
      toast.success("Password reset link sent to your email."); // Success toast
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      setForgotPasswordMessage(errorMessage);
      toast.error(errorMessage); // Toast for error
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        {/* Logo at the top */}
        <div className="flex justify-center mt-6">
          <img
            src="/logo.png"
            alt="Ayala Land Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the system.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Admin Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password with toggle */}
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit */}
              <Button type="submit" variant="success" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              {/* Forgot Password */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                Forgot Password?
              </button>

              {/* Success Message */}
              {forgotPasswordMessage && (
                <p className="text-sm text-green-600">
                  {forgotPasswordMessage}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
