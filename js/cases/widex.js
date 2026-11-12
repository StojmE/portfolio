/* Widex case study: every word, fact and screenshot of the case study.
   Templates in js/templates/case-study.js turn it into the page; js/content-guide.md lists the block types. */
"use strict";

CASE_CONTENT.widex = {
  name: "Widex",
  kicker: "B2B commerce · Healthcare · Information architecture",
  title:
    "Transforming a complex legacy ordering portal into clear self-service for hearing-care professionals",
  facts: [
    ["Company", "WS Audiology · Widex"],
    ["Product", "ShopXP / OneXP"],
    [
      "Responsibilities",
      "UX direction across key journeys, from investigation to validation, with Product, Engineering and Research",
    ],
    ["Tools", "Figma"],
  ],
  summary: {
    text: "ShopXP is the B2B portal where hearing-care professionals order and manage WS Audiology products. It worked, but years of UX debt made information hard to find and similar tasks behave differently. I led the UX direction across **stock ordering, custom ordering and warranty lookup**, grounded every decision in evidence, and turned usability findings from **5–10 participants into six concrete product changes**.",
    results: [
      ["3", "markets live: Finland, Norway and Spain"],
      ["3", "core journeys redesigned"],
      ["6", "usability findings turned into product changes"],
    ],
    blocks: [
      {
        shots: [
          {
            img: "assets/widex-before.webp",
            alt: "legacy ShopXP homepage",
            label: "Before",
            text: "The main dashboard page of the legacy portal, with dense navigation and little hierarchy.",
          },
          {
            img: "assets/widex-after.webp",
            alt: "redesigned ShopXP homepage live in production",
            label: "After",
            text: "The final result, live in production: addresses, product search, recent orders, training and downloads, and warranty lookup on one restructured dashboard.",
          },
        ],
      },
    ],
  },
  sections: [
    {
      id: "cs-problem",
      nav: "Problem",
      eyebrow: "Problem",
      title: "Years of UX debt made a working portal hard to use",
      blocks: [
        "When I joined, the portal was functional but had accumulated significant UX debt. Important information was difficult to find, some flows were unnecessarily complex, terminology didn't match what professionals expected, and **similar tasks behaved differently depending on the product**.",
        {
          subheading: "Stock ordering, before and after",
        },
        "Product information hierarchy was a core consideration in the redesign: what professionals need to compare, what can wait, and where each action belongs. These screens show the stock-ordering flow before and after.",
        {
          shots: [
            {
              img: "assets/stock-list-before.webp",
              alt: "Legacy stock-ordering product list",
              label: "Before · Product list",
              text: "Legacy product list: cards show only a name and colour count, so comparing means opening each product.",
            },
            {
              img: "assets/stock-list-after.webp",
              alt: "Redesigned stock-ordering product list",
              label: "After · Product list",
              text: "Redesigned list: a search field, filters for technology level and battery size, and cards that show the model code and number of colours at a glance.",
            },
            {
              img: "assets/stock-pdp-before.webp",
              alt: "Legacy product configurator",
              label: "Before · Configurator",
              text: "Legacy configurator: specs run together in one block and the structure is hard to scan.",
            },
            {
              img: "assets/stock-pdp-after.webp",
              alt: "Redesigned product configurator",
              label: "After · Configurator",
              text: "Redesigned configurator: breadcrumbs, scannable specs, clear availability and grouped options before the cart action, with related accessories underneath.",
            },
          ],
          layout: "16",
        },
        {
          subheading: "Business challenge",
        },
        {
          statement:
            "Organise the information hierarchy of a complex product while balancing user needs, business requirements and technical limitations.",
        },
        {
          subheading: "How might we",
        },
        {
          hmw: "How might we help hearing-care professionals find, order and manage products on their own, with less reliance on customer service?",
        },
      ],
    },
    {
      id: "cs-impact",
      nav: "Impact",
      eyebrow: "Impact",
      title: "Clearer decisions and more self-service for professionals",
      blocks: [
        {
          impact: [
            [
              "Clearer ordering decisions.",
              "Product cards surface what professionals need to compare, and testing confirmed package quantities are now understood.",
            ],
            [
              "Self-service after-sales.",
              "Warranty lookup went from a hidden capability to a homepage entry point users found much easier to discover.",
            ],
            [
              "Research turned into product.",
              "Six usability findings led directly to changes in navigation, terminology, discovery and checkout.",
            ],
            [
              "A new need uncovered.",
              "Testing the warranty flow revealed demand for repair-history information, feeding the next iteration.",
            ],
          ],
        },
      ],
    },
    {
      id: "cs-process",
      nav: "Process",
      eyebrow: "Process",
      title: "From auditing the legacy portal to validated designs",
      blocks: [
        {
          flow: ["Investigate", "Frame", "Explore", "Align", "Validate", "Refine"],
        },
        {
          step: {
            title: "Investigate",
            body: [
              "I audited the existing experience to find where it was falling short, rather than only designing the screens that were requested.",
              {
                list: [
                  "Information was hard to find across the portal",
                  "Some flows were unnecessarily complex",
                  "Terminology didn't match users' expectations",
                  "Similar tasks behaved inconsistently across products",
                ],
              },
            ],
          },
        },
        {
          step: {
            title: "Frame",
            body: [
              "With Product and stakeholders I mapped business needs against user problems, and framed the core challenge as one of **information hierarchy**: how much to show, and when.",
              {
                shots: [
                  {
                    img: "assets/board-sprint.webp",
                    alt: "Design sprint board in FigJam",
                    label: "Workshop · Design sprint",
                    text: 'The design sprint board, from the brief to the shared How Might We: *"How might we design a scalable and harmonized experience that ensures information transparency of the customer\'s purchase group channel at any step during their journey in ShopXP?"* The team mapped the challenge, clustered insights into themes such as transparency, awareness, training, prices, process and cart, voted on the most impactful ones and moved into sketching.',
                    wide: true,
                    ratio: "2624/1510",
                  },
                ],
                layout: "board",
              },
            ],
          },
        },
        {
          step: {
            title: "Explore",
            body: [
              "I explored multiple concepts and interaction models, designed flows and interfaces in Figma, and prototyped the more complex interactions. One principle guided the ordering work:",
              {
                principle:
                  "Give users enough information to make a confident decision before asking them to navigate deeper.",
              },
            ],
          },
        },
        {
          step: {
            title: "Align",
            body: [
              "Business requirements, backend and data limitations and an evolving Design System all shaped what could be built. My frontend background helped me spot constraints early; when something was technically hard, I worked with Engineering on alternatives that kept the core user need intact.",
              {
                mini: "How I make decisions",
              },
              {
                decisionFlow: [
                  {
                    title: "Evidence",
                    text: "Research and usability testing",
                  },
                  {
                    title: "Patterns",
                    text: "UX patterns, competitor examples and accessibility",
                  },
                  {
                    title: "Constraints",
                    text: "Technical feasibility and business requirements",
                  },
                  {
                    title: "Decision",
                    text: "The strongest option that can ship",
                    result: true,
                  },
                ],
              },
              {
                shots: [
                  {
                    img: "assets/board-feedback.webp",
                    alt: "Internal feedback board with dated sessions and sections",
                    label: "Workshop · Internal feedback",
                    text: "Internal feedback sessions in March 2025 were captured by date, turned into How Might We questions and mapped onto the screens they affected, section by section, so every comment had a clear place in the design.",
                    wide: true,
                    ratio: "1776/1390",
                  },
                ],
                layout: "board",
              },
            ],
          },
        },
        {
          step: {
            title: "Validate",
            body: [
              "Usability testing with around 5–10 participants, run with the Research team, showed where the information architecture and terminology didn't match users' mental models.",
              {
                table: {
                  label: "Research findings and changes",
                  columns: ["What we observed", "What we changed"],
                  rows: [
                    [
                      "Product image not recognised as the entry to details",
                      "Added an explicit Product Details action",
                    ],
                    ["Language switching wasn't intuitive", "Improved the language-switching experience"],
                    ["Users needed more product information", "More information during discovery"],
                    ["Kits weren't clear enough", "Added clarification during checkout"],
                    ["Warranty was hard to discover", "Added a homepage entry point"],
                    ["Users wanted related products", "Introduced contextual recommendations"],
                  ],
                },
              },
              {
                shots: [
                  {
                    img: "assets/board-test.webp",
                    alt: "Usability testing board: objective, method, assessment, data, clusters, analysis",
                    label: "Usability testing · Plan to decision",
                    text: "The full testing workflow on one board: objective, method and assessment, then every tester's observations centralised per page and category, clustered into patterns, and turned into recommendations and team decisions. Needs that fell outside the current scope, such as fitting ranges on product pages and clearer kit contents, were parked for future iterations.",
                    wide: true,
                    ratio: "2636/934",
                  },
                ],
                layout: "board",
              },
            ],
          },
        },
        {
          step: {
            title: "Refine",
            body: [
              "Findings fed back into the designs, always aiming for **the strongest experience that could realistically ship**, not an idealised one.",
            ],
          },
        },
      ],
    },
    {
      id: "cs-decisions",
      nav: "Core decisions",
      eyebrow: "Core decisions",
      title: "Key decisions that made ordering and after-sales clearer",
      blocks: [
        {
          lead: "The redesign involved many changes across the portal. These six are a selection that shows how I approached the biggest problems.",
        },
        {
          decision: {
            tag: "Stock ordering",
            title: "Put decision-making information on the product card",
            text: "Professionals compare several hearing aids and accessories before ordering. Showing the essentials up front, with add-to-cart right on the card, cut unnecessary navigation.",
            before: "Comparing products meant opening each detail page.",
            after:
              "Cards show product, category, colour, availability and quantity, with direct add-to-cart.",
          },
        },
        {
          decision: {
            tag: "Information architecture",
            title: "Let accessories be discovered two ways",
            text: "Accessories relate to different hearing-aid models, so a single location wasn't enough.",
            before: "Relevant accessories were hard to find for a given model.",
            after:
              "Organised into categories for independent discovery, and surfaced in context on product pages.",
            body: [
              {
                shots: [
                  {
                    img: "assets/acc-suggest.webp",
                    alt: "suggested accessories on a stock-ordering product page",
                    label: "In context · Suggested accessories",
                    text: 'On a stock-ordering product page, a "Zugehöriges Zubehör" carousel sits right under the configurator and shows accessories related to that model, such as streamers, remotes and sleeves. Each card can be configured and added to the cart without leaving the page.',
                    wide: true,
                  },
                ],
                layout: "16 feature",
              },
            ],
          },
        },
        {
          decision: {
            tag: "Ordering clarity",
            title: "Make the ordering unit explicit",
            text: "A small support issue with a clear root cause: ambiguity around the ordering unit. I fixed the ambiguity instead of redesigning the whole card.",
            before: "Users read battery package quantities differently than intended.",
            after: "A package-quantity badge and supporting message. *Validated in usability testing.*",
            body: [
              {
                shotsIntro:
                  "Batteries can only be ordered by the pack, and professionals were reading the package quantity differently than intended. The fix follows the order from start to finish, from the product list to the cart, so the unit is never in doubt.",
              },
              {
                shots: [
                  {
                    img: "assets/batt-list.webp",
                    alt: "Battery product list with package-quantity badges",
                    label: "Step 1 · Product list",
                    text: 'Every battery card carries a "1 Packung – 60 Stk." badge on the product image, so the unit is clear before anyone opens a product.',
                    wide: true,
                  },
                  {
                    img: "assets/batt-pdp.webp",
                    alt: "Battery configurator with a pack explanation",
                    label: "Step 2 · Product page",
                    text: 'An info message explains that a pack holds 60 cells and can only be bought per pack, and "60 Stück insgesamt" updates next to the quantity stepper.',
                  },
                  {
                    img: "assets/batt-cart.webp",
                    alt: "Cart showing pieces and packs per line",
                    label: "Step 3 · Cart",
                    text: 'Each cart line repeats "60 Stk. – 1 Packung" above the stepper, so the order is confirmed in both pieces and packs before checkout.',
                  },
                ],
                layout: "16 feature",
              },
            ],
          },
        },
        {
          decision: {
            tag: "Custom ordering",
            title: "Structure heavy input by type of information",
            text: "Custom orders need fitting details, patient information and documents. The goal wasn't fewer steps, it was making a lot of required information feel manageable.",
            before: "An information-heavy journey with little sense of progress.",
            after:
              "A progress structure organised around the type of information, so users know where they are and what's next.",
            body: [
              {
                shotsIntro:
                  "An in-the-ear order is made to measure, so it needs a product, a hearing profile, build options and an ear impression for each side. The flow splits this into five steps named after the type of information, with right (red) and left (blue) side by side throughout so both ears are configured together.",
              },
              {
                shots: [
                  {
                    img: "assets/ite-1.webp",
                    alt: "Custom order step 1: product per ear",
                    label: "Step 1 · Product",
                    text: "A five-step progress bar sets expectations up front. Each ear gets its own product and form factor, with a swap control between them and a product summary underneath.",
                    wide: true,
                  },
                  {
                    img: "assets/ite-2.webp",
                    alt: "Custom order step 2: audiogram per ear",
                    label: "Step 2 · Audiogram",
                    text: "Venting and canal length sit above a live audiogram for each ear. Values entered in the frequency grid are plotted on the chart, so mistakes are easy to spot.",
                  },
                  {
                    img: "assets/ite-3.webp",
                    alt: "Custom order step 3: build options per ear",
                    label: "Step 3 · Options",
                    text: "Build options are grouped per ear. Required fields are marked and options that don't apply are greyed out, so only relevant choices need attention.",
                  },
                  {
                    img: "assets/ite-4.webp",
                    alt: "Custom order step 4: how to share the ear impression",
                    label: "Step 4 · Scan file",
                    text: "One clear question: how will you share the ear impression? Upload, reuse or send by post, with an explanation of what happens next.",
                  },
                  {
                    img: "assets/ite-5.webp",
                    alt: "Custom order step 5: order summary",
                    label: "Step 5 · Summary",
                    text: "Everything comes together for review: product, side, configuration, audiogram, scan method and quantity per line, followed by shipping, terms and a preview before ordering.",
                  },
                ],
                layout: "16 feature",
              },
              {
                shots: [
                  {
                    img: "assets/fig-ite.webp",
                    alt: "Full Figma page for the in-the-ear custom order flow",
                    label: "Figma · Full custom-order (ITE) page",
                    text: "The full Figma page behind the custom order: every screen and state for each of the five steps (product selection, audiogram, options, scan file and summary), plus the upload and reuse dialogs, and the draft, preview, order-placed and PDF outputs.",
                    wide: true,
                    ratio: "1142/1504",
                  },
                ],
                layout: "board tall",
              },
            ],
          },
        },
        {
          decision: {
            tag: "Custom ordering · Upload",
            title: "Make document upload look like upload",
            text: "Same business process, clearer interaction.",
            before: "The upload control looked like a field to type into.",
            after:
              "A clear upload pattern that states the required action. *Based on established patterns, not yet user-tested.*",
            body: [
              {
                shots: [
                  {
                    img: "assets/fig-upload.webp",
                    alt: "Scan upload and reuse dialogs in Figma",
                    label: "Figma · Upload concept",
                    text: "The upload concept for custom orders, designed state by state. **Upload scan from file** asks for the scanner type first, then shows only the file pickers that scanner needs: one OIS file plus right and left scans, or right and left ASC/STL files for other scanners. Wrong files get an inline error and Continue stays disabled until everything is valid. **Re-use scanfile** finds an existing impression by serial number (per ear) or order number and confirms the match before continuing.",
                    wide: true,
                    ratio: "1654/814",
                  },
                ],
                layout: "board",
              },
            ],
          },
        },
        {
          decision: {
            tag: "After-sales",
            title: "Turn warranty lookup into a homepage entry point",
            text: "The capability existed, but users didn't know they could check it themselves, which created unnecessary customer-service dependency.",
            before: "Warranty lookup was hidden in the legacy experience.",
            after:
              "A homepage widget: serial number → device information → warranty status → remaining validity. *Much easier to discover in testing.*",
            body: [
              {
                shots: [
                  {
                    img: "assets/fig-warranty.webp",
                    alt: "Warranty lookup flow in Figma, ready for development",
                    label: "Figma · Full warranty lookup flow",
                    text: "The complete warranty lookup flow as handed to development: from the homepage widget, through a serial-number search and its error state, to the results with device details, warranty status and repair history. Further screens cover alternative result states, and a printable summary closes the flow.",
                    wide: true,
                    ratio: "1914/824",
                  },
                ],
                layout: "board",
              },
            ],
          },
        },
      ],
    },
    {
      id: "cs-outcomes",
      nav: "Outcomes",
      eyebrow: "Outcomes",
      title: "Live across Europe, and now learning from real use",
      blocks: [
        {
          live: ["Finland", "Norway", "Spain"],
        },
        "The redesigned ShopXP is now live with hearing-care professionals in several markets. Before launch, every change was checked through **usability testing, user feedback, earlier research, support signals and stakeholder reviews**, so it shipped with a **clearer information hierarchy, easier product discovery and stronger self-service**.",
        {
          subheading: "Before launch",
        },
        {
          metrics: [
            ["3", "core journeys redesigned: stock ordering, custom ordering, warranty lookup"],
            ["6", "usability findings turned into product changes"],
            ["5–10", "participants in usability testing"],
          ],
        },
        {
          subheading: "What happens next",
        },
        {
          next: [
            ["Listen", "Collect support tickets and customer-service reports from the live markets."],
            ["Measure", "Track product metrics on ordering, discovery and warranty lookups."],
            [
              "Iterate",
              "Use that data to decide what to improve next, starting with the repair-history need found in testing.",
            ],
          ],
        },
        {
          quote:
            "Investigate deeply. Turn complexity into clarity. Validate assumptions. Work with constraints. Make the product better, not just the screens.",
        },
      ],
    },
  ],
};
