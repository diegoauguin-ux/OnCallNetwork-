export type GuideSection = { h: string; p?: string[]; list?: string[] };
export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  readMins: number;
  intro: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  cta: "cv" | "apply";
};

export const GUIDES_UPDATED = "2026-10-26";

export const GUIDES: Guide[] = [
  {
    slug: "australian-hospitality-cv",
    title: "How to write an Australian hospitality CV",
    metaTitle: "Australian Hospitality CV: Structure, Examples and Mistakes",
    description:
      "How to write a hospitality CV for Australian employers: the right structure, what to include, what to cut, and the mistakes that get CVs ignored.",
    keywords: ["australian hospitality cv", "hospitality resume australia", "bartender cv australia", "waiter cv australia", "cv template australia"],
    readMins: 5,
    intro:
      "Australian venue managers read CVs fast, usually between shifts. A good hospitality CV is short, specific and easy to scan. Here is the structure that works, and what to leave out.",
    sections: [
      {
        h: "Keep it to one or two pages",
        p: ["One page is enough if you have under five years of experience. Two pages is the limit for anyone else. Managers will not read a third page."],
      },
      {
        h: "Use this order",
        list: [
          "Name, phone, email, suburb. No photo, date of birth or marital status.",
          "Two-line summary: your role, years of experience and the type of venue you work best in.",
          "Licences and certificates: RSA, RCG, Food Safety, First Aid. Put these near the top, because they decide whether you can be rostered.",
          "Work rights: one line, for example 'Full work rights in Australia' or the visa type and any hours limit that applies to you.",
          "Experience, newest first: venue, role, dates, and three to five bullet points.",
          "Availability: days and times you can work.",
          "References: two recent venue managers, or 'Available on request'.",
        ],
      },
      {
        h: "Write bullets that show results",
        p: ["Replace duties with outcomes a manager can picture. 'Served customers' tells them nothing. These tell them a lot:"],
        list: [
          "Ran bar service for 120-seat venue on Friday and Saturday nights",
          "Trained four new staff on the POS and cocktail menu",
          "Handled cash-up and closing alone, with no discrepancies",
          "Kept service speed during a sold-out event for 800 guests",
        ],
      },
      {
        h: "Mistakes that get a CV ignored",
        list: [
          "Missing RSA or RCG when the job needs it",
          "Gaps in dates with no explanation",
          "A long list of skills with no examples",
          "Overseas job titles that Australian managers will not recognise, with no short explanation",
          "Typos. In hospitality they read as carelessness",
        ],
      },
      {
        h: "Overseas experience",
        p: ["Keep overseas roles, but translate them. Name the type of venue and its size, and describe what you did in plain terms. A manager in Sydney should understand your level in a few seconds."],
      },
    ],
    faq: [
      { q: "Should I put a photo on my CV in Australia?", a: "No. Australian employers do not expect a photo, and leaving it out is standard." },
      { q: "How long should a hospitality CV be?", a: "One page for under five years of experience, two pages at most for senior or longer careers." },
      { q: "What should I put first on a hospitality CV?", a: "Your contact details, a short summary, and your licences such as RSA and RCG, because they decide whether you can work the role." },
    ],
    cta: "cv",
  },
  {
    slug: "hospitality-cover-letter-australia",
    title: "How to write a hospitality cover letter in Australia",
    metaTitle: "Hospitality Cover Letter Australia: Format and Template",
    description:
      "A short, practical guide to writing a hospitality cover letter for Australian venues: what to say, how long it should be, and a simple template.",
    keywords: ["hospitality cover letter australia", "bartender cover letter", "cover letter for cafe job australia", "cover letter template hospitality"],
    readMins: 4,
    intro:
      "A cover letter for hospitality should be short. Three small paragraphs, written for the specific venue, beat a long generic letter every time.",
    sections: [
      {
        h: "Keep it under 200 words",
        p: ["Managers skim. If the letter fits on a phone screen without scrolling, it will get read."],
      },
      {
        h: "The three-paragraph structure",
        list: [
          "Paragraph 1: the role you are applying for, where you saw it, and one sentence on why this venue.",
          "Paragraph 2: your two strongest, most relevant points. Experience in a similar venue, a licence, or a result you delivered.",
          "Paragraph 3: your availability, your work rights, and a clear next step such as a trial shift.",
        ],
      },
      {
        h: "A simple template",
        p: [
          "Hi [Manager name], I'm applying for the [role] position at [venue]. I've worked as a [role] for [X years] at [type of venue] and I like the way [venue] focuses on [something specific you noticed].",
          "In my last role I [specific result or responsibility]. I hold my NSW RSA [and RCG], and I'm comfortable working [nights / weekends / early starts].",
          "I'm available [days], have [work rights statement], and would be glad to do a trial shift. My phone is [number]. Thanks for your time, [Name].",
        ],
      },
      {
        h: "Make it specific to the venue",
        p: ["Mention one real detail: the menu style, the neighbourhood, a busy-night format. It shows you looked, and it is what separates you from the pile."],
      },
      {
        h: "What to leave out",
        list: ["Your life story", "Apologies for lack of experience", "Salary demands", "Buzzwords with no example behind them"],
      },
    ],
    faq: [
      { q: "Do I need a cover letter for a bar or cafe job?", a: "It is not always required, but a short, specific one often gets your CV read first, especially when the job ad asks for one." },
      { q: "How long should a hospitality cover letter be?", a: "Under 200 words, in three short paragraphs." },
    ],
    cta: "cv",
  },
  {
    slug: "hospitality-interview-questions-australia",
    title: "Hospitality interview questions and how to answer them",
    metaTitle: "Hospitality Interview Questions and Answers (Australia)",
    description:
      "The questions Australian venue managers actually ask in hospitality interviews, with practical tips on how to answer each one.",
    keywords: ["hospitality interview questions australia", "bartender interview questions", "waiter interview tips", "interview tips hospitality"],
    readMins: 6,
    intro:
      "Hospitality interviews are usually short and practical. Managers want to know three things: will you turn up, can you handle pressure, and will you be good with customers and the team.",
    sections: [
      {
        h: "1. Tell me about yourself",
        p: ["Give a 30-second answer: your role, your experience, and why this venue. Do not recite your whole CV."],
      },
      {
        h: "2. Why do you want to work here?",
        p: ["Name something specific about the venue: the menu, the style of service, the location. Generic answers like 'I need a job' lose the room."],
      },
      {
        h: "3. Tell me about a difficult customer",
        p: ["Use a simple structure: the situation, what you did, the result. Stay calm in the story. Show that you listened, fixed the problem or brought in a manager, and kept the customer."],
      },
      {
        h: "4. What do you do when it gets very busy?",
        p: ["Talk about prioritising, communicating with the team, and staying calm. A real example from a busy Friday night is better than any theory."],
      },
      {
        h: "5. How do you handle a no-show or running late?",
        p: ["Managers are really asking about reliability. Say you give as much notice as possible, and describe how you make sure it is rare."],
      },
      {
        h: "6. What is your availability?",
        p: ["Be honest and specific, and say if you can work weekends and nights. If you have a visa hours limit, mention it clearly and early."],
      },
      {
        h: "7. Responsible service of alcohol",
        p: ["If the role serves alcohol, you may be asked what you would do when a customer looks intoxicated. Show that you know your RSA obligations: refuse service politely, involve a manager, and never serve to minors."],
      },
      {
        h: "Before you walk in",
        list: [
          "Visit the venue as a customer, or look at the menu online",
          "Bring your RSA and RCG certificates, and ID",
          "Arrive ten minutes early and dress for the venue",
          "Prepare two questions, such as the roster pattern and training",
          "Offer to do a trial shift",
        ],
      },
    ],
    faq: [
      { q: "What are common hospitality interview questions in Australia?", a: "Why this venue, a difficult customer, working under pressure, reliability and availability, and responsible service of alcohol." },
      { q: "Should I offer a trial shift?", a: "Yes. Many venues use trial shifts, and offering one shows confidence." },
    ],
    cta: "apply",
  },
  {
    slug: "how-to-get-a-hospitality-job-in-sydney",
    title: "How to get a hospitality job in Sydney",
    metaTitle: "How to Get a Hospitality Job in Sydney: A Practical Guide",
    description:
      "A step-by-step guide to finding hospitality work in Sydney: licences, CV, where to look, how to apply in person, and how to turn a trial shift into a job.",
    keywords: ["hospitality jobs sydney", "bar jobs sydney", "how to get a job in a bar sydney", "cafe jobs sydney", "casual hospitality work sydney"],
    readMins: 6,
    intro:
      "Hospitality is one of the fastest ways to find work in Sydney, if you prepare properly. These are the steps that make the biggest difference.",
    sections: [
      {
        h: "1. Get your licences first",
        p: ["In NSW you need an RSA to serve alcohol, and an RCG for gaming areas. Many venues will not interview you without them. Complete the courses with a government-approved provider and keep the certificates ready."],
      },
      {
        h: "2. Fix your CV",
        p: ["One or two pages, licences near the top, and results in your bullet points. See our guide on the Australian hospitality CV."],
      },
      {
        h: "3. Choose your area, not just your job",
        p: ["Travel time matters. Pick two or three areas you can reach easily, such as the Inner West, the CBD, the Eastern Suburbs or the North Shore, and focus there. Reliable staff who live nearby are valued."],
      },
      {
        h: "4. Apply in more than one way",
        list: [
          "Online job boards and venue websites",
          "Walking in with a printed CV, ideally between lunch and dinner service when it is quiet",
          "Staffing agencies and introduction services like OCN",
          "Asking people you know in the industry. Many jobs are never posted",
        ],
      },
      {
        h: "5. Say yes to trial shifts",
        p: ["A trial shift is how most venues hire. Arrive early, be clean and ready, ask questions, and look for work before you are asked. Managers remember the person who never needed to be told twice."],
      },
      {
        h: "6. Be reliable, then ask for more",
        p: ["Turn up on time, give notice if you cannot make a shift, and say yes to extra hours when you can. Reliability is the main reason casuals become regulars, then permanent staff."],
      },
      {
        h: "Working on a visa",
        p: ["If you are on a visa with work limits, check your conditions before you accept hours, and tell the venue honestly what you are able to work."],
      },
    ],
    faq: [
      { q: "Do I need an RSA to work in a bar in Sydney?", a: "Yes. In NSW you need a current RSA to serve alcohol, and many venues ask for it before an interview." },
      { q: "Is it better to apply online or in person?", a: "Do both. Walking in with a CV during a quiet period often works well in hospitality." },
    ],
    cta: "apply",
  },
  {
    slug: "rsa-and-rcg-nsw-hospitality",
    title: "RSA and RCG in NSW: what hospitality workers need",
    metaTitle: "RSA and RCG in NSW: What You Need to Work in Hospitality",
    description:
      "A plain-English explainer on the RSA and RCG certificates in NSW: what they are, who needs them, and how they help you get hired.",
    keywords: ["rsa nsw", "rcg nsw", "rsa certificate sydney", "do i need rsa to work in a cafe", "responsible service of alcohol nsw"],
    readMins: 3,
    intro:
      "Two certificates open most doors in NSW hospitality: the RSA and the RCG. Here is what they are and why venues ask for them.",
    sections: [
      {
        h: "What is the RSA?",
        p: ["RSA stands for Responsible Service of Alcohol. In NSW you need a current RSA certificate to serve alcohol, and to work in many roles where alcohol is sold or supplied, such as bars, restaurants, pubs and clubs."],
      },
      {
        h: "What is the RCG?",
        p: ["RCG stands for Responsible Conduct of Gambling. It is required for staff who work in gaming areas, for example with poker machines, keno or TAB services. Many pubs and clubs expect staff to hold both."],
      },
      {
        h: "Why do venues ask for them first?",
        p: ["A venue can face serious penalties if it uses staff without the right certificates. That makes you much easier to roster if you already hold them, so they are often the first thing a manager checks."],
      },
      {
        h: "How to get them",
        list: [
          "Choose a provider approved by the NSW Government",
          "Complete the course, which is commonly offered online or in person",
          "Keep a digital and printed copy of your certificate",
          "Put it near the top of your CV",
        ],
      },
      {
        h: "Always check the current rules",
        p: ["Requirements and course providers can change. Confirm the latest details with Liquor & Gaming NSW before you enrol."],
      },
    ],
    faq: [
      { q: "Do I need an RSA to work in a cafe?", a: "Only if alcohol is served. Many cafes do not serve alcohol, but holding an RSA still widens the jobs you can apply for." },
      { q: "What is the difference between RSA and RCG?", a: "The RSA covers serving alcohol responsibly. The RCG covers working in gaming areas, such as poker machines." },
    ],
    cta: "apply",
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
