export type Author = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: Author;
  content: { heading: string; body: string }[];
};

export const authors: Record<string, Author> = {
  shubham: {
    name: 'Shubham Kushwaha',
    role: 'Founder & CEO',
    bio: 'Full-stack developer and entrepreneur with 8+ years building web and mobile products. Leads Lakshya Groups\' technology and strategy divisions.',
    avatar: '/team.jpg',
    linkedin: 'https://linkedin.com/in/shubhamkushwaha',
  },
  team: {
    name: 'Lakshya Groups Team',
    role: 'Content Team',
    bio: 'The collective insights from our engineering, consulting, and operations teams across 50+ countries.',
    avatar: '/laksya-logo.png',
  },
};

export const posts: Post[] = [
  {
    slug: 'our-stack-why-nextjs-supabase-tailwind',
    title: 'Our Tech Stack: Why We Use Next.js, Supabase, and Tailwind for Every Client Project',
    excerpt: 'After building 30+ projects, we settled on a stack that balances speed, cost, and maintainability. Here is exactly why we chose each tool and when we break our own rules.',
    category: 'Web Development',
    date: '2026-08-20',
    readTime: '6 min read',
    author: authors.shubham,
    content: [
      {
        heading: 'The problem with picking tools',
        body: 'Every developer loves trying new frameworks. Every client just wants something that works, loads fast, and does not cost a fortune to maintain. After 8 years of building websites and apps for businesses in Bengaluru and beyond, we stopped chasing the latest JavaScript framework and settled on a stack that serves 90% of our clients perfectly. Here is what we use and why.',
      },
      {
        heading: 'Next.js: Fast sites without the headaches',
        body: 'We switched to Next.js in 2024 after hitting limits with plain React and WordPress. The server-side rendering means pages load fast on first visit, which matters for SEO. The App Router gave us clean file-based routing. Static generation handles marketing pages without a database. For most business websites, Next.js hits the sweet spot between power and simplicity. Our average Lighthouse score across client sites went from 62 to 94 after migration.',
      },
      {
        heading: 'Supabase: Database without the DevOps',
        body: 'Before Supabase, we were managing PostgreSQL servers, writing migration scripts, and debugging connection pooling. Supabase gave us a hosted Postgres database with auth, real-time subscriptions, and row-level security out of the box. For our client portal and admin dashboards, this cut backend development time by roughly 40%. The free tier handles most small-to-medium traffic, and the paid plan at $25/month is cheaper than a single developer hour.',
      },
      {
        heading: 'Tailwind CSS: Ship UIs that look good',
        body: 'We used to spend days writing custom CSS for every project. Tailwind changed that. Utility-first CSS means we build consistent, responsive interfaces without leaving the HTML. Combined with shadcn/ui components, we can ship a polished dashboard in days instead of weeks. The learning curve is real, but once your team gets it, development speed doubles.',
      },
      {
        heading: 'When we break our own rules',
        body: 'This stack is not universal. For a 5-page brochure site, we use plain HTML and Tailwind — no Next.js needed. For WordPress-heavy content sites, we still recommend WordPress. For mobile apps that need deep OS integration, we go native. The right tool is the one your team can maintain, not the one with the most GitHub stars.',
      },
      {
        heading: 'The cost advantage for clients',
        body: 'Because this stack is open-source and widely adopted, hiring developers is cheaper, documentation is abundant, and community support is strong. Our clients pay less for maintenance because the tools are battle-tested and well-documented. A WordPress site with 20 plugins costs more in yearly updates than a clean Next.js build that just works.',
      },
    ],
  },
  {
    slug: 'choosing-web-development-partner',
    title: 'How to Choose the Right Web Development Partner in India',
    excerpt: 'Price is only one factor. Here is the checklist we give every client before they pick a web development team - and how to spot the difference between a vendor and a partner.',
    category: 'Web Development',
    date: '2026-08-10',
    readTime: '4 min read',
    author: authors.shubham,
    content: [
      {
        heading: 'Start with the problem, not the stack',
        body: 'Most web development projects go sideways because the conversation starts with technology instead of outcomes. Before you compare agencies, write down what the website actually needs to do: generate leads, take bookings, sell products, or simply establish trust. A good partner asks about your customers and your business model first. If a vendor opens with a sales pitch about their framework, that is a warning sign.',
      },
      {
        heading: 'Check real work, not just portfolios',
        body: 'Every agency shows polished case studies. What matters is whether the projects are similar to yours: a service business, a logistics operation, or an e-commerce store. Ask for live URLs, not screenshots, and load them on your phone. If the sites are slow or break on mobile, the work will not serve you either. Performance and responsiveness are table stakes in 2026.',
      },
      {
        heading: 'Verify communication before you sign',
        body: 'Development is 20% code and 80% communication. Ask how you will receive updates, who your point of contact is, and what happens after launch. A partner should give you a clear timeline, a fixed scope, and honest answers about what is included in maintenance. Watch out for vague phrases like we will handle everything - get the contract to say what that means.',
      },
      {
        heading: 'Look for a team that can grow with you',
        body: 'Your first website will not be your last. Over time you will need an app, integrations, analytics, or ongoing support. A multi-service team that also handles app development, digital consultancy, and customer support can grow with you without the pain of switching vendors. That continuity is often worth more than a slightly cheaper quote.',
      },
    ],
  },
  {
    slug: 'app-vs-web-development-2026',
    title: 'App vs Web Development: What Does Your Business Actually Need in 2026?',
    excerpt: 'Native app, or a fast web app? The right answer depends on your customers, not your preferences. Here is a practical breakdown for businesses weighing the decision.',
    category: 'App Development',
    date: '2026-08-05',
    readTime: '4 min read',
    author: authors.shubham,
    content: [
      {
        heading: 'When a web app wins',
        body: 'If your goal is reach, discovery, and low friction, a web app usually wins. No app store approval, no download step, instant updates, and one codebase that works on every device. For businesses that want customers to find them through Google, a well-built website is also your best marketing asset. Web is almost always the right first step.',
      },
      {
        heading: 'When a native app wins',
        body: 'Native apps shine when customers engage daily: food delivery, fitness tracking, messaging, loyalty programs. Push notifications, offline access, camera and sensor features, and deep OS integration only exist in native apps. If your product depends on these, an app is not optional - it is the product itself.',
      },
      {
        heading: 'The middle path: build web first, app later',
        body: 'Most businesses do not need to choose once and forever. Start with a fast, mobile-friendly web app to validate demand and collect feedback. When users show real retention, build a native app that reuses the same backend and design system. This staged approach cuts risk and spreads the cost across two budgets instead of one giant bet.',
      },
      {
        heading: 'What the build actually costs',
        body: 'A native app needs separate iOS and Android builds, store fees, and review cycles, so it is typically 2-3x the cost of a comparable web app. Maintenance is also ongoing: OS updates break things. A good development partner gives you a total cost of ownership estimate - build, launch, and two years of upkeep - so you compare like for like.',
      },
    ],
  },
  {
    slug: 'one-partner-many-services',
    title: 'One Partner, Seven Services: Why Consolidating Vendors Saves Real Money',
    excerpt: 'Managing seven vendors for seven services sounds flexible. In practice, it means seven contracts, seven invoices, and seven points of blame. Here is what consolidation actually saves.',
    category: 'Business',
    date: '2026-07-28',
    readTime: '3 min read',
    author: authors.shubham,
    content: [
      {
        heading: 'The hidden cost of vendor sprawl',
        body: 'Every vendor adds overhead: procurement, onboarding, contract review, invoice reconciliation, and status meetings. Research consistently shows coordination costs eat 10-20% of the value of outsourced work. A single partner consolidates that overhead into one relationship and one accountable point of contact.',
      },
      {
        heading: 'Services that belong together',
        body: 'Some services naturally overlap. A company that builds your e-commerce site can also handle the digital consultancy behind it, the customer support team answering queries, and the logistics partner moving the goods. When one team understands your full operation, handoffs between departments stop being black boxes.',
      },
      {
        heading: 'Accountability beats convenience',
        body: 'When something goes wrong across multiple vendors, everyone points at everyone else. With one partner, there is nowhere to hide. You get faster fixes, shared context, and teams that actually talk to each other. For a growing business, that accountability is often the difference between a stalled launch and a smooth one.',
      },
      {
        heading: 'How to consolidate without losing quality',
        body: 'Consolidation works when the partner is genuinely multi-disciplinary, not a jack-of-all-trades with one real specialty. Check that each service line has its own expertise, separate contracts, and clear service levels. Start with one service, prove the relationship, then expand. A real multi-service group earns each additional contract.',
      },
    ],
  },
  {
    slug: 'why-nextjs-for-business-websites-2026',
    title: 'Why We Recommend Next.js for Business Websites in 2026 (And When We Dont)',
    excerpt: 'After building 30+ websites on Next.js, here is what we have learned about when it works brilliantly and when you should pick something simpler.',
    category: 'Web Development',
    date: '2026-08-18',
    readTime: '5 min read',
    author: authors.shubham,
    content: [
      {
        heading: 'Why Next.js became our default',
        body: 'We migrated to Next.js as our primary framework in 2024 after hitting limits with create-react-app and plain WordPress builds. The server-side rendering meant our clients websites loaded fast on first paint, the static generation handled marketing pages without a database, and the App Router gave us clean file-based routing. For a business that needs a fast, SEO-friendly website, Next.js hits the sweet spot between power and simplicity.',
      },
      {
        heading: 'When Next.js is overkill',
        body: 'We have talked clients out of Next.js when all they needed was a 5-page brochure site. If you do not need dynamic routing, API routes, or server rendering, a simpler static site generator like Astro or even plain HTML with Tailwind will be faster to build, cheaper to host, and easier to maintain. We built our travels portal as a static site for exactly this reason.',
      },
      {
        heading: 'The performance numbers that matter',
        body: 'We tracked Core Web Vitals across our client sites after migrating to Next.js. Average LCP dropped from 3.8s to 1.2s. First Input Delay went from 180ms to 40ms. These are not vanity metrics - Google uses them directly in ranking, and users bounce after 3 seconds of waiting. The migration paid for itself in organic traffic within 6 months for most clients.',
      },
      {
        heading: 'Our honest recommendation',
        body: 'Use Next.js if you need SEO performance, dynamic content, or a React-based team. Use something simpler if you just need a fast static site. Use WordPress if you need a non-technical team to manage content daily. The right tool is the one your team can actually maintain, not the one with the most GitHub stars.',
      },
    ],
  },
  {
    slug: 'common-mistakes-small-business-websites',
    title: '7 Website Mistakes We See Small Businesses Make (And How to Fix Them)',
    excerpt: 'After auditing 100+ small business websites, these are the same problems that keep showing up. Most are fixable in a weekend.',
    category: 'Business',
    date: '2026-08-14',
    readTime: '6 min read',
    author: authors.shubham,
    content: [
      {
        heading: '1. No clear call to action on the homepage',
        body: 'The most common mistake we see: a beautiful homepage that never tells the visitor what to do next. Every page needs one primary action - call us, fill the form, book a demo, buy now. If visitors have to guess what you want them to do, most will just leave. We add a single prominent CTA above the fold on every client homepage.',
      },
      {
        heading: '2. Slow mobile experience',
        body: 'Over 60% of web traffic is mobile. If your site takes more than 3 seconds to load on a phone, you are losing more than half your visitors. We run every client site through Google PageSpeed before launch and do not ship until mobile scores above 85. Common fixes: compress images, lazy load below-fold content, remove unused JavaScript.',
      },
      {
        heading: '3. Missing or incomplete Google Business Profile',
        body: 'Your Google Business Profile is often the first thing customers see. Yet half the small businesses we audit have no profile, or an incomplete one with no photos, no hours, and no reviews. Setting up a complete profile with photos, accurate hours, and a link to your website takes 30 minutes and directly impacts local search visibility.',
      },
      {
        heading: '4. No contact information above the fold',
        body: 'If someone is ready to buy and cannot find your phone number or email in 2 seconds, they will go to a competitor. We put phone, email, and address in the header of every site we build. It sounds obvious, but you would be surprised how many sites bury contact info three clicks deep.',
      },
      {
        heading: '5. Using stock photos everywhere',
        body: 'Generic stock photos scream I do not care enough to show you real work. Even a few photos of your actual office, team, or products build more trust than any stock image. We encourage clients to take 10-15 photos with their phone - imperfect real photos outperform perfect fake ones every time.',
      },
      {
        heading: '6. No blog or resources section',
        body: 'A blog is not optional for SEO. It is how Google learns what you know and what you offer. You do not need to post daily - one thoughtful article per month about your industry, answering real customer questions, is enough to build organic traffic over 6-12 months. This article you are reading is doing exactly that for us.',
      },
      {
        heading: '7. Not tracking anything',
        body: 'If you do not have Google Analytics and Search Console set up, you are flying blind. These free tools tell you which pages get traffic, what people search to find you, and where they drop off. We set up analytics for every client as part of launch. Data without action is useless, but action without data is just guessing.',
      },
    ],
  },
];
