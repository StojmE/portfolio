# emche/design — portfolio of Emilija Stojmenovska

A static site: plain HTML, CSS and JavaScript, no build step.

```
index.html                page structure only: no words, every text spot points to js/content.js
css/                      styling, one file per part of the page, loaded in cascade order:
  base.css                  reset, design tokens (colours, radii, shadows, motion), dark mode, type
  controls.css              icon chips, buttons, the logo, day/night switch and filter tabs
  grid.css                  the bento grid and every tile
  case-covers.css           the case-study covers (tiles, case-study header, previous / next cards)
  case-study.css            the case-study view and all its content blocks
  dialogs.css               about, testimonial, work history, talks, password and prototype dialogs
  lightbox.css, footer.css, scenery.css, cursor.css
  states.css                hover / press / focus and other states shared by every component
  animations.css            every @keyframes animation
js/config.js              settings: contact links, the grid layout, cover colours and logos, password
js/content.js             ALL site text: tiles, dialogs, work history, talks, testimonials, labels
js/cases/*.js             one content file per case study: its words, facts and screenshots
js/content-guide.md       how to write content: text formatting and every case-study block type
js/lib/                   shared helpers: DOM, dialogs, focus, text formatting
js/icons.js               every inline icon and logo
js/templates/             markup templates: tiles, case studies, the list pages in the dialogs
js/ui/                    behaviour: grid, case-study view, dialogs, hover, theme, filters,
                          menu contrast and the lightbox, each in its own file
js/main.js                start-up: fills in the text and wires everything together
js/scenery.js             the seasonal band at the bottom of the page
assets/                   images, favicon and the link-preview image (og-image.jpg)
tests/smoke.spec.js       automated checks for every case study, dialog, filter and reading mode
```

## Everyday edits

- **Change any text on the page:** edit `js/content.js`. You never need to touch `index.html`.
- **Change case-study text:** open `js/cases/<name>.js`; every section, step, decision and caption
  is a plain field. [js/content-guide.md](js/content-guide.md) lists the building blocks.
- **Swap an image:** replace the file in `assets/` with the same name, or add a new file and put
  its path (e.g. `"assets/new-shot.webp"`) in the case file.
- **Rearrange or resize tiles:** edit `GRID` in `js/config.js`; the tiles appear in that order.
- **Add a case study:** add a `js/cases/<slug>.js` file and its `<script>` line in `index.html`,
  a `case` entry in `GRID` and a cover in `COVERS` (both in `js/config.js`).
- **Change the Widex password:** `PROJECT_PASSWORD` in `js/config.js`.
- **Links to a single case study:** add `#widex`, `#swisscard`, `#nrth` or `#codefu` to the address.

## Run it locally

```
npm install
npm start          # http://localhost:4173
npm test           # runs the smoke tests on desktop and phone sizes
npm run lint       # checks the JavaScript (including undefined names across files) and the HTML
npm run format     # tidies formatting
```

`npm run lint` checks `index.html` as a template, so it doesn't flag headings and links that are
empty in the file; the text is filled in from `js/content.js`, and `npm test` checks the finished
page (including an accessibility scan and a check that no text spot is left empty).

`npm test` needs the Playwright browser once: `npx playwright install chromium`.

Publishing, your own domain, link previews and analytics: see [DEPLOY.md](DEPLOY.md).
