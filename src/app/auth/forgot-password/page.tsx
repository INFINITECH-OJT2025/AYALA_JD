// app/auth/forgot-password/page.tsx
import { ForgotPassword } from "@/components/auth/forgot-password";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword/>
    </Suspense>
  );
}
