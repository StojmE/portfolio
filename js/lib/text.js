/*
 * Text helpers shared by every template: escaping, the small formatting language used in the
 * content files, {placeholder} filling, and filling the static page from js/content.js.
 */
"use strict";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* content formatting: **bold**, *italic*, [link text](https://…), ==highlight== and \n for a line break */
function rich(s) {
  return esc(s)
    .replace(/\n/g, "<br>")
    .replace(/==([^=]+)==/g, "<span>$1</span>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, href) => {
      const external = /^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${external}>${text}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

/* fill {placeholders}: fill("Open the {name} case study", { name: "Widex" }) */
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, key) => (key in vars ? vars[key] : m));

/* a string from SITE by its dotted path, e.g. "about.lede" */
function textAt(path) {
  const value = path.split(".").reduce((o, key) => o?.[key], SITE);
  if (typeof value !== "string") throw new Error(`Missing text in js/content.js: ${path}`);
  return value;
}

/* points a link at a url; links that leave the site open in a new tab */
function setLink(a, url) {
  a.href = url;
  if (/^https?:/.test(url)) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
}

/*
 * Fill the static page from the content files:
 *   data-t="about.lede"        the element's text; children marked data-fixed (an icon, an emoji, a link)
 *                              are kept after the text, or before it with data-fixed="before"
 *   data-t-label="close"       its aria-label
 *   data-t-placeholder="…"     its placeholder
 *   data-href="linkedin"       its href, from LINKS in js/config.js (external links open in a new tab)
 */
function fillText(root = document) {
  root.querySelectorAll("[data-t]").forEach((el) => {
    const fixed = [...el.children].filter((child) => child.hasAttribute("data-fixed"));
    el.innerHTML = rich(textAt(el.dataset.t));
    fixed.forEach((child) => (child.dataset.fixed === "before" ? el.prepend(child) : el.append(" ", child)));
  });
  root
    .querySelectorAll("[data-t-label]")
    .forEach((el) => el.setAttribute("aria-label", textAt(el.dataset.tLabel)));
  root
    .querySelectorAll("[data-t-placeholder]")
    .forEach((el) => el.setAttribute("placeholder", textAt(el.dataset.tPlaceholder)));
  root.querySelectorAll("[data-href]").forEach((el) => setLink(el, LINKS[el.dataset.href]));
}

/* an image path as a CSS url() for a custom property: made absolute, because a url() inside a
   custom property resolves against the stylesheet that uses it (css/), not the page */
const cssUrl = (path) => `url('${new URL(path, document.baseURI).href}')`;
