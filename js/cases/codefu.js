/* CodeFu case study: every word, fact and screenshot of the case study.
   Templates in js/templates/case-study.js turn it into the page; js/content-guide.md lists the block types. */
"use strict";

CASE_CONTENT.codefu = {
  name: "CodeFu",
  kicker: "EdTech · Developer tools · Usability · Prototype",
  title: "Research based design transformation for programming-competition platform CodeFu",
  facts: [
    ["Product", "CodeFu, North Macedonia's programming competition platform (since 2007)"],
    ["Role", "Senior Product Designer"],
    ["Responsibilities", "User research, usability testing, redesign, design kit, prototype and validation"],
    ["Tools", "Figma, Miro, Google Meet"],
  ],
  summary: {
    text: "When Adobe Flash was discontinued in 2020, CodeFu was rushed onto React JS, and the design and user experience suffered. Users kept reporting frustration. I interviewed and tested with **around 8 users**, clustered their pain points into **six priority areas**, redesigned the platform in Figma with a dark, accessible visual language and a design kit, and validated it in a second round of testing, where users completed tasks **with significantly more ease**.",
    results: [
      ["~8", "users interviewed and tested"],
      ["6", "priority areas that shaped the redesign"],
      ["Round 2", "users completed tasks with significantly more ease"],
    ],
    blocks: [
      {
        shots: [
          {
            img: "assets/codefu-old-arena.webp",
            alt: "the legacy CodeFu arena, which opened on an empty chat",
            label: "Before · Arena",
            text: "The old arena opened on an empty chat. Every competition and practice year sat in one long grey list, with no sign of what was active or where to start.",
          },
          {
            img: "assets/codefu-home.webp",
            alt: "the redesigned CodeFu home page",
            label: "After · Home",
            text: "The new home leads with the active round and a clear Enter Competition button, keeps the last round's results one click away and shows the Hall of Fame.",
          },
          {
            img: "assets/codefu-old-editor.webp",
            alt: "the legacy challenge editor",
            label: "Before · Challenge editor",
            text: "Challenges were tabs numbered only by points, the task was a wall of plain text, and the language choice was a row of radio buttons above a bare text box.",
          },
          {
            img: "assets/codefu-editor.webp",
            alt: "the redesigned challenge editor",
            label: "After · Challenge editor",
            text: "The task, example and constraints sit beside the code, with language and theme settings, autosave, a visible timer and one Submit Result action.",
          },
          {
            img: "assets/codefu-old-test.webp",
            alt: "the legacy test log with failed results",
            label: "Before · Test results",
            text: "Test results streamed into a separate log as red lines, so matching a failure to its input meant scrolling and reading timestamps.",
          },
          {
            img: "assets/codefu-test-result.webp",
            alt: "the redesigned test feedback",
            label: "After · Test results",
            text: "Results appear under the code: a plain Wrong Answer verdict, test cases passed, and the input, your output and the expected output side by side.",
          },
          {
            img: "assets/codefu-old-results.webp",
            alt: "the legacy results table",
            label: "Before · Results",
            text: "Results were a long table with colour-coded scores and statistics as a block of plain text in a side panel.",
          },
          {
            img: "assets/codefu-results.webp",
            alt: "the redesigned results dashboard",
            label: "After · Results",
            text: "Totals, language share and per-challenge efficiency become charts, next to a sortable participants table.",
          },
          {
            img: "assets/codefu-old-solution.webp",
            alt: "the legacy solution pop-up over the results",
            label: "Before · Solutions",
            text: "A participant's code and judged test cases opened in a small pop-up over a dimmed results table.",
          },
          {
            img: "assets/codefu-solution.webp",
            alt: "the redesigned solution view",
            label: "After · Solutions",
            text: "Solutions get a full screen: the participant's challenges and score, their code and the judged test cases together.",
          },
        ],
        layout: "16 pairs",
      },
    ],
  },
  sections: [
    {
      id: "cf-problem",
      nav: "Problem",
      eyebrow: "Problem",
      title: "A rushed migration left competitors frustrated with basic tasks",
      blocks: [
        "CodeFu was created in 2007 so Computer Science students and IT professionals in North Macedonia could prove their programming skills in competitions. It grew steadily in participants and challenge complexity. When Adobe Flash was discontinued in 2020, the platform had to move to React JS. The redesign that came with it was rushed, with the **technical migration prioritised over user experience**.",
        "The result improved slightly, but negative feedback kept coming: users faced real frustration with basic usability.",
        {
          subheading: "Business challenge",
        },
        {
          statement:
            "A platform that worked technically but didn't serve its users, putting a long-running competition community at risk.",
        },
        {
          subheading: "How might we",
        },
        {
          hmw: "How might we make CodeFu as intuitive as possible, so competitors can focus on solving problems instead of fighting the interface?",
        },
      ],
    },
    {
      id: "cf-impact",
      nav: "Impact",
      eyebrow: "Impact",
      title: "What changed for students and competitors",
      blocks: [
        {
          impact: [
            [
              "Significantly easier to use.",
              "In the second round of testing, users navigated the system with far more ease than before.",
            ],
            [
              "Tasks completed seamlessly.",
              "The same tasks that caused trouble before, plus a new live competition simulation, were completed without friction.",
            ],
            [
              "Users enjoyed it.",
              "Participants expressed satisfaction and enjoyment using the redesigned system.",
            ],
            [
              "A foundation to scale.",
              "A design kit now keeps every section of the platform consistent as it grows.",
            ],
          ],
        },
      ],
    },
    {
      id: "cf-process",
      nav: "Process",
      eyebrow: "Process",
      title: "Research with real users shaped every design decision",
      blocks: [
        {
          flow: [
            "Define audience",
            "Analyse competitors",
            "Interview & test",
            "Cluster",
            "Redesign",
            "Validate",
          ],
        },
        {
          step: {
            title: "Define the audience",
            body: [
              "Computer Science and engineering students, plus IT professionals preparing for job interviews.",
            ],
          },
        },
        {
          step: {
            title: "Analyse competitors",
            body: [
              "I explored the functionality and features of competing platforms to understand industry benchmarks and what users would expect.",
            ],
          },
        },
        {
          step: {
            title: "Interview & test",
            body: [
              "One-on-one sessions with a mix of **newcomers, seasoned competitors and practice-only users**. Each participant completed three tasks while I captured their feedback in Miro, one colour per user.",
              {
                cards: [
                  [
                    "Task 1 · Practice round",
                    "Enter a practice round, solve and test a challenge, switch challenges, exit.",
                  ],
                  [
                    "Task 2 · Past competition",
                    "Enter a past competition, submit results and explore other participants' solutions.",
                  ],
                  [
                    "Task 3 · Chat",
                    "Open chat, describe its features, send a message, close it and notice notifications.",
                  ],
                ],
              },
              "Even these simple tasks caused trouble: participants struggled to **enter challenges, find their way around, identify key features**, and ran into unexpected actions.",
            ],
          },
        },
        {
          step: {
            title: "Cluster the findings",
            body: [
              "After around eight participants, clear patterns emerged. I grouped them into six priorities for the next iteration:",
              {
                list: [
                  "Better flow and overall navigation",
                  "Easier access to specific information",
                  "Clearer names for elements",
                  "More customisation options",
                  "More readable information formatting",
                  "A more pleasing visual design",
                ],
              },
            ],
          },
        },
        {
          step: {
            title: "Redesign",
            body: [
              "With the testing insights as the brief, I redesigned the platform in Figma, built a **design kit** for consistency and scale, and created a **fully functional prototype** to evaluate the changes and iterate.",
              {
                prototype: {
                  title: "Interactive prototype",
                  text: "Click through the redesigned CodeFu flow in Figma",
                  button: "Play the prototype",
                  label: "Play the interactive CodeFu prototype",
                  img: "assets/codefu-proto.webp",
                  href: "https://www.figma.com/proto/FQr8hvgUQSGMQpi9tX7WsP/CodeFu-Redesign?node-id=847-23151&t=cYQxkaBkWRa2ZvKk-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=847%3A23151",
                  embed:
                    "https://embed.figma.com/proto/FQr8hvgUQSGMQpi9tX7WsP/CodeFu-Redesign?node-id=847-23151&scaling=contain&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=847%3A23151&embed-host=share&footer=false&theme=dark",
                },
              },
            ],
          },
        },
        {
          step: {
            title: "Validate",
            body: [
              "A second round of usability testing with existing and new users repeated the original tasks and added a **live competition simulation**.",
            ],
          },
        },
      ],
    },
    {
      id: "cf-decisions",
      nav: "Core decisions",
      eyebrow: "Core decisions",
      title: "Key changes that made competing feel effortless",
      blocks: [
        {
          lead: "A selection of the changes from the redesign, chosen to show how testing insights turned into design decisions.",
        },
        {
          decision: {
            tag: "Navigation",
            title: "Streamline the flow into and out of challenges",
            text: "Entering a round and orienting inside it was where users struggled most.",
            before: "Users had difficulty entering challenges and knowing where they were.",
            after: "An improved flow and overall navigation. *Validated in the second round of testing.*",
            body: [
              {
                shots: [
                  {
                    img: "assets/codefu-home.webp",
                    alt: "redesigned CodeFu home page",
                    label: "Home",
                    text: "The start page leads with the active round and a clear Enter Competition button, keeps the last round's results one click away, and shows the Hall of Fame. Every edition since 2010 is listed in the left rail.",
                    wide: true,
                  },
                  {
                    img: "assets/codefu-competition.webp",
                    alt: "redesigned competition round with challenge cards",
                    label: "Competition round",
                    text: "Every challenge in the round is a card with its points, progress and a Start Now button, and a status legend explains what each state means. The left rail jumps straight between challenges.",
                  },
                  {
                    img: "assets/codefu-practice.webp",
                    alt: "redesigned practice round with challenge cards",
                    label: "Practice round",
                    text: "Practice uses the same layout, with Solve Now instead of Start Now, so moving between practising and competing needs nothing new to learn.",
                  },
                ],
                layout: "16 feature",
              },
            ],
          },
        },
        {
          decision: {
            tag: "Information access",
            title: "Put key information within easy reach",
            text: "Competitors need specific information fast, especially mid-competition.",
            before: "Essential features and information were hard to identify.",
            after: "Easier access to specific information, with clearer formatting for readability.",
            body: [
              {
                shots: [
                  {
                    img: "assets/codefu-chat-docked.webp",
                    alt: "CodeFu chat opened over a competition page",
                    label: "Chat in context",
                    text: 'Chat opens over the page, so competitors can read announcements without leaving the round. Admins are listed first and a "1 New Message" divider marks what is unread.',
                  },
                  {
                    img: "assets/codefu-chat-full.webp",
                    alt: "CodeFu chat expanded",
                    label: "Chat expanded",
                    text: "Expanded, the chat shows who is online, highlights admin messages such as corrections to a challenge, and shows when someone is typing.",
                  },
                  {
                    img: "assets/codefu-solution.webp",
                    alt: "a participant's solution in a past competition",
                    label: "Past competition · Solutions",
                    text: "In a past competition, a participant's challenges, score, code and judged test cases sit on one screen, so others can learn from how they solved it.",
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
            tag: "Naming",
            title: "Rename elements so they say what they do",
            text: "Unclear names led to unexpected actions during testing.",
            before: "Element names didn't match what users expected them to do.",
            after: "Revised naming for clarity and understanding.",
            body: [
              {
                shots: [
                  {
                    img: "assets/codefu-test-result.webp",
                    alt: "challenge editor showing a Wrong Answer test result",
                    label: "Test feedback",
                    text: "Actions say what they do: Run & Test checks the sample cases, Submit Result sends the answer. The verdict is named plainly, Wrong Answer with 0/2 test cases passed, next to the input, your output and the expected output.",
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
            tag: "Customisation",
            title: "Let users tailor the experience",
            text: "Users asked for more control, and customisation also supports accessibility needs.",
            before: "Limited options to adapt the platform to personal preferences.",
            after: "More customisation settings, including options that help with accessibility.",
            body: [
              {
                shots: [
                  {
                    img: "assets/codefu-editor.webp",
                    alt: "challenge editor with language and theme settings",
                    label: "Challenge editor",
                    text: "The description, example and constraints sit beside the code. Competitors choose their programming language and editor theme, code saves automatically, and the timer and Submit Result stay in view.",
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
            tag: "Visual language",
            title: "Go dark, readable and consistent",
            text: "Programmers prefer dark interfaces, and competitors stare at the screen for long stretches.",
            before: "A visual design users didn't find pleasing, and inconsistency across sections.",
            after:
              "A dark palette for visual comfort and contrast, Open Sans for legibility at every size and weight, and a design kit for consistency.",
            body: [
              {
                shots: [
                  {
                    img: "assets/codefu-results.webp",
                    alt: "results dashboard for a competition round",
                    label: "Results dashboard",
                    text: "Round results in the same dark palette: participation and submission totals, programming languages, problem efficiency per challenge and a sortable participants table.",
                    wide: true,
                  },
                ],
                layout: "16 feature",
              },
            ],
          },
        },
      ],
    },
    {
      id: "cf-accessibility",
      eyebrow: "Accessibility",
      title: "Designed for long sessions and different needs",
      blocks: [
        "Accessibility was part of the interviews and testing, not an afterthought.",
        {
          chips: [
            "Strong colour contrast in the dark palette",
            "Open Sans with multiple weights for legibility",
            "Accessibility-friendly customisation settings",
          ],
        },
        {
          subheading: "Planned next",
        },
        {
          list: [
            "Full keyboard navigation for users with motor disabilities",
            "Screen-reader compatibility through semantic HTML and descriptive labels",
          ],
        },
      ],
    },
    {
      id: "cf-outcomes",
      nav: "Outcomes",
      eyebrow: "Outcomes",
      title: "Users moved through the platform with far more ease",
      blocks: [
        "In the second round of testing, users navigated the system with **significantly more ease**, completed tasks seamlessly and expressed **genuine satisfaction and enjoyment**. Their answers to ad hoc questions matched what we expected, which confirmed the redesign's improvements.",
        {
          metrics: [
            ["~8", "users interviewed and tested in the first round"],
            ["3", "core tasks tested, plus a live competition simulation"],
            ["6", "priority areas that shaped the redesign"],
          ],
        },
        {
          quote:
            "Empathy-driven design can turn a frustrating tool into an inclusive product people enjoy using.",
        },
        {
          more: {
            text: "Read the full case study on Medium ↗",
            href: "https://medium.com/@emilijastojmenovska/case-study-improving-the-usability-of-codefu-8b592fc3bf57",
          },
        },
      ],
    },
  ],
};
