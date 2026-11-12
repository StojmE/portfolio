/*
 * Start-up: fills the page with its words, builds the grid and wires every part of the page.
 * index.html lists the script files in dependency order; this one runs last but one, before scenery.js.
 */
"use strict";

/* a soft halo where the visitor clicks */
function initClickEcho() {
  if (REDUCED_MOTION) return;
  document.addEventListener("pointerdown", (e) => {
    const wave = document.createElement("span");
    wave.className = "wave";
    wave.style.left = e.clientX + "px";
    wave.style.top = e.clientY + "px";
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 820);
  });
}

/* the logo and the footer link go back to the top; the logo also leaves an open case study */
function initBackToTop() {
  const toTop = (e) => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: scrollBehavior() });
  };
  $("#brand").addEventListener("click", (e) => {
    if (caseOpen) closeCase();
    toTop(e);
  });
  $("#ftTop").addEventListener("click", toTop);
}

/* the static page: lists first, so their own data-t text is filled with the rest */
$$("[data-list]").forEach((el) => (el.innerHTML = LIST_TEMPLATES[el.dataset.list]()));
$("#spLogo").innerHTML = LOGOS.uxplore;
fillText();

initGrid();
initDialogs();
initCaseView();
initHover();
initTheme();
initFilters();
initContrast();
initLightbox();
initClickEcho();
initBackToTop();
