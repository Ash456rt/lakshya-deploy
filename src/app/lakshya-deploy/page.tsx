import { redirect } from "next/navigation";

export const metadata = {
  title: { absolute: "Lakshya Academy | Data Analysis, Web Development & Cybersecurity Courses" },
  description:
    "Master industry-aligned tech skills with Lakshya Academy.",
};

export default function LakshyaDeployPage() {
  redirect("/lakshya-deploy/index.html");
}
