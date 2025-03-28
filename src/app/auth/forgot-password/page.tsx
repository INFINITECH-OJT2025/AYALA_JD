import { ForgotPassword } from "@/components/auth/forgot-password";


export default function ForgotPasswordPage({ searchParams }: { searchParams: { email?: string; token?: string } }) {
    const email = searchParams.email || "";
    const token = searchParams.token || "";

    return <ForgotPassword email={email} token={token} />;
}
