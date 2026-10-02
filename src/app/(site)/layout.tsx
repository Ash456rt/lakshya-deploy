import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

/* Route-group layout: every public page gets the site chrome.
   (Grouped pages keep their own metadata; the homepage stays standalone.) */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
