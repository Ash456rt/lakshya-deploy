import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your free Lakshya Groups member account for project tracking and quote requests.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <SignupForm />;
}
