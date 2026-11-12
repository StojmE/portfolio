/*
 * Mouse and trackpad niceties: tiles tilt toward the pointer, and a speech bubble follows the
 * cursor, typing a short message for whatever it is over (tiles, the theme switch, screenshots).
 * On touch screens none of this runs and `bubble` does nothing.
 */
"use strict";

const bubble = (() => {
  const el = $("#bubble"),
    text = $("#bubbleText");
  let x = 0, // where the bubble is drawn
    y = 0,
    targetX = 0, // where the pointer is
    targetY = 0,
    active = false,
    typeTimer = null;

  /* the bubble sits above and right of the cursor, flipping sides near the window edges */
  function place() {
    const OFFSET = 16,
      PAD = 12,
      w = el.offsetWidth || 140,
      h = el.offsetHeight || 36;
    let left = x + OFFSET,
      top = y - OFFSET - h,
      corner = "tl";
    if (left + w > innerWidth - PAD) {
      left = x - OFFSET - w;
      corner = "tr";
    }
    if (top < PAD) {
      top = y + OFFSET;
      corner = corner === "tr" ? "br" : "bl";
    }
    el.classList.remove("p-tl", "p-tr", "p-bl", "p-br");
    el.classList.add("p-" + corner);
    el.style.transform = `translate(${left}px, ${top}px) scale(1)`;
  }

  /* eases toward the pointer every frame while showing */
  function follow() {
    if (!active) return;
    x += (targetX - x) * 0.32;
    y += (targetY - y) * 0.32;
    place();
    requestAnimationFrame(follow);
  }

  function type(message) {
    clearInterval(typeTimer);
    if (REDUCED_MOTION) {
      text.textContent = message;
      return;
    }
    let i = 0;
    text.textContent = "";
    typeTimer = setInterval(() => {
      text.textContent = message.slice(0, ++i);
      place();
      if (i >= message.length) clearInterval(typeTimer);
    }, 28);
  }

  return {
    /* replace the message, only while the bubble is already showing */
    say(message) {
      if (active) type(message);
    },
    show(message) {
      if (!CAN_HOVER || !message) return;
      active = true;
      el.classList.add("on");
      follow();
      type(message);
    },
    hide() {
      active = false;
      el.classList.remove("on");
      clearInterval(typeTimer);
    },
    track(e) {
      targetX = e.clientX;
      targetY = e.clientY;
    },
    /* start from the pointer instead of sliding in from the last spot */
    jumpTo(e) {
      x = targetX = e.clientX;
      y = targetY = e.clientY;
    },
    init() {
      document.addEventListener("pointermove", (e) => {
        if (!active) {
          x = e.clientX;
          y = e.clientY;
        }
      });
    },
  };
})();

/* a tile leans toward the pointer and its cover drifts a little the other way */
function tiltTile(tile) {
  const inner = $(".tile-in", tile),
    img = tile.classList.contains("no-zoom") ? null : $(".ph-img", tile);
  let frame = null,
    nx = 0,
    ny = 0;
  const rest = () => {
    inner.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
    if (img) img.style.transform = "scale(1) translate(0,0)";
  };
  function lean() {
    frame = null;
    if (REDUCED_MOTION) return;
    inner.style.transform = `scale(1.02) rotateX(${(-ny * 0.8).toFixed(2)}deg) rotateY(${(nx * 0.8).toFixed(2)}deg)`;
    if (img)
      img.style.transform = `scale(1.08) translate(${(nx * 10).toFixed(1)}px, ${(ny * 7).toFixed(1)}px)`;
  }
  tile.addEventListener("pointerenter", () => {
    tile.classList.add("hovering");
    bubble.show(tile.dataset.msg);
  });
  tile.addEventListener("pointermove", (e) => {
    const r = tile.getBoundingClientRect();
    /* -1 … 1 across the tile */
    nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    frame ||= requestAnimationFrame(lean);
    bubble.track(e);
  });
  tile.addEventListener("pointerleave", () => {
    tile.classList.remove("hovering");
    rest();
    bubble.hide();
  });
  tile.addEventListener("focus", () => {
    inner.style.transform = "scale(1.02)";
    if (img) img.style.transform = "scale(1.06)";
  });
  tile.addEventListener("blur", rest);
}

function initHover() {
  if (!CAN_HOVER) return;
  bubble.init();
  $$(".tile", grid).forEach(tiltTile);

  /* the theme switch: worded for whichever way it will flip */
  const themeSw = $("#themeSw");
  const themeMessage = () => (currentTheme() === "dark" ? SITE.theme.bubbleToLight : SITE.theme.bubbleToDark);
  themeSw.addEventListener("pointerenter", () => bubble.show(themeMessage()));
  themeSw.addEventListener("pointermove", bubble.track);
  themeSw.addEventListener("pointerleave", bubble.hide);
  themeSw.addEventListener("click", () => setTimeout(() => bubble.say(themeMessage()), 0));

  /* screenshots: an invitation to click and enlarge */
  const shotAt = (e) => e.target.closest?.(".cs-shot");
  document.addEventListener("pointerover", (e) => {
    const shot = shotAt(e);
    if (shot && !shot.contains(e.relatedTarget)) {
      bubble.jumpTo(e);
      bubble.show(SITE.caseStudy.enlarge);
    }
  });
  document.addEventListener("pointermove", (e) => shotAt(e) && bubble.track(e), { passive: true });
  document.addEventListener("pointerout", (e) => {
    const shot = shotAt(e);
    if (shot && !shot.contains(e.relatedTarget)) bubble.hide();
  });
  document.addEventListener("click", (e) => shotAt(e) && bubble.hide(), true);
}
