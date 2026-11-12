/*
 * All the words on the site, apart from the case studies (those live in js/cases/).
 * Edit text here; index.html and the code in js/ only hold structure and behaviour.
 *
 * Text formatting you can use in any string:
 *   **bold**   *italic*   [link text](https://…)   ==highlight==   a line break with \n
 * {name}-style placeholders are filled in by the code (for example the case-study name).
 * See js/content-guide.md for more.
 */
"use strict";

const SITE = {
  /* the page heading for screen readers and search engines */
  heading: "Emilija Stojmenovska — Senior Product Designer portfolio",

  brand: { label: "emche design, back to top", first: "emche", second: "design" },

  theme: {
    day: "Day",
    night: "Night",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    bubbleToLight: "Lights on ☀️",
    bubbleToDark: "Lights off 🌙",
  },

  filters: {
    label: "Filter projects",
    all: "All",
    about: "About",
    work: "Work",
    testimonials: "Testimonials",
    announce: "{filter} selected, {shown} of {total} tiles shown first",
  },

  /* ---- grid tiles ---- */
  tiles: {
    gridLabel: "Portfolio tiles",
    reordered: "Tile reordered",
    open: "Open {label}",
    intro: {
      label: "Intro card",
      bubble: "About me 👋",
      action: "Open About me",
      photoAlt: "Photo of Emilija",
      greeting: "Hey, I am ==Emilija==",
      text: "Senior Product Designer with 10 years of shaping complex B2B commerce, FinTech and SaaS products into clear, useful experiences.",
    },
    work: {
      label: "Work history",
      bubble: "View my work history 💼",
      action: "Open my work history",
      imageAlt: "Pixel illustration of a designer girl with a pencil and tablet",
      title: "Work history",
      years: "10 years",
    },
    email: {
      label: "Email",
      bubble: "Copy my email 📩",
      copy: "Copy email address",
      copied: "Copied email",
      bubbleCopied: "Copied ✓",
      announce: "Email address copied to clipboard",
    },
    linkedin: {
      label: "LinkedIn",
      bubble: "Connect with me 🤝",
      action: "Open my LinkedIn profile in a new tab",
    },
    medium: {
      label: "Medium",
      bubble: "Read my articles ✍️",
      action: "Open my Medium articles in a new tab",
    },
    caseStudy: {
      label: "Case study: {name}",
      bubble: "Read the case study 📖",
      bubbleLocked: "Read the case study 🔒",
      locked: "Password protected",
      action: "Open the {name} case study",
      actionLocked: "Open the {name} case study, password protected",
    },
    testimonial: {
      label: "Testimonial from {name}",
      bubble: "Read the full testimonial 💬",
      action: "Read the full testimonial from {name}",
      heading: "Testimonial",
    },
    aiSystem: {
      label: "AI design system, coming soon",
      bubble: "Coming soon ✨",
      badge: "Coming soon",
      title: "AI design system",
    },
    speaking: {
      label: "Speaking",
      bubble: "See my talks 🎤",
      action: "Open my talks",
      title: "Talks and community",
      text: "I share what I learn with North Macedonia’s UX community, as a speaker and board member.",
      video: "▶ Video",
    },
  },

  /* ---- shared labels for every case study ---- */
  caseStudy: {
    dialog: "Case study",
    close: "Close",
    sections: "Case study sections",
    home: "Home",
    summary: "In short",
    resultsLabel: "Results at a glance",
    jumpLabel: "Jump to section",
    before: "Before",
    after: "After",
    live: "Live",
    signature: "Emilija Stojmenovska · Senior Product Designer",
    more: "More case studies",
    previous: "Previous case study",
    next: "Next case study",
    lockedSuffix: " · Password protected",
    modeLabel: "How to read this case study",
    modeFull: "Full case study",
    modeScan: "Quick scan",
    modeScanNote: "Screens, prototypes, role and impact only",
    readTime: "{min} min" /* estimated reading time shown on each reading-mode button */,
    readTimeLabel: "about {min} minute read",
    enlarge: "Click to expand 🔍",
    enlargeLabel: "Enlarge: {alt}" /* screen-reader label of each screenshot */,
  },

  lightbox: {
    label: "Enlarged screenshot",
    close: "Close",
    previous: "Previous screenshot",
    next: "Next screenshot",
  },

  /* ---- dialogs ---- */
  close: "Close",

  about: {
    kicker: "About me",
    title: "Hey, I am ==Emilija==",
    portraitAlt: "Portrait of Emilija",
    lede: "Senior Product Designer shaping complex digital products into clear, useful experiences.",
    paragraphs: [
      "I turn complex, information-heavy products into experiences people can use with confidence. Most of my work is in **B2B commerce, FinTech and EdTech**: ordering portals, payment platforms, banking apps and developer tools.",
      "I lead work end to end, from audits, interviews and usability testing, through information architecture and flows, to polished UI and design systems engineering can build on. Accessibility and clear terminology are part of every decision.",
      "My frontend development background helps me spot technical constraints early and work closely with engineers, so the best version of a design is also the one that ships.",
    ],
    contact: "Contact me",
    linkedin: "Connect on LinkedIn",
  },

  workHistory: {
    kicker: "Work history",
    title: "10 years designing complex products",
    lede: "End-to-end experiences for web and mobile across fintech, enterprise and SaaS, from research and information architecture to design systems that ship.",
    jobs: [
      {
        date: "Nov 2024 – Present",
        role: "Senior Product Designer",
        company: "WS Audiology",
        current: true,
        kind: "Enterprise B2B commerce",
        points: [
          "Lead UX and UI for complex enterprise workflows and data-heavy web apps, from customer feedback and analytics to shipped journeys.",
          "Simplify information architecture across connected product areas, validate with user testing and contribute patterns to the shared design system.",
        ],
      },
      {
        date: "Oct 2025 – Feb 2026",
        role: "Lead Product Designer",
        company: "NRTH",
        tag: "Freelance",
        kind: "FinTech startup · freelance project",
        points: [
          "Owned design end to end for a B2B fintech platform connecting companies with banking services, shipping payroll and expense management.",
          "Ran discovery workshops and rapid prototyping, and built a scalable Figma design system, using Claude and Figma Make to speed up exploration.",
        ],
      },
      {
        date: "Oct 2021 – Oct 2024",
        role: "Senior User Experience Designer",
        company: "Valtech",
        kind: "Agency · Clients incl. Signify, ASML",
        points: [
          "Designed SaaS dashboards, operational tools and enterprise platforms for international clients.",
          "Led UX research, heuristic evaluations and usability testing, and advocated for WCAG accessibility.",
        ],
      },
      {
        date: "Jan 2021 – Oct 2021",
        role: "Senior UX / Product Designer",
        company: "G+D Netcetera",
        kind: "FinTech · iOS",
        points: [
          "Designed native iOS banking experiences that make complex financial information simple and trustworthy.",
          "Applied Apple HIG and accessibility best practices, working closely with iOS engineers.",
        ],
      },
      {
        date: "Oct 2016 – Dec 2020",
        role: "UX Engineer",
        company: "G+D Netcetera",
        kind: "Design + frontend",
        points: [
          "Designed and built responsive web and mobile interfaces in HTML, CSS and JavaScript.",
          "Bridged design and engineering with interactive prototypes and reusable UI components.",
        ],
      },
    ],
    extras: [
      {
        title: "Community",
        text: "**Board member, UXplore Macedonia.** Organising the country's UX conferences, meetups and workshops. Speaker at the UXplore Conference 2026 (“How far can prototypes go?”) and the September 2024 UXplore Meetup.",
      },
      {
        title: "Education",
        text: "**BSc Computer Science and Engineering**, Ss. Cyril and Methodius University, Skopje, focused on human-computer interaction.\n**Academy for Web Design and Development**, SEAVUS Academies (scholarship for outstanding performance).",
      },
      {
        title: "Languages",
        text: "Macedonian (native) · English (proficient) · German (proficient) · Dutch (beginner)",
      },
    ],
    contact: "Contact me",
    linkedin: "Connect on LinkedIn",
  },

  talks: {
    kicker: "Speaking",
    title: "Talks and community",
    lede: "I’m a board member of [UXplore](https://uxplore.mk/), the community behind North Macedonia’s UX conferences, meetups and workshops. I speak at its events and **organise its conferences, bringing in speakers from companies including Apple, Meta, Google and Booking.com**.",
    listHeading: "Talks",
    photosHeading: "From the stage",
    /* small photos at the bottom of the talks page; click one to see it full size */
    gallery: [
      {
        img: "assets/ux-stage-wide.webp",
        alt: "Emilija presenting at the UXplore Conference 2026, with her slide on the big screen",
        caption: "Presenting “How far can prototypes go?” at the UXplore Conference 2026.",
      },
      {
        img: "assets/ux-armchair.webp",
        alt: "Emilija seated on stage with a headset microphone",
        caption: "On the conference stage.",
      },
      {
        img: "assets/ux-podium.webp",
        alt: "Emilija speaking at the UXplore podium",
        caption: "At the UXplore podium.",
      },
      {
        img: "assets/ux-conversation.webp",
        alt: "Emilija in conversation with the host on stage",
        caption: "In conversation with the host.",
      },
      {
        img: "assets/ux-group-2026.webp",
        alt: "Emilija with fellow speakers in front of the UXplore 2026 backdrop",
        caption: "With fellow speakers at the UXplore Conference 2026.",
      },
      {
        img: "assets/ux-team.webp",
        alt: "The UXplore team together on stage at a community event",
        caption: "With the UXplore team at a community event.",
      },
    ],
    watch: "Watch the talk on YouTube ↗",
    speakerPage: "My UXplore speaker page ↗",
  },

  testimonialDialog: { heading: "Testimonial" },

  prototype: {
    title: "CodeFu · Interactive prototype",
    hint: "Click the highlighted areas to move through the flow",
    open: "Open in Figma",
    loading: "Loading prototype…",
    blocked: "The prototype can't be shown inside this page.",
    blockedLink: "Open it in Figma ↗",
    frameTitle: "CodeFu interactive prototype",
  },

  password: {
    title: "This project is password protected",
    text: "Enter the password to view this case study.",
    field: "Password",
    placeholder: "Enter password",
    submit: "Unlock",
    submitLabel: "Unlock case study",
    error: "That password didn't work. Please try again.",
    ask: "Don't have the password?",
    askLink: "Email me for access",
  },

  footer: {
    thanks: "Thanks for stopping by",
    linksLabel: "Contact and profiles",
    email: "Email Emilija",
    linkedin: "LinkedIn (opens in a new tab)",
    medium: "Medium articles (opens in a new tab)",
    top: "Back to top",
    sign: "Designed & built by Emilija · 2026",
  },
};

