/*
 * Day and night. The small script in the <head> of index.html sets data-theme before the page
 * paints (the visitor's saved choice, or their system setting); the switch flips and remembers it.
 * The sun and moon icon morphs in CSS, nothing is swapped.
 */
"use strict";

const currentTheme = () => document.documentElement.dataset.theme;

function initTheme() {
  const root = document.documentElement,
    themeSw = $("#themeSw");
  const sync = () => {
    const dark = currentTheme() === "dark";
    themeSw.classList.toggle("is-dark", dark);
    themeSw.setAttribute("aria-pressed", String(dark));
    themeSw.setAttribute("aria-label", dark ? SITE.theme.toLight : SITE.theme.toDark);
  };
  themeSw.addEventListener("click", () => {
    root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
    storage.set("theme", root.dataset.theme);
  });
  /* the head script follows system changes until a choice is saved; keep the switch in step */
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  sync();
}
