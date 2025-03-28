// src/app/(auth)/forgot-password/page.tsx

import { Suspense } from "react";
import ForgotPasswordPageContent from "./forgot-password-content";

export default function ForgotPasswordPage() {
    return (
        <Suspense>
            <ForgotPasswordPageContent />
        </Suspense>
    );
}
