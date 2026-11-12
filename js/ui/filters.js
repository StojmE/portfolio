/*
 * Filter tabs: the matching tiles glide to the top of the grid (FLIP), the rest follow, dimmed.
 * Choosing "All" puts every tile back where it was.
 */
"use strict";

let baseOrder = null; /* the "All" arrangement while a filter is on */

/* after a drag, the new arrangement becomes the one "All" returns to */
function rememberTileOrder() {
  if (baseOrder) baseOrder = $$(".tile", grid);
}

/* moves the tiles into `ordered`, animating each from where it was to where it lands */
function flipReorder(ordered) {
  const before = new Map(
    $$(".tile", grid).map((t) => {
      t.getAnimations().forEach((a) => a.finish());
      return [t, t.getBoundingClientRect()];
    }),
  );
  ordered.forEach((t) => grid.appendChild(t));
  if (REDUCED_MOTION) return;
  grid.classList.add("reordering");
  const moves = ordered.map((t, i) => {
    const a = before.get(t),
      b = t.getBoundingClientRect();
    const dx = a.left - b.left,
      dy = a.top - b.top;
    const resized = Math.abs(a.width - b.width) > 1 || Math.abs(a.height - b.height) > 1;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && !resized) return null;
    const from = `translate3d(${dx}px,${dy}px,0)${resized ? ` scale(${a.width / b.width},${a.height / b.height})` : ""}`;
    return t
      .animate(
        [
          { transformOrigin: "0 0", transform: from },
          { transformOrigin: "0 0", transform: "translate3d(0,0,0)" },
        ],
        { duration: 720, easing: "cubic-bezier(.4,0,.2,1)", delay: Math.min(i * 14, 110), fill: "backwards" },
      )
      .finished.catch(() => {});
  });
  Promise.all(moves).then(() => grid.classList.remove("reordering"));
}

function applyFilter(btn, buttons) {
  const filter = btn.dataset.f;
  const wasAll = buttons.find((b) => b.dataset.f === "all").getAttribute("aria-pressed") === "true";
  buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  if (wasAll || !baseOrder) baseOrder = $$(".tile", grid);

  const matches = (t) => filter === "all" || t.dataset.cat === filter;
  const ordered =
    filter === "all" ? baseOrder : [...baseOrder.filter(matches), ...baseOrder.filter((t) => !matches(t))];
  let shown = 0;
  ordered.forEach((t) => {
    const on = matches(t);
    if (on) shown++;
    t.classList.toggle("dim", !on);
    t.setAttribute("aria-hidden", String(!on));
    t.toggleAttribute("inert", !on);
    const action = $(".expand-btn", t);
    if (action) action.tabIndex = on ? 0 : -1;
  });
  flipReorder(ordered);
  if (filter === "all") baseOrder = null;

  /* bring the freshly arranged top of the grid into view if the visitor had scrolled past it */
  const top = grid.getBoundingClientRect().top;
  if (top < 0) scrollBy({ top: top - 90, behavior: scrollBehavior() });
  announce(fill(SITE.filters.announce, { filter: btn.textContent, shown, total: ordered.length }));
}

function initFilters() {
  const tabs = $(".tabs"),
    buttons = $$("button", tabs);
  slidingThumb(tabs);
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.getAttribute("aria-pressed") !== "true") applyFilter(btn, buttons);
    }),
  );
}
