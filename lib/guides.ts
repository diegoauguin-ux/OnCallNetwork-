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
    metaTitle: "Australian Hospitality CV: Structure and Mistakes",
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
    metaTitle: "Hospitality Cover Letter Australia: Template",
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
    metaTitle: "Hospitality Interview Questions and Answers",
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
          "Offer to do a short trial shift",
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
    metaTitle: "How to Get a Hospitality Job in Sydney",
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
        p: ["A trial shift is how many venues hire. Arrive early, be clean and ready, ask questions, and look for work before you are asked. Managers remember the person who never needed to be told twice. Trials should be short, and if you are doing real work for the business you should be paid, so ask the venue and check the Fair Work Ombudsman website."],
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
    metaTitle: "RSA and RCG in NSW: What You Need to Work",
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
        p: ["RCG stands for Responsible Conduct of Gambling. It is generally required for staff who work in gaming areas, for example around poker machines. Many pubs and clubs expect staff to hold both, so check the venue's requirements."],
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
  {
    slug: "hospitality-cv-no-experience-australia",
    title: "How to write a hospitality CV with no Australian experience",
    metaTitle: "Hospitality CV With No Australian Experience",
    description:
      "No local experience? How to build a hospitality CV that Australian venues will read, and how to describe overseas work.",
    keywords: ["hospitality cv no experience australia", "first job australia cv", "backpacker cv australia", "international student cv hospitality", "cv overseas experience australia"],
    readMins: 5,
    intro:
      "Most Australian venues hire on attitude, availability and reliability. If you are new to the country or new to hospitality, your CV only has to prove those three things.",
    sections: [
      {
        h: "Start with what venues check first",
        list: [
          "Your RSA, and your RCG if the venue has gaming. If you do not have them yet, get them before you apply",
          "Your work rights, in one clear line, including any hours limit that applies to you",
          "Your availability, with the days and times you can really work",
          "Your suburb, so the venue knows you can get to work",
        ],
      },
      {
        h: "Use a short summary instead of an objective",
        p: ["Two lines are enough. Say who you are, what you are looking for and when you can start. For example: 'Reliable, friendly front-of-house candidate with customer service experience, available weekends and evenings, RSA completed, looking for a bar or waitstaff role in the Inner West.'"],
      },
      {
        h: "Turn other experience into hospitality skills",
        p: ["Retail, call centres, events, tutoring and volunteering all show skills that hospitality needs. Pick the parts that match the job:"],
        list: [
          "Serving customers face to face",
          "Handling cash and card payments",
          "Working under pressure at busy times",
          "Working in a team and following instructions",
          "Opening, closing and stock tasks",
        ],
      },
      {
        h: "Describe overseas jobs in plain terms",
        p: ["Keep the venue type, city and dates, and describe the work in simple words. 'Waiter, 80-seat restaurant, Santiago' is clearer than a title that Australian managers have never seen. Keep each job to two or three short bullets."],
      },
      {
        h: "What to leave out",
        list: ["A photo, age, marital status or passport details", "Long lists of skills with no examples", "Duties from jobs that have nothing to do with the role"],
      },
      {
        h: "Do these three things before you apply",
        list: [
          "Complete your RSA, and your RCG if you want pub or club work",
          "Save your CV as a PDF with a clear name, for example Firstname_Lastname_CV.pdf",
          "Ask one past manager or supervisor if they will be a reference",
        ],
      },
    ],
    faq: [
      { q: "Can I get a hospitality job in Australia with no experience?", a: "Yes. Many venues hire entry-level staff for roles such as kitchen hand, floor staff and barista assistant. Your RSA, availability and attitude matter more than a long work history." },
      { q: "Should I include overseas experience on my Australian CV?", a: "Yes, but describe it in plain terms with the venue type, city and dates so an Australian manager understands your level." },
    ],
    cta: "cv",
  },
  {
    slug: "hospitality-trial-shift-tips",
    title: "Hospitality trial shifts: what to expect and how to pass",
    metaTitle: "Hospitality Trial Shift Tips: How to Pass",
    description:
      "What happens in a hospitality trial shift in Australia, how to prepare, what managers look for, and what the rules say about unpaid trials.",
    keywords: ["hospitality trial shift", "trial shift australia", "trial shift tips bar", "paid trial shift australia", "cafe trial shift"],
    readMins: 4,
    intro:
      "A trial shift is how most venues decide who to hire. It is short, practical and judged on a few simple things. Here is how to make it count.",
    sections: [
      {
        h: "What managers are really watching",
        list: [
          "Do you arrive early and ready?",
          "Do you listen, then follow instructions without needing to be told twice?",
          "Do you look for the next task when it is quiet?",
          "Are you calm and polite with customers and the team?",
          "Do you ask good questions instead of guessing?",
        ],
      },
      {
        h: "Before the shift",
        list: [
          "Confirm the time, address, who to ask for and what to wear",
          "Bring your RSA and RCG, ID and any work rights details",
          "Look at the menu and learn the basics, especially drinks or coffee styles",
          "Wear clean, closed, non-slip shoes",
          "Arrive ten minutes early",
        ],
      },
      {
        h: "During the shift",
        list: [
          "Introduce yourself to the team and write down names",
          "Ask what the priorities are, then work through them",
          "Say so if you do not know something, then learn it fast",
          "Keep your phone away",
          "Stay until you are told you can leave, and thank the manager",
        ],
      },
      {
        h: "Are trial shifts paid?",
        p: ["Fair Work Australia says an unpaid trial is only acceptable when it is short and only for the employer to see your skills. If you are doing real work that benefits the business, you should be paid. If you are unsure, ask the venue before you go, and check the Fair Work Ombudsman website."],
      },
      {
        h: "After the shift",
        p: ["Send a short message the same day to thank the manager and say you would like the role. Many managers decide on who follows up."],
      },
    ],
    faq: [
      { q: "How long is a hospitality trial shift?", a: "Usually a few hours. Longer or repeated trials should be paid, so ask the venue about payment before you go." },
      { q: "What should I wear to a trial shift?", a: "Clean, simple clothes in the venue's style, usually black, with closed non-slip shoes. Ask the manager if you are not sure." },
    ],
    cta: "apply",
  },
  {
    slug: "hospitality-references-australia",
    title: "Hospitality references in Australia: who to ask and how",
    metaTitle: "Hospitality References in Australia",
    description:
      "How to choose and prepare hospitality references for Australian employers, including what to do if your past managers are overseas.",
    keywords: ["hospitality references australia", "reference check hospitality", "how to get a reference from old boss", "overseas references australia", "who to use as a reference"],
    readMins: 4,
    intro:
      "Venues often call references before they offer a shift. A good reference can win you the job, and a missing one can slow everything down.",
    sections: [
      {
        h: "Who makes a good reference",
        list: [
          "A recent manager or supervisor who saw your work, ideally in hospitality",
          "Two people is the normal number",
          "Someone who will answer the phone or reply to an email quickly",
        ],
      },
      {
        h: "How to ask",
        p: ["Ask first. Say what job you are applying for and why you would like them to speak for you. Then send their name, phone and email to the venue only after they agree."],
      },
      {
        h: "Prepare your referee",
        list: [
          "Send them your CV and the role you are applying for",
          "Remind them of your dates, role and a result you were proud of",
          "Tell them when the venue may call, and how long the call is likely to take",
        ],
      },
      {
        h: "What recruiters usually ask",
        list: [
          "Were you reliable and on time?",
          "How did you handle pressure and difficult customers?",
          "How did you work with the team?",
          "Would you rehire this person?",
        ],
      },
      {
        h: "If your past managers are overseas",
        p: ["Use an email reference or a short message app call, and put the time zone next to the contact details. If that is hard, a supervisor, a colleague who managed you, or a teacher can help. Tell the venue about the situation early."],
      },
      {
        h: "On your CV",
        p: ["Write the name, role, company, phone and email for each referee, or write 'Available on request' and have the details ready."],
      },
    ],
    faq: [
      { q: "How many references do I need for a hospitality job?", a: "Usually two, preferably recent managers or supervisors." },
      { q: "Can I use a friend as a reference?", a: "A work or study reference is far stronger. Use a friend only if the venue accepts it and there is no better option." },
    ],
    cta: "cv",
  },
  {
    slug: "student-visa-work-hours-hospitality",
    title: "Student visa work hours and hospitality jobs in Australia",
    metaTitle: "Student Visa Work Hours for Hospitality Jobs",
    description:
      "How the student visa work limit applies to hospitality shifts in Australia and how to track your hours. Confirm current rules with Home Affairs.",
    keywords: ["student visa work hours australia", "48 hours per fortnight hospitality", "international student hospitality job", "work limit student visa", "student visa casual job"],
    readMins: 4,
    intro:
      "Hospitality is a popular job for international students, and the work limit on your visa is part of every roster decision. Here is how to handle it simply. Rules can change, so always confirm with the Department of Home Affairs.",
    sections: [
      {
        h: "The basic rule",
        p: ["As of our last check, most student visa holders can work up to 48 hours per fortnight while their course is in session. Outside of scheduled course breaks, the limit does not apply in the same way. Check your visa conditions on VEVO and on the Home Affairs website, because your own situation may be different."],
      },
      {
        h: "How a fortnight works",
        p: ["The limit is counted over fortnights, not weeks. A busy week followed by a quiet week can be fine, but two busy weeks can put you over. Keep a simple record of every shift."],
      },
      {
        h: "Track your hours",
        list: [
          "Write down each shift as soon as you finish it",
          "Count all paid work across every job you hold",
          "Check your total at the end of each week before saying yes to extra shifts",
          "Keep payslips and rosters as a record",
        ],
      },
      {
        h: "Tell the venue on day one",
        p: ["Be clear about your limit when you apply. Managers value a person who says 'I can work up to this many hours a fortnight' more than someone who finds out later. It also protects you and the venue."],
      },
      {
        h: "Why it matters",
        p: ["Working over your limit can put your visa at risk. If you are unsure, do not guess: ask your education provider or a registered migration agent."],
      },
      {
        h: "Your CV",
        p: ["Write your visa type and your hours in one short line near the top, for example 'Student visa, available up to 24 hours per week, evenings and weekends'. It saves time for everyone."],
      },
    ],
    faq: [
      { q: "How many hours can a student visa holder work in hospitality?", a: "As of our last check, up to 48 hours per fortnight during course sessions, with different rules during scheduled breaks. Confirm the current rules with Home Affairs." },
      { q: "Do all my jobs count toward the limit?", a: "Yes. Paid work across all employers counts toward your total." },
    ],
    cta: "apply",
  },
  {
    slug: "casual-vs-permanent-hospitality-australia",
    title: "Casual or permanent hospitality work: which is right for you?",
    metaTitle: "Casual vs Permanent Hospitality Work in Australia",
    description:
      "A plain-English comparison of casual and permanent hospitality jobs in Australia: pay, hours, leave and how to move to permanent.",
    keywords: ["casual vs permanent hospitality", "casual loading hospitality australia", "casual employment australia", "permanent hospitality job sydney", "casual conversion"],
    readMins: 4,
    intro:
      "Hospitality offers both casual and permanent work. Neither is better for everyone. This guide explains the practical differences so you can choose.",
    sections: [
      {
        h: "Casual work",
        list: [
          "Hours can change from week to week",
          "Casual employees are generally paid a loading on top of the base rate, 25% under the Hospitality Industry (General) Award 2020",
          "No paid annual or sick leave in the usual way",
          "You can often say yes or no to shifts",
        ],
      },
      {
        h: "Permanent work (full time or part time)",
        list: [
          "More regular hours and a more predictable income",
          "Paid leave, such as annual and personal leave",
          "Longer notice periods when the job ends",
          "Less flexibility, because the roster is part of the job",
        ],
      },
      {
        h: "Which suits whom",
        list: [
          "Casual suits students, people who need flexibility, and people trying different venues",
          "Permanent suits people who want stable income, such as a mortgage or rent, and a clear path to a supervisor or manager role",
        ],
      },
      {
        h: "Can casual turn into permanent?",
        p: ["Often yes. Venues like reliable casuals and many offer permanent roles to people who show up and do the job well. There are also rules about when long-term, regular casual staff can ask to move to permanent. Check the Fair Work Ombudsman website for the current rules."],
      },
      {
        h: "Check your own pay",
        p: ["Minimum rates depend on the award, your classification, your age and the hours you work. Use the Fair Work Ombudsman pay calculator, and compare it with your payslip."],
      },
    ],
    faq: [
      { q: "How much is the casual loading in hospitality?", a: "25% on top of the base rate under the Hospitality Industry (General) Award 2020. Check the current award for your classification." },
      { q: "Do casual hospitality workers get paid leave?", a: "Casual employees are generally not paid for annual or sick leave in the same way as permanent staff, because the loading is meant to compensate for that." },
    ],
    cta: "apply",
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
