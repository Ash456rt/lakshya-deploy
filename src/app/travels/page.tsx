import { redirect } from "next/navigation";

export const metadata = {
  title: { absolute: "Lakshya Groups Travels — Discover Incredible India" },
  description:
    "Lakshya Groups Travels crafts unforgettable journeys across India.",
};

export default function TravelsPage() {
  redirect("/travels/index.html");
}
