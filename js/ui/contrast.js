/*
 * The floating controls (filter tabs, logo, theme switch, case-study close button) sit on top of
 * the content. Each one checks what is underneath it and switches to light text over dark content.
 */
"use strict";

function initContrast() {
  const tabs = $(".tabs"),
    brand = $("#brand"),
    themeSw = $("#themeSw"),
    caseClose = $("#caseClose");
  const DARK = 0.5;
  /* a see-through background counts as dark, like the photo and cover tiles it belongs to */
  const isDark = (el) => (luminance(getComputedStyle(el).backgroundColor) ?? 0) < DARK;

  /* is the content under this point dark? the controls themselves don't count */
  function darkAt(x, y) {
    const under = document
      .elementsFromPoint(x, y)
      .filter((el) => !tabs.contains(el) && !themeSw.contains(el) && !brand.contains(el));
    for (const el of under) {
      /* the cover at the top of an open case study */
      const cover = el.closest(".case-hero .cover");
      if (cover) return isDark(cover);
      const tile = el.closest(".tile");
      if (tile) {
        if (tile.classList.contains("dim")) continue;
        if (tile.dataset.tone) return tile.dataset.tone === "dark"; /* covers declare their tone */
        return isDark($(".tile-in", tile));
      }
    }
    return isDark(document.body); /* the page background follows the theme */
  }
  const darkUnder = (el, fx = 0.5) => {
    const r = el.getBoundingClientRect();
    return darkAt(r.left + r.width * fx, r.top + r.height / 2);
  };

  let frame = 0;
  function check() {
    frame = 0;
    /* each tab label follows what is under it; the glass tint follows the majority */
    const buttons = $$("button", tabs),
      y = tabs.getBoundingClientRect().top + tabs.offsetHeight / 2;
    let dark = 0;
    buttons.forEach((b) => {
      const r = b.getBoundingClientRect(),
        d = darkAt(r.left + r.width / 2, y);
      b.classList.toggle("on-dark", d);
      if (d) dark++;
    });
    tabs.classList.toggle("on-dark", dark > buttons.length / 2);
    brand.classList.toggle("on-dark", darkUnder(brand, 0.6));
    if (caseOpen) caseClose.classList.toggle("on-dark", darkUnder(caseClose));
    themeSw.classList.toggle("on-dark", darkUnder(themeSw, 0.3) || darkUnder(themeSw, 0.7));
  }
  const queue = () => (frame ||= requestAnimationFrame(check));

  addEventListener("scroll", queue, { passive: true });
  caseView.addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  new MutationObserver(queue).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class"],
  });
  grid.addEventListener("transitionend", queue);
  grid.addEventListener("animationend", queue, true);
  /* after the filter animation has settled */
  $$("button", tabs).forEach((b) => b.addEventListener("click", () => setTimeout(queue, 750)));
  queue();
}
