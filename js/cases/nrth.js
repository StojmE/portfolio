/* NRTH case study: every word, fact and screenshot of the case study.
   Templates in js/templates/case-study.js turn it into the page; js/content-guide.md lists the block types. */
"use strict";

CASE_CONTENT.nrth = {
  name: "NRTH",
  kicker: "0 → 1 · FinTech · SaaS · Payments · Design Systems",
  title: "Designing one clear, compliant workspace for SME collections, payroll and supplier payments",
  facts: [
    ["Client", "NRTH Ltd · [gonrth.co](https://gonrth.co)"],
    ["My role", "Lead Product Designer · freelance project"],
    ["Project type", "0 → 1: a brand-new product, designed from scratch to its first live release"],
    ["Built by", "Sixcore, Skopje"],
    ["Product", "B2B FinTech SaaS for UK small and medium-sized businesses"],
    [
      "Design scope",
      "Client dashboard (Collect, Pay, onboarding, settings, Approver and Payer roles) and the internal Admin dashboard",
    ],
    ["Status", "Live and onboarding UK businesses"],
  ],
  summary: {
    text: "UK SMEs typically juggle **four separate tools** to invoice and collect, run payroll, pay suppliers and reconcile accounts. NRTH replaces them with **one FCA-aligned platform** built around two modes, **Collect** and **Pay**, with compliance, automation and a clean experience as first principles. It was a **0 → 1** project, a product term for building something entirely new: there was no existing product, user base or design to start from, so every flow, pattern and decision was created from the ground up. The design covered two surfaces: a client dashboard for daily financial work and an Admin dashboard for operational and risk oversight.",
    results: [
      ["4 → 1", "finance tools replaced by one platform"],
      ["2", "product surfaces: client and admin"],
      ["Live", "onboarding UK businesses"],
    ],
  },
  sections: [
    {
      id: "nr-problem",
      nav: "Problem",
      eyebrow: "Problem",
      title: "SMEs juggled four tools to move money in and out",
      blocks: [
        "SME finance runs on two demanding flows. **Collecting money** means managing Direct Debit mandates, chasing late payments and reconciling settlements that take two to three business days to clear. **Paying people** means coordinating approvals, getting bank details right and disbursing reliably, with accountability at every step.",
        "The tools available weren't built for this. Accounting software records transactions but doesn't initiate them, consumer banking apps lack the controls finance teams need, and payroll tools don't talk to collections. The result is a fragmented, error-prone process that eats time and carries real compliance risk under UK anti-money-laundering rules.",
        {
          subheading: "Who it's for",
        },
        "Business owners, directors and finance managers at UK companies with **2 to 50 employees**, in sectors like professional services, creative agencies, consultancies, property management and recruitment. Secondary users are finance team members who act as Approver or Payer.",
        {
          subheading: "How might we",
        },
        {
          hmw: "How might we let a small finance team collect, approve and pay from one place, with the controls of a bank and the clarity of a modern app?",
        },
      ],
    },
    {
      id: "nr-platform",
      nav: "Platform",
      eyebrow: "Platform",
      title: "Two modes that make money in and money out obvious",
      blocks: [
        "The product is organised around **two modes, switched from the header**, so users always know whether money is coming in or going out.",
        {
          cards: [
            [
              "Collect",
              "Receive money via Direct Debit (BACS) or Instant Payment (Faster Payments), as Autopay, Split payments or one-off Payment links.",
            ],
            [
              "Pay",
              "Run payroll for employees and bulk-pay suppliers, with an approval workflow before anything leaves the account.",
            ],
            [
              "Payouts",
              "Collected funds land in a virtual account per business and can be moved to the real bank account.",
            ],
          ],
        },
        {
          subheading: "Dashboard",
        },
        {
          shots: [
            {
              img: "assets/nrth-dashboard.webp",
              alt: "NRTH dashboard with payment totals, balance chart and recent transactions",
              label: "Dashboard",
              text: "The home screen answers the first questions a finance manager has: pending payments, collected payments and pending payouts at the top, a balance chart with a predicted balance, and upcoming and recent transactions on the right. The header switch (Invoices / Operating Expenses) moves between the two modes.",
              wide: true,
            },
          ],
          layout: "16 feature",
        },
        {
          subheading: "Payment structures",
        },
        {
          list: [
            "**Autopay:** recurring collections weekly, fortnightly, monthly, quarterly or annually",
            "**Split payment:** an invoice divided into scheduled instalments",
            "**Payment link:** a one-off request, payable by Direct Debit or Instant Payment",
          ],
        },
        {
          subheading: "Creating a payment",
        },
        {
          phones: [
            {
              img: "assets/nrth-create-payment.webp",
              alt: "Create Payment panel with one-off, autopay and split payment options",
              label: "Create payment",
              text: "One Create Payment button, always in the sidebar, opens a panel that asks a single question first: which type of payment? One-off, Autopay or Split payment, each with a one-line explanation, so the right flow starts from the start.",
              ratio: "375/776",
            },
          ],
          single: true,
        },
        {
          subheading: "Autopays",
        },
        {
          shots: [
            {
              img: "assets/nrth-autopays.webp",
              alt: "Autopays list with live and not-live templates",
              label: "Autopays · List",
              text: "Every recurring template in one table: a Live or Not Live status, price, frequency, number of customers and total revenue, with sorting on each column and actions on every row.",
              wide: true,
            },
            {
              img: "assets/nrth-autopay-detail.webp",
              alt: "Autopay detail with the Manage menu open",
              label: "Autopays · Detail",
              text: "An autopay opens to its payment details and active customers. Edit, Pause and Delete sit together under one Manage menu, with Delete set apart in red.",
            },
            {
              img: "assets/nrth-autopays-empty.webp",
              alt: "Autopays empty state",
              label: "Autopays · Empty state",
              text: "Before the first autopay, the page explains what will appear and keeps Create autopay right next to the title.",
            },
          ],
          layout: "16 feature",
        },
        {
          subheading: "Transactions",
        },
        {
          shots: [
            {
              img: "assets/nrth-transactions.webp",
              alt: "Transactions table with colour-coded statuses",
              label: "Transactions · List",
              text: "All collections in one table with colour-coded statuses (Created, Submitted, Paid out, Failed, Canceled), charge and payout dates, amount, fees and net, plus filters, search and CSV export for accounting.",
              wide: true,
            },
            {
              img: "assets/nrth-transaction-submitted.webp",
              alt: "Transaction detail for a submitted payment, with Cancel Payment",
              label: "Transactions · In progress",
              text: "While a payment is still in progress, the main action is Cancel Payment. The payment history on the right shows every step, including why a payment failed and when it was resubmitted.",
            },
            {
              img: "assets/nrth-transaction-paid.webp",
              alt: "Transaction detail for a paid-out payment, with Refund Payment",
              label: "Transactions · Paid out",
              text: "Once the money is paid out, the same page offers Refund Payment instead, and the history ends with the successful payout.",
            },
          ],
          layout: "16 feature",
        },
      ],
    },
    {
      id: "nr-decisions",
      nav: "Core decisions",
      eyebrow: "Core decisions",
      title: "Key decisions behind a clear, compliant workspace",
      blocks: [
        {
          lead: "A selection of the decisions that shaped the product, from structure to compliance.",
        },
        {
          decision: {
            tag: "Information architecture",
            title: "Split the product into Collect and Pay",
            text: "Money in and money out have different users, risks and rhythms. A single header toggle keeps each mode focused while staying one product.",
          },
        },
        {
          decision: {
            tag: "Roles & compliance",
            title: "Separate who approves from who pays",
            text: "Each batch can have an **Approver** who signs it off and a separate **Payer** who executes it, mirroring how finance teams actually work. If no roles are assigned, the submitter does both, so small teams aren't slowed down.",
          },
        },
        {
          decision: {
            tag: "Supplier payments",
            title: "Turn invoice PDFs into payments",
            text: "Businesses upload supplier invoices and NRTH extracts the supplier name, amount, sort code and account number. Every detail is **reviewed before the batch is submitted**, and suppliers can be matched against existing accounting records.",
          },
        },
        {
          decision: {
            tag: "Customer experience",
            title: "A branded mandate flow, with no account needed",
            text: "Customers get an email invitation and set up their Direct Debit with their own bank details on a page showing the business's logo. They never log in to NRTH; they exist only as payment recipients.",
          },
        },
        {
          decision: {
            tag: "Two surfaces",
            title: "One design language, two very different jobs",
            text: "The client dashboard is about **task completion and financial confidence**. The Admin dashboard is about **operational oversight and risk**: KYC/KYB status, transaction volumes, limit requests and platform-wide activity.",
            body: [
              {
                shotsIntro:
                  "Both surfaces are built from one Figma design system. Every component is documented with its variants, states and usage rules, so new screens stay consistent. A few examples:",
              },
              {
                shots: [
                  {
                    img: "assets/nrth-ds-alerts.webp",
                    alt: "Alert banner component in info, error, warning, success and system variants",
                    label: "Design system · Alerts",
                    text: "One alert banner in five variants (info, error, warning, success and system), each with its own colour and icon, a title, a message, secondary and primary actions and a close button.",
                    wide: true,
                    ratio: "1011/520",
                  },
                  {
                    img: "assets/nrth-ds-tags.webp",
                    alt: "Tag component matrix across styles, sizes, colours, stroke and cancel options",
                    label: "Design system · Tags",
                    text: "The tag component as a full matrix: simple, dot, icon + label and icon-only styles in three sizes and five colours, with or without a stroke and a remove button. These tags carry statuses such as Paid out, Failed and Live across the product.",
                    wide: true,
                    ratio: "1352/1529",
                  },
                  {
                    img: "assets/nrth-ds-progress.webp",
                    alt: "Progress indicator base component and its step variants",
                    label: "Design system · Progress indicator",
                    text: "The base progress indicator and its step variants: completed, current, not started, error and disabled. It guides users through linear tasks such as onboarding.",
                    wide: true,
                    ratio: "1600/836",
                  },
                  {
                    img: "assets/nrth-ds-progress-docs.webp",
                    alt: "Progress indicator documentation page with properties, anatomy and behaviour",
                    label: "Design system · Documentation",
                    text: "Each component comes with documentation: its properties, an annotated anatomy, and behaviour guidelines covering labels, helper text, overflow content and what every state means.",
                    wide: true,
                    ratio: "1400/1922",
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
      id: "nr-onboarding",
      nav: "Onboarding",
      eyebrow: "Onboarding & compliance",
      title: "A five-step onboarding built for UK regulation",
      blocks: [
        "Every client completes a **mandatory five-step onboarding** before accessing the platform. The steps are sequential and can't be skipped, designed to meet the UK Money Laundering Regulations 2017 and FCA conduct standards.",
        {
          flow: ["KYC", "KYB", "Accounting", "Bank account", "Logo"],
        },
        {
          table: {
            label: "Onboarding steps",
            columns: ["Step", "What happens"],
            rows: [
              ["1 · KYC", "Identity check of the person registering: documents and biometrics"],
              ["2 · KYB", "Companies House lookup, owners with 25%+ share, sanctions screening"],
              ["3 · Accounting software", "Connect Xero, QuickBooks or Sage for two-way sync"],
              ["4 · Bank account", "Verify the real bank account used for payouts"],
              ["5 · Logo", "Shown on the customer-facing Direct Debit page"],
            ],
          },
        },
        {
          subheading: "Built on regulated partners",
        },
        {
          chips: [
            "London & Zurich · Direct Debit",
            "Moorwand · virtual accounts",
            "Plaid · open banking",
            "Sumsub · KYC / KYB",
            "Xero · QuickBooks · Sage",
            "Companies House",
          ],
        },
      ],
    },
    {
      id: "nr-outcomes",
      nav: "Outcomes",
      eyebrow: "Outcomes",
      title: "One live product replacing a four-tool setup",
      blocks: [
        "NRTH is **live and onboarding UK businesses**. It replaces a typical four-tool setup with one product that collects, approves and pays, with full audit logging, transaction limits and risk controls built in from the start.",
        {
          metrics: [
            ["4 → 1", "separate finance tools replaced by one platform"],
            ["2", "product surfaces designed: client and admin"],
            ["5", "step compliant onboarding, KYC to logo"],
          ],
        },
        {
          quote: "Compliance, automation and a clean experience as first principles, not afterthoughts.",
        },
      ],
    },
  ],
};
