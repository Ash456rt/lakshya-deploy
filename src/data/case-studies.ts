export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  services: string[];
  image: string;
  date: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "travelvue-booking-platform",
    title: "Rebuilding a Travel Booking Platform from Scratch",
    client: "TravelVue",
    industry: "Travel & Tourism",
    challenge:
      "TravelVue was running on a legacy PHP system that could not handle peak-season traffic. Bookings took 3+ hours to process, and the mobile experience was broken. They needed a complete rebuild without losing existing customer data.",
    solution:
      "We built a Next.js frontend with a Node.js backend and PostgreSQL database. The migration included a custom data migration script that transferred 50,000+ customer records and booking history with zero downtime. The new platform supports real-time availability, instant booking confirmation, and a mobile-first design.",
    results: [
      { metric: "Booking time", value: "3 hours → 10 minutes" },
      { metric: "Mobile traffic", value: "+180% in 3 months" },
      { metric: "Conversion rate", value: "+45% increase" },
      { metric: "Page load speed", value: "4.2s → 1.1s" },
    ],
    services: ["App & Web Development", "Strategic Consultancy"],
    image: "/travel.jpg",
    date: "2026-06-15",
  },
  {
    slug: "greenleaf-export-logistics",
    title: "Consolidating 4 Vendors into 1 for Global Exports",
    client: "GreenLeaf Exports",
    industry: "Import & Export",
    challenge:
      "GreenLeaf was juggling 4 separate vendors for web development, customer support, logistics coordination, and business consulting. Communication gaps caused delayed shipments and frustrated clients.",
    solution:
      "We consolidated all 4 services under Laksya Groups. Our team integrated their order management system with their logistics provider, set up 24/7 multilingual support, and built a client portal for real-time shipment tracking.",
    results: [
      { metric: "Vendor coordination overhead", value: "-50%" },
      { metric: "Customer response time", value: "4 hours → 20 minutes" },
      { metric: "Shipment delays", value: "-70% reduction" },
      { metric: "Annual cost savings", value: "₹12 lakhs/year" },
    ],
    services: [
      "Customer Support",
      "Transport & Logistics",
      "Strategic Consultancy",
    ],
    image: "/import-export.jpg",
    date: "2026-04-20",
  },
  {
    slug: "finserve-developer-upskilling",
    title: "Upskilling 12 Junior Developers in 3 Months",
    client: "FinServe Solutions",
    industry: "FinTech",
    challenge:
      "FinServe had a team of 12 junior developers who were productive but using outdated practices. Sprint velocity was low, code review cycles were long, and the team struggled with modern React patterns.",
    solution:
      "Laksya Academy designed a custom 12-week program covering modern React, TypeScript, testing, and DevOps. Each week included hands-on projects mirroring FinServe's actual codebase. We paired training with on-the-job mentoring during real sprints.",
    results: [
      { metric: "Sprint velocity", value: "+60% improvement" },
      { metric: "Code review cycles", value: "-40% faster" },
      { metric: "Bug rate", value: "-35% reduction" },
      { metric: "Team retention", value: "100% (0 attrition)" },
    ],
    services: ["Lakshya Academy"],
    image: "/academy.jpg",
    date: "2026-03-10",
  },
  {
    slug: "quickserve-customer-support",
    title: "Setting Up 24/7 Customer Support for a Growing E-Commerce Brand",
    client: "QuickServe Logistics",
    industry: "E-Commerce",
    challenge:
      "QuickServe was handling customer queries through a shared Gmail inbox. As orders grew from 50 to 500 per day, response times ballooned to 24+ hours and customer satisfaction dropped.",
    solution:
      "We set up a tiered support system with ticketing, created a knowledge base for common queries, trained a 4-person support team, and implemented live chat on their website. Average first response time dropped from 24 hours to 15 minutes.",
    results: [
      { metric: "First response time", value: "24h → 15 minutes" },
      { metric: "Customer satisfaction", value: "+35% CSAT score" },
      { metric: "Ticket resolution", value: "-60% average time" },
      { metric: "Support cost", value: "-40% vs. previous setup" },
    ],
    services: ["Customer Support", "Strategic Consultancy"],
    image: "/support.jpg",
    date: "2026-02-05",
  },
  {
    slug: "sunny-travels-website",
    title: "Launching a Travel Booking Website in 4 Weeks",
    client: "Sunny Travels",
    industry: "Travel & Tourism",
    challenge:
      "Sunny Travels had no online presence. They were taking bookings over phone and WhatsApp, losing customers who wanted to browse and book independently.",
    solution:
      "We built a complete travel booking website with package listings, inquiry forms, and WhatsApp integration. The site launched in 4 weeks with SEO optimized for 'Bengaluru travel packages' and related keywords.",
    results: [
      { metric: "Online inquiries", value: "0 → 30/week" },
      { metric: "Google ranking", value: "Page 1 for 5 keywords" },
      { metric: "Booking conversion", value: "12% from website" },
      { metric: "Time to launch", value: "4 weeks" },
    ],
    services: ["App & Web Development"],
    image: "/travel.jpg",
    date: "2026-01-15",
  },
  {
    slug: "megalogistics-transport-ops",
    title: "Digitizing Transport Operations for a Fleet of 50 Vehicles",
    client: "MegaLogistics",
    industry: "Transport & Logistics",
    challenge:
      "MegaLogistics tracked 50 vehicles using spreadsheets and phone calls. Dispatchers spent 3 hours daily on manual route planning, and clients had no visibility into shipment status.",
    solution:
      "We built a custom logistics dashboard with real-time vehicle tracking, automated route optimization, and a client-facing portal for shipment status. Integrated with Google Maps API for live tracking.",
    results: [
      { metric: "Route planning time", value: "3 hours → 20 minutes" },
      { metric: "Fuel costs", value: "-25% reduction" },
      { metric: "Client visibility", value: "Real-time tracking" },
      { metric: "Dispatch errors", value: "-80% reduction" },
    ],
    services: ["App & Web Development", "Strategic Consultancy"],
    image: "/transport.jpg",
    date: "2025-11-20",
  },
];
