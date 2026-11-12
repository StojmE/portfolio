/*
 * DOM helpers and shared building blocks: queries, motion and pointer preferences, screen-reader
 * announcements, colour luminance, the page lock, focus trapping, dialogs and segmented controls.
 */
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;
/* tilt, drag and the cursor bubble are mouse and trackpad niceties */
const CAN_HOVER = matchMedia("(hover: hover) and (pointer: fine)").matches;

const scrollBehavior = () => (REDUCED_MOTION ? "auto" : "smooth");

/* local storage can be unavailable (private browsing, blocked cookies); settings then last one visit */
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* not remembered */
    }
  },
};

/* screen-reader announcements: cleared first so repeating the same message is still read out */
function announce(message) {
  const live = $("#live");
  live.textContent = "";
  setTimeout(() => (live.textContent = message), 60);
}

/* relative luminance (0 dark … 1 light) of a computed colour; null when it is fully transparent */
function luminance(color) {
  const m = color.match(/[\d.]+/g);
  if (!m || (m.length > 3 && +m[3] === 0)) return null;
  const [r, g, b] = m.map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/* a forced reflow, so removing and re-adding a class replays its animation */
function replayClass(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

/* ---- page lock: one counter for every layer that freezes the page behind it, so closing one
   layer never unlocks the page while another is still open ---- */
const pageLock = (() => {
  let locks = 0;
  const background = () => [$(".tabs"), $(".stage"), $("#themeSw")];
  return {
    lock() {
      if (locks++ > 0) return;
      document.body.style.overflow = "hidden";
      background().forEach((el) => el.setAttribute("inert", ""));
    },
    unlock() {
      if (locks === 0 || --locks > 0) return;
      document.body.style.overflow = "";
      background().forEach((el) => el.removeAttribute("inert"));
    },
  };
})();

/* keeps Tab inside a modal layer, even where `inert` is unsupported */
const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
function trapFocus(container, e, extra = []) {
  const items = [...extra, ...$$(FOCUSABLE, container)].filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0],
    last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/**
 * Wires a modal overlay: fades in, locks the page, traps Tab, closes on Escape, a backdrop
 * click or its close button, and returns focus to whatever opened it.
 */
function createDialog(overlay, { closeBtn, focus, hideDelay = 280, inert = [], onOpened, onHidden } = {}) {
  let isOpen = false,
    returnFocus = null;
  function open() {
    if (isOpen) return;
    isOpen = true;
    returnFocus = document.activeElement;
    overlay.hidden = false;
    pageLock.lock();
    inert.forEach((el) => el.setAttribute("inert", ""));
    requestAnimationFrame(() => {
      overlay.classList.add("open");
      (focus || closeBtn)?.focus({ preventScroll: true });
      onOpened?.();
    });
  }
  function close({ restoreFocus = true } = {}) {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove("open");
    inert.forEach((el) => el.removeAttribute("inert"));
    pageLock.unlock();
    setTimeout(() => {
      if (isOpen) return;
      overlay.hidden = true;
      onHidden?.();
    }, hideDelay);
    if (restoreFocus) returnFocus?.focus({ preventScroll: true });
  }
  closeBtn?.addEventListener("click", () => close());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  overlay.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
    } else if (e.key === "Tab") trapFocus(overlay, e);
  });
  return { open, close };
}

/* segmented controls (filter tabs, reading switch): a pill that slides to the pressed button.
   Returns a function that re-measures it. */
function slidingThumb(group) {
  const thumb = document.createElement("span");
  thumb.className = "seg-thumb still";
  thumb.setAttribute("aria-hidden", "true");
  group.prepend(thumb);
  const place = () => {
    const on = $('button[aria-pressed="true"]', group);
    if (!on?.offsetWidth) return;
    thumb.style.width = on.offsetWidth + "px";
    thumb.style.height = on.offsetHeight + "px";
    thumb.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
    thumb.classList.toggle("on-dark", on.classList.contains("on-dark"));
  };
  new MutationObserver(place).observe(group, {
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-pressed", "class"],
  });
  addEventListener("resize", place);
  document.fonts?.ready.then(place);
  place();
  /* the first placement snaps; every change after that slides */
  requestAnimationFrame(() => requestAnimationFrame(() => thumb.classList.remove("still")));
  return place;
}
