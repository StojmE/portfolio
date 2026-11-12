/*
 * Lightbox for screenshots: the arrows (or ← →) step through the case study or the open page,
 * clicking the image zooms it, and Escape, the close button or a click outside closes it.
 */
"use strict";

function initLightbox() {
  const t = SITE.lightbox;
  const lb = document.createElement("div");
  lb.className = "lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", t.label);
  lb.innerHTML = `<button type="button" class="icon-chip lb-close" aria-label="${esc(t.close)}">${ICONS.close}</button>
    <button type="button" class="icon-chip lb-prev" aria-label="${esc(t.previous)}">${ICONS.previous}</button>
    <button type="button" class="icon-chip lb-next" aria-label="${esc(t.next)}">${ICONS.next}</button>
    <img alt=""><p></p><span class="lb-count" aria-live="polite"></span>`;
  document.body.appendChild(lb);
  const img = $("img", lb),
    caption = $("p", lb),
    count = $(".lb-count", lb);
  let shots = [],
    index = 0,
    opener = null;

  function show(i) {
    index = (i + shots.length) % shots.length;
    const shot = shots[index];
    img.src = shot.dataset.src;
    img.alt = shot.dataset.alt;
    caption.innerHTML = $("figcaption", shot.closest("figure"))?.innerHTML ?? "";
    count.textContent = shots.length > 1 ? `${index + 1} / ${shots.length}` : "";
    lb.classList.toggle("single", shots.length < 2);
    lb.classList.remove("zoomed");
  }
  function close() {
    lb.classList.remove("open", "zoomed");
    opener?.focus();
  }

  document.addEventListener("click", (e) => {
    const shot = e.target.closest(".cs-shot");
    if (!shot) return;
    opener = shot;
    shots = $$(".cs-shot", shot.closest(".modal") || caseView);
    show(Math.max(0, shots.indexOf(shot)));
    lb.classList.add("open");
    $(".lb-close", lb).focus();
  });
  lb.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) return show(index - 1);
    if (e.target.closest(".lb-next")) return show(index + 1);
    if (e.target === img) return lb.classList.toggle("zoomed");
    close();
  });
  /* captured first, so Escape closes the lightbox and not the case study or dialog under it */
  document.addEventListener(
    "keydown",
    (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        close();
      } else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "Tab") trapFocus(lb, e);
    },
    true,
  );
}
