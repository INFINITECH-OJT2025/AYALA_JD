import { Suspense } from "react";
import { ForgotPassword } from "@/components/auth/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ForgotPassword />
    </Suspense>
  );
}
