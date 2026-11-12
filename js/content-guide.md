# Writing content for the portfolio

All words on the site live in two places:

- **`js/content.js`**: everything outside the case studies. This includes tiles, the About, Work
  history, Talks, Testimonial, Prototype and Password dialogs, the footer, button labels, screen-reader
  labels and cursor bubbles. It also holds `TALKS` and `TESTIMONIALS`.
- **`js/cases/<name>.js`**: one file per case study.

`index.html` and the code in `js/` hold no text. Change a word in a content file, reload, and it shows up
everywhere that text is used.

The page title, description and link-preview text in the `<head>` of `index.html` are the only
exception. Link previews (LinkedIn, Slack, iMessage) and search results read them before any
script runs, so they have to stay in the HTML.

## Text formatting

Any text value can use:

| Write                            | You get                                         |
| -------------------------------- | ----------------------------------------------- |
| `**bold**`                       | **bold**                                        |
| `*italic*`                       | _italic_                                        |
| `[UXplore](https://uxplore.mk/)` | a link (web links open in a new tab)            |
| `==Emilija==`                    | the accent-coloured name in "Hey, I am Emilija" |
| `\n`                             | a line break (`\n\n` for a blank line)          |

Write `&` as plain `&`. The page takes care of the HTML escaping.

`{name}`-style placeholders, as in `"Open the {name} case study"`, are filled in by the code. Keep
them when you reword a sentence.

## A case study file

```js
CASE_CONTENT.codefu = {
  name: "CodeFu", // used in labels such as "Case study: CodeFu"
  kicker: "EdTech · Developer tools · Usability", // the tags on the cover
  title: "Research based design transformation…",
  facts: [
    ["Role", "Senior Product Designer"],
    ["Tools", "Figma, Miro"],
  ],
  summary: {
    text: "The “In short” paragraph…",
    results: [["~8", "users interviewed and tested"]], // the big numbers
    blocks: [
      /* optional, e.g. before/after screenshots */
    ],
  },
  sections: [
    {
      id: "cf-problem", // used for links and the sidebar
      nav: "Problem", // label in the "jump to section" bar; leave out to hide it there
      eyebrow: "Problem", // small label above the heading
      title: "A rushed migration left competitors frustrated",
      blocks: [
        /* see below */
      ],
    },
  ],
};
```

The key (`codefu`) is the case study's slug: it matches its entry in `GRID` and `COVERS` in
`js/config.js` and is its link (`#codefu`). The file also needs a `<script>` line in `index.html`
next to the other case studies.

## Blocks

A section is a list of blocks, shown in order. A plain string is a paragraph. Every other block is
an object whose first key says what it is:

| Block               | Example                                                                                                | Shows as                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| paragraph           | `"Some text with **bold**."`                                                                           | a paragraph                                                    |
| `subheading`        | `{ subheading: "How might we" }`                                                                       | a small heading                                                |
| `lead`              | `{ lead: "A selection of the changes…" }`                                                              | the intro line under a section heading                         |
| `statement`         | `{ statement: "Reduce support dependency…" }`                                                          | the business-challenge statement                               |
| `hmw`               | `{ hmw: "How might we…?" }`                                                                            | the How might we question                                      |
| `quote`             | `{ quote: "Investigate deeply…" }`                                                                     | the large closing quote                                        |
| `principle`         | `{ principle: "Give users enough…" }`                                                                  | a quoted principle inside a step                               |
| `mini`              | `{ mini: "Tasks tested" }`                                                                             | a tiny label heading                                           |
| `list`              | `{ list: ["one", "two"] }`                                                                             | a dashed list                                                  |
| `chips`             | `{ chips: ["Figma", "Miro"] }`                                                                         | rounded tags                                                   |
| `flow`              | `{ flow: ["Define", "Test", "Ship"] }`                                                                 | the step-by-step bar                                           |
| `impact`            | `{ impact: [["Clearer decisions.", "Product cards now…"]] }`                                           | numbered impact list (001, 002…)                               |
| `metrics` / `stats` | `{ metrics: [["6", "findings turned into changes"]] }`                                                 | big numbers                                                    |
| `cards`             | `{ cards: [["Problem", "Users fail to…"], ["Hypothesis", "…"]] }`                                      | side-by-side cards                                             |
| `decisionFlow`      | `{ decisionFlow: [{ title: "Evidence", text: "…" }, { title: "Decision", text: "…", result: true }] }` | the arrow flow ending in a result                              |
| `table`             | `{ table: { label: "…", columns: ["Observed", "Changed"], rows: [["…", "…"]] } }`                      | a two-column table                                             |
| `next`              | `{ next: [["Listen", "Collect support tickets…"]] }`                                                   | the "what happens next" steps                                  |
| `live`              | `{ live: ["Finland", "Norway"] }`                                                                      | the green Live badge with markets                              |
| `more`              | `{ more: { text: "Read on Medium ↗", href: "https://…" } }`                                           | a link at the end                                              |
| `shotsIntro`        | `{ shotsIntro: "Batteries can only be…" }`                                                             | the paragraph that introduces screenshots                      |
| `shots`             | see below                                                                                              | screenshots with captions                                      |
| `phones`            | `{ phones: [ …shots… ], single: true }`                                                                | phone screenshots (`single` puts the caption beside one phone) |
| `prototype`         | `{ prototype: { title, text, button, label, img, href, embed } }`                                      | the playable Figma prototype card                              |
| `step`              | `{ step: { title: "Investigate", body: [ …blocks… ] } }`                                               | a numbered process step (01, 02…)                              |
| `decision`          | `{ decision: { tag, title, text, before, after, body: [ …blocks… ] } }`                                | a numbered core-decision card with Before/After                |

### Screenshots

```js
{
  shots: [
    {
      img: "assets/codefu-home.webp",        // the image file
      alt: "the redesigned CodeFu home page",// read out as "Enlarge: …"
      label: "After · Home",                 // the small caps label
      text: "The new home leads with…",      // the caption
      wide: true,                            // optional: full width
      ratio: "2624/1510",                    // optional: keep the image's own shape
    },
  ],
  layout: "16 feature",  // optional, any of: 16 (16:10 crops), feature, board, tall, pairs
}
```

`pairs` is for before/after grids. It keeps every "Before" label grey and every "After" label purple.

Numbers for steps, decisions and impact items are counted automatically. Reorder the blocks and the
numbers follow.
