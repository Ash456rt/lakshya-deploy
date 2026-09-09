export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  metaDescription?: string;
  solution: string;
  approach?: string[];
  takeaways?: string[];
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
    metaDescription:
      "How we rebuilt TravelVue's booking platform in Next.js: 50,000+ records migrated with zero downtime and booking time cut from 3 hours to 10 minutes.",
    solution:
      "We built a Next.js frontend with a Node.js backend and PostgreSQL database. The migration included a custom data migration script that transferred 50,000+ customer records and booking history with zero downtime. The new platform supports real-time availability, instant booking confirmation, and a mobile-first design.",
    results: [
      { metric: "Booking time", value: "3 hours → 10 minutes" },
      { metric: "Mobile traffic", value: "+180% in 3 months" },
      { metric: "Conversion rate", value: "+45% increase" },
      { metric: "Page load speed", value: "4.2s → 1.1s" },
    ],
    approach: [
      "Audited the legacy PHP codebase and mapped every booking flow, payment hook and customer record that had to survive the migration.",
      "Rebuilt the frontend in Next.js with a mobile-first design, backed by a Node.js API and PostgreSQL for reliability under peak-season load.",
      "Wrote a custom migration script that moved 50,000+ customer records and booking history in batches, verified after every batch.",
      "Cut over during a low-season weekend with zero downtime, then monitored real-user metrics for two weeks and tuned slow queries.",
    ],
    takeaways: [
      "A rebuild does not have to mean starting over: preserving customer data and URLs protects both trust and the SEO equity the old site had earned.",
      "Real-time availability and instant confirmation were the single biggest conversion drivers - speed of booking matters more than beauty.",
      "Page load time fell from 4.2s to 1.1s, and mobile traffic nearly tripled within a quarter of launch.",
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
    metaDescription:
      "GreenLeaf consolidated 4 vendors into one partner — support, logistics and consultancy — cutting coordination overhead 50% and saving ₹12 lakhs a year.",
    solution:
      "We consolidated all 4 services under Lakshya Groups. Our team integrated their order management system with their logistics provider, set up 24/7 multilingual support, and built a client portal for real-time shipment tracking.",
    results: [
      { metric: "Vendor coordination overhead", value: "-50%" },
      { metric: "Customer response time", value: "4 hours → 20 minutes" },
      { metric: "Shipment delays", value: "-70% reduction" },
      { metric: "Annual cost savings", value: "₹12 lakhs/year" },
    ],
    approach: [
      "Mapped all four vendor relationships, their SLAs and their blind spots, then sequenced the takeover so no service had a gap in coverage.",
      "Moved customer support first: a tiered ticketing system with a trained multilingual team cut first response from 4 hours to 20 minutes.",
      "Integrated the order management system with the logistics provider and added a client portal for real-time shipment tracking.",
      "Closed the loop with quarterly consultancy reviews that turned support tickets into product and process improvements.",
    ],
    takeaways: [
      "Consolidation pays twice: coordination overhead dropped 50% and the company saved ₹12 lakhs a year once four invoices became one.",
      "Support is a data source: complaints routed through one system exposed the root causes behind most shipment delays.",
      "A single accountable partner removed the vendor-versus-vendor blame loop entirely - shipment delays fell 70%.",
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
    metaDescription:
      "Lakshya Academy upskilled 12 FinServe developers in 12 weeks — sprint velocity up 60%, code review cycles 40% faster, zero attrition.",
    solution:
      "Lakshya Academy designed a custom 12-week program covering modern React, TypeScript, testing, and DevOps. Each week included hands-on projects mirroring FinServe's actual codebase. We paired training with on-the-job mentoring during real sprints.",
    results: [
      { metric: "Sprint velocity", value: "+60% improvement" },
      { metric: "Code review cycles", value: "-40% faster" },
      { metric: "Bug rate", value: "-35% reduction" },
      { metric: "Team retention", value: "100% (0 attrition)" },
    ],
    approach: [
      "Assessed the team's real skill gaps with a code-review audit instead of a generic test, then built a 12-week curriculum around those gaps.",
      "Taught modern React, TypeScript, testing and DevOps through hands-on projects that mirrored FinServe's actual codebase, not toy examples.",
      "Paired every training week with on-the-job mentoring during real sprints, so new patterns landed in production code immediately.",
      "Measured progress by sprint velocity, review cycle time and bug rate - and adjusted the curriculum every two weeks based on the numbers.",
    ],
    takeaways: [
      "Training on your own codebase beats generic courses: developers fixed real tickets with new skills in week two, not month three.",
      "Sprint velocity rose 60% and code review cycles got 40% faster without a single new hire - upskilling was cheaper than recruiting.",
      "Zero attrition during the program: developers who grow inside a company tend to stay inside the company.",
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
    metaDescription:
      "We built QuickServe a tiered 24/7 support system with ticketing, knowledge base and live chat — first response time fell from 24 hours to 15 minutes.",
    solution:
      "We set up a tiered support system with ticketing, created a knowledge base for common queries, trained a 4-person support team, and implemented live chat on their website. Average first response time dropped from 24 hours to 15 minutes.",
    results: [
      { metric: "First response time", value: "24h → 15 minutes" },
      { metric: "Customer satisfaction", value: "+35% CSAT score" },
      { metric: "Ticket resolution", value: "-60% average time" },
      { metric: "Support cost", value: "-40% vs. previous setup" },
    ],
    approach: [
      "Audited three months of inbox traffic to find the twenty questions that made up most queries, then built answers around them.",
      "Set up tiered support: a self-serve knowledge base, live chat for urgent issues, and a trained four-person team for everything else.",
      "Wrote playbooks for refunds, shipping issues and escalations so every agent resolves common cases the same fast way.",
      "Instrumented everything with CSAT surveys and response-time tracking, then reviewed the numbers weekly with the founder.",
    ],
    takeaways: [
      "A shared Gmail inbox does not scale past a few hundred orders a day - response time fell from 24 hours to 15 minutes after tiering.",
      "The knowledge base deflected 40% of tickets within two months, cutting support cost 40% while CSAT rose 35%.",
      "Support data feeds product decisions: the most-deflected questions showed where the buying flow itself needed fixing.",
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
    metaDescription:
      "Sunny Travels went from phone-only bookings to a full travel website in 4 weeks — now 30 online inquiries a week and page-1 Google rankings.",
    solution:
      "We built a complete travel booking website with package listings, inquiry forms, and WhatsApp integration. The site launched in 4 weeks with SEO optimized for 'Bengaluru travel packages' and related keywords.",
    results: [
      { metric: "Online inquiries", value: "0 → 30/week" },
      { metric: "Google ranking", value: "Page 1 for 5 keywords" },
      { metric: "Booking conversion", value: "12% from website" },
      { metric: "Time to launch", value: "4 weeks" },
    ],
    approach: [
      "Ran a one-week discovery on Sunny Travels' most profitable routes and customer questions before designing a single page.",
      "Built a fast, mobile-first website with package listings, clear pricing, inquiry forms and WhatsApp booking integration.",
      "Wrote SEO-focused content for every package page targeting Bengaluru travel searches, with structured data and a sitemap from day one.",
      "Trained the owner to update packages and prices themselves, and set up Google Business Profile alongside the launch.",
    ],
    takeaways: [
      "A four-week launch is possible when scope is ruthless: five package pages beat twenty unfinished ones.",
      "Local SEO compounds fast - five keywords reached page 1 within three months of launch at near-zero ad spend.",
      "WhatsApp integration met customers where they already were, converting 12% of website visitors into bookings.",
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
    metaDescription:
      "We digitized MegaLogistics' 50-vehicle fleet with live tracking and route optimization — route planning down from 3 hours to 20 minutes a day.",
    solution:
      "We built a custom logistics dashboard with real-time vehicle tracking, automated route optimization, and a client-facing portal for shipment status. Integrated with Google Maps API for live tracking.",
    results: [
      { metric: "Route planning time", value: "3 hours → 20 minutes" },
      { metric: "Fuel costs", value: "-25% reduction" },
      { metric: "Client visibility", value: "Real-time tracking" },
      { metric: "Dispatch errors", value: "-80% reduction" },
    ],
    approach: [
      "Shadowed dispatchers for two days to understand the spreadsheet workflow before replacing it - the tool had to fit their day, not the reverse.",
      "Built a logistics dashboard with live vehicle tracking on Google Maps API, automated route optimization, and dispatch alerts.",
      "Added a client-facing portal so customers check shipment status themselves instead of calling the dispatch desk.",
      "Rolled out in phases - one fleet segment at a time - and trained dispatchers with their own real routes, not demo data.",
    ],
    takeaways: [
      "Route planning dropped from 3 hours a day to 20 minutes, freeing dispatchers for exceptions instead of spreadsheet maintenance.",
      "Automated route optimization cut fuel costs 25% in the first quarter - optimization paid for the dashboard.",
      "The client portal deflected most status calls, and dispatch errors fell 80% once humans stopped re-typing data.",
    ],
    services: ["App & Web Development", "Strategic Consultancy"],
    image: "/transport.jpg",
    date: "2025-11-20",
  },
];