/* ---- talks (newest first); shown on the Speaking tile and in its dialog ---- */
const TALKS = [
  {
    title: "How far can prototypes go?",
    event: "UXplore Conference 2026",
    kind: "Conference talk",
    date: "4 April 2026",
    place: "Hotel Limak, Skopje",
    language: "In Macedonian",
    langCode: "MK",
    summary:
      "A look at the prototyping process: using new AI tools to present designs quickly and convincingly, the role of prototypes in usability testing, and what makes a high-quality prototype hard to build.",
    url: "https://uxplore.mk/conference-2026/",
    urlLabel: "Conference agenda ↗",
  },
  {
    title: "Run your own usability study",
    event: "UXplore Meetup",
    kind: "Meetup talk",
    date: "25 September 2024",
    place: "Netaville, Skopje",
    language: "In Macedonian",
    langCode: "MK",
    summary:
      "How to run a usability study on an app yourself, focused on one factor you choose, to improve the product or solve real user problems.",
    url: "https://uxplore.mk/uxplore-meetup-09-2024/",
    urlLabel: "Meetup page ↗",
    video: "https://www.youtube.com/watch?v=AyvtemSMG9k",
  },
];

/* ---- testimonials, keyed by their grid tile ---- */
const TESTIMONIALS = {
  quoteA: {
    name: "Aleksandra Hristov",
    role: "UX Architect & Team leader · Netcetera",
    short:
      "Emilija grew from a junior to a senior UX designer and engineer who cares deeply about the overall user experience and the details.",
    full: "During the time we worked together, *Emilija grew from a junior to a senior UX designer and engineer* who cares deeply about the overall user experience and the details. She’s worked on design systems, user research, and UI design with great care, always learning and willing to grow. I’m confident she’ll bring the same level of thoughtfulness, ownership, and impact to any product team she joins.",
  },
  quoteA2: {
    name: "Angela Gjorsheska",
    role: "Product Designer · WSA via Inscale",
    short:
      "A strong Senior Product Designer who brings fresh ideas to the table and has a good instinct for spotting opportunities to improve a product.",
    full: "I really enjoyed working with Emilija. *She’s a strong Senior Product Designer who brings fresh ideas to the table* and has a good instinct for spotting opportunities to improve a product.\n\nShe’s particularly good at *working with complex workspaces, making sense of complicated requirements* and finding ways to make the experience clearer and more intuitive. She’s not afraid to question existing solutions or suggest a different approach when she sees an opportunity to make things better.\n\nEmilija is also someone who brings value to design discussions, looks at problems from different angles, and contributes ideas that help move the work forward. *I’d gladly work with her again* and recommend her to any team looking for an experienced designer who can handle complexity while keeping the user experience in focus.",
  },
  quoteB: {
    name: "Ekta G.",
    role: "Digital Product Owner, ShopXP · WSA",
    short:
      "She has a strong ability to understand the customer journey and approach UX decisions from the customer’s perspective, ensuring the overall experience remains intuitive and consistent.",
    full: "I’ve really enjoyed collaborating with Emilija. *She has a strong ability to understand the customer journey* and approach UX decisions from the customer’s perspective, ensuring the overall experience remains intuitive and consistent.\n\nShe also brings a good understanding of the historical context and past design decisions within our eCommerce system, which is particularly valuable when working on new enhancements and evolving existing experiences. I especially appreciate how *she brings multiple UX design options and perspectives to the table*, enabling meaningful discussions and helping us make well-informed decisions together.\n\nEmilija is *thoughtful, collaborative, and open to feedback*, making working with her both productive and enjoyable.",
  },
};
