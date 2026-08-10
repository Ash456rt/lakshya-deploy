import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

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
