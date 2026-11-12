/* Swisscard case study: every word, fact and screenshot of the case study.
   Templates in js/templates/case-study.js turn it into the page; js/content-guide.md lists the block types. */
"use strict";

CASE_CONTENT.swisscard = {
  name: "Swisscard",
  kicker: "FinTech · Mobile banking · iOS",
  title:
    "Shaping a user-friendly mobile flow that helps customers handle sensitive actions on their own with digital cards",
  facts: [
    ["Company", "Swisscard"],
    ["Product", "Swisscard iOS app"],
    [
      "Responsibilities",
      "End-to-end design, from multi-source research to release, leading communication with iOS engineers",
    ],
    ["Team", "Product managers, iOS engineers, researchers"],
    ["Tools", "Figma, Miro"],
  ],
  summary: {
    text: "Swisscard customers were calling support for tasks the app should let them do themselves, like locking a card or finding security settings. I analysed **200+ App Store reviews and 80 survey responses**, restructured the app's information architecture around users' mental models, validated it with moderated usability testing and shipped a release with **clearer navigation, more discoverable security features and simpler account management**.",
    results: [
      ["280+", "pieces of user feedback analysed"],
      ["4", "critical tasks validated in moderated testing"],
      ["Released", "with fewer reported usability issues"],
    ],
    blocks: [
      {
        shots: [
          {
            img: "assets/sw-showcase.webp",
            alt: "key screens of the redesigned Swisscard app",
            label: "The result",
            text: "Key screens of the released app: replace card, show PIN, 3-D Secure, statements and the card home.",
            wide: true,
            ratio: "4096/1661",
          },
        ],
        layout: "board",
      },
    ],
  },
  sections: [
    {
      id: "sw-problem",
      nav: "Problem",
      eyebrow: "Problem",
      title: "Customers called support for tasks the app already supported",
      blocks: [
        "Customers regularly got stuck on critical actions such as **blocking a card, updating personal information and managing security settings**. Many ended up calling customer service, even though the app already supported these tasks.",
        {
          subheading: "What the data said",
        },
        {
          stats: [
            ["200+", "App Store reviews analysed"],
            ["80", "survey responses analysed"],
            ["36%", "of complaints were about finding security settings"],
            ["Top 3", "support topic: card lock / unlock"],
          ],
        },
        {
          subheading: "Business challenge",
        },
        {
          statement:
            "Reduce support dependency and increase user confidence in sensitive card actions, while staying consistent with Swisscard's design system, brand and business logic.",
        },
        {
          subheading: "How might we",
        },
        {
          hmw: "How might we make customers confident enough to handle sensitive card actions in the app, without calling support?",
        },
      ],
    },
    {
      id: "sw-impact",
      nav: "Impact",
      eyebrow: "Impact",
      title: "Clearer, more confident self-service for sensitive card actions",
      blocks: [
        {
          impact: [
            [
              "Released to customers.",
              "The redesigned app shipped with clearer navigation and simpler account management flows.",
            ],
            [
              "Security features made discoverable.",
              "The most-complained-about area became easier to find and use.",
            ],
            ["Improved satisfaction.", "Post-release feedback showed higher user satisfaction."],
            [
              "Fewer usability issues.",
              "Fewer reported problems with core card management tasks after release.",
            ],
          ],
        },
      ],
    },
    {
      id: "sw-process",
      nav: "Process",
      eyebrow: "Process",
      title: "From 200+ reviews to a tested, shipped redesign",
      blocks: [
        {
          flow: ["Gather insights", "Structure", "Design", "Test", "Iterate", "Deliver"],
        },
        {
          step: {
            title: "Gather insights",
            body: [
              "I combined App Store reviews, internal satisfaction surveys, support tickets and behavioural insights from product owners, managers and engineers, plus a look at how competitors handle similar flows.",
              {
                list: [
                  "Navigation structure didn't match how users looked for things",
                  "Key features, especially security settings, were hard to discover",
                  "Terminology was unclear",
                ],
              },
            ],
          },
        },
        {
          step: {
            title: "Structure",
            body: [
              "In collaborative workshops we clustered feedback into themes, used **card sorting** to regroup features around users' mental models, mapped journeys for key tasks and prioritised by frequency, risk level and user impact. Each problem became a testable hypothesis:",
              {
                cards: [
                  ["Problem", "Users fail to locate lock / unlock within 30 seconds."],
                  [
                    "Hypothesis",
                    'Moving "Card account details" to the primary card view will reduce search time.',
                  ],
                  [
                    "Change",
                    "Restructured the information architecture and surfaced controls on the main screen.",
                  ],
                ],
              },
            ],
          },
        },
        {
          step: {
            title: "Design",
            body: [
              "I designed new navigation patterns and task flows in Figma, using Swisscard's design system (which I'd helped build) and Apple's Human Interface Guidelines, then built interactive prototypes covering several test scenarios.",
            ],
          },
        },
        {
          step: {
            title: "Test",
            body: [
              "We ran moderated online usability sessions with think-aloud, reassuring participants that we were testing the system, not them. Findings went into a Miro board with light demographic context, sorted into issues and successes.",
              {
                mini: "Tasks tested",
              },
              {
                chips: [
                  "Find card lock / unlock",
                  "Update address",
                  "Change PIN",
                  "Add / remove cardholders",
                ],
              },
            ],
          },
        },
        {
          step: {
            title: "Iterate",
            body: [
              "Testing pointed to a focused set of refinements. Each iteration was measured against the original goals using **task success, time-on-task and user confidence**.",
            ],
          },
        },
        {
          step: {
            title: "Deliver",
            body: [
              "I led communication with the iOS engineers throughout development to protect feasibility and quality, following Apple platform standards and **WCAG accessibility principles**.",
            ],
          },
        },
      ],
    },
    {
      id: "sw-decisions",
      nav: "Core decisions",
      eyebrow: "Core decisions",
      title: "Key changes that made sensitive actions easy to find",
      blocks: [
        {
          lead: "A selection of the changes from the redesign, focused on the actions customers struggled with most.",
        },
        {
          decision: {
            tag: "Information architecture",
            title: "Regroup features around users' mental models",
            text: "36% of complaints were about finding security settings, so the problem was structure, not individual screens.",
            before: "Features grouped in ways users didn't expect; security settings hard to locate.",
            after: "Features reorganised into logical groups based on card sorting and journey mapping.",
            body: [
              {
                phones: [
                  {
                    img: "assets/sw-statements.webp",
                    alt: "Statements screen grouped by year",
                    label: "Statements",
                    text: "Statements grouped by year, with settings one tap away at the top. Easy to scan, nothing hidden.",
                    ratio: "1739/3177",
                  },
                ],
                single: true,
              },
            ],
          },
        },
        {
          decision: {
            tag: "Card controls",
            title: "Put card controls on the main card view",
            text: "Card lock / unlock was one of the top 3 support topics. Surfacing it where users already look was the most direct fix.",
            before: "Users couldn't find lock / unlock within 30 seconds.",
            after: '"Card account details" moved to the primary card view, with controls on the main screen.',
            body: [
              {
                phones: [
                  {
                    img: "assets/sw-home.webp",
                    alt: "Card home with balance and card account details",
                    label: "Card home",
                    text: 'The card home: balance, available limit and pending amounts at a glance, with "Card account details" right on the main view.',
                    ratio: "1739/3177",
                  },
                ],
                single: true,
              },
            ],
          },
        },
        {
          decision: {
            tag: "Design system",
            title: "Standardise patterns across every flow",
            text: "Building on a shared design system let me design faster and keep sensitive flows predictable.",
            before: "Visual inconsistency between flows made actions harder to recognise.",
            after:
              "Standard patterns for faster recognition of actions and improved accessibility compliance.",
          },
        },
        {
          decision: {
            tag: "Sensitive actions",
            title: "Make every critical action clear and confirmed",
            text: "Usability testing showed where labels and feedback still caused hesitation on sensitive actions.",
            before: "Unclear terminology and feedback around critical actions.",
            after:
              "Clearer labels, better feature visibility, simpler flows and clearer system feedback. *Refined after usability testing.*",
            body: [
              {
                phones: [
                  {
                    img: "assets/sw-replace.webp",
                    alt: "Replace card: verify address",
                    label: "Replace card",
                    text: "Verify the address before a new card is sent, with a clear note on who can change it.",
                    ratio: "1739/3177",
                  },
                  {
                    img: "assets/sw-pin.webp",
                    alt: "Show PIN code screen",
                    label: "Show PIN",
                    text: "The PIN stays hidden until the user chooses to reveal it.",
                    ratio: "1739/3177",
                  },
                  {
                    img: "assets/sw-3ds.webp",
                    alt: "3-D Secure transaction confirmation",
                    label: "3-D Secure",
                    text: "Merchant, amount, card and date shown before the user confirms or declines.",
                    ratio: "1739/3177",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "sw-outcomes",
      nav: "Outcomes",
      eyebrow: "Outcomes",
      title: "A released app with more confident, independent customers",
      blocks: [
        "The redesigned app was **successfully released**. Post-release feedback showed **improved user satisfaction** and **fewer reported usability issues** around core card management tasks.",
        {
          metrics: [
            ["280+", "pieces of user feedback analysed (reviews and surveys)"],
            ["4", "critical tasks validated in moderated testing"],
          ],
        },
        {
          quote:
            "Structured research, collaborative design and continuous validation build trust and usability in financial mobile experiences.",
        },
      ],
    },
  ],
};
