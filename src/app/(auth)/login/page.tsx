import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to your Laksya Groups member portal to track projects, quotes, and more.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string; error?: string; next?: string }>;
}) {
  const params = await searchParams;
  return (
    <LoginForm
      confirmed={params.confirmed === "1"}
      error={params.error === "1"}
      next={params.next}
    />
  );
}
