/*
 * The modal layers: the password gate, about me, a testimonial, the work history, the talks
 * page and the Figma prototype viewer. Each one is a createDialog() from js/lib/dom.js.
 */
"use strict";

const dialogs = {};

/* ---- password gate for protected case studies ---- */
const pwInput = $("#pwInput"),
  pwError = $("#pwError"),
  pwField = pwInput.closest(".pw-field");
let pwPendingTile = null;

function requestUnlock(tile) {
  pwPendingTile = tile;
  pwError.hidden = true;
  pwField.classList.remove("bad");
  pwInput.value = "";
  dialogs.password.open();
}

function initPasswordDialog() {
  dialogs.password = createDialog($("#pwOverlay"), {
    closeBtn: $("#pwCancel"),
    focus: pwInput,
    hideDelay: 260,
    onHidden: () => (pwPendingTile = null),
  });
  $("#pwForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const tile = pwPendingTile;
    if (!tile) return;
    if (pwInput.value === PROJECT_PASSWORD) {
      unlockedTiles.add(tile);
      dialogs.password.close({ restoreFocus: false });
      openCase(tile);
    } else {
      /* a wrong password shakes the field */
      pwError.hidden = false;
      pwInput.value = "";
      pwInput.focus();
      replayClass(pwField, "bad");
    }
  });
  pwInput.addEventListener("input", () => {
    pwField.classList.remove("bad");
    pwError.hidden = true;
  });
}

/* ---- a testimonial in full, opened by its tile ---- */
function openTestimonial(area) {
  const t = TESTIMONIALS[area],
    overlay = $("#tmOverlay");
  $(".tm-full", overlay).innerHTML = rich(t.full);
  $(".tm-who b", overlay).innerHTML = rich(t.name);
  $(".tm-who span", overlay).innerHTML = rich(t.role);
  dialogs.testimonial.open();
}

/* ---- Figma prototype viewer: plays the embed in a dialog, or offers a link if the host blocks it ---- */
const pxOverlay = $("#pxOverlay");

function openPrototype(card) {
  $(".px-fallback", pxOverlay).hidden = true;
  $(".px-loading", pxOverlay).hidden = false;
  [$("#pxOpen"), $("#pxFallbackLink")].forEach((a) => setLink(a, card.href));
  const frame = document.createElement("iframe");
  frame.title = SITE.prototype.frameTitle;
  frame.allow = "fullscreen";
  frame.setAttribute("allowfullscreen", "");
  frame.src = card.dataset.embed;
  frame.addEventListener("load", () => ($(".px-loading", pxOverlay).hidden = true));
  $(".px-frame", pxOverlay).appendChild(frame);
  dialogs.prototype.open();
}

function prototypeBlocked() {
  if (pxOverlay.hidden) return;
  $(".px-fallback", pxOverlay).hidden = false;
  $(".px-loading", pxOverlay).hidden = true;
  $(".px-frame iframe", pxOverlay)?.remove();
  $("#pxFallbackLink").focus({ preventScroll: true });
}

function initPrototypeDialog() {
  dialogs.prototype = createDialog(pxOverlay, {
    closeBtn: $("#pxClose"),
    inert: [caseView],
    onHidden: () => $(".px-frame iframe", pxOverlay)?.remove(),
  });
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".cs-proto[data-embed]");
    /* modified clicks open Figma in a new tab as a normal link */
    if (!card || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    openPrototype(card);
  });
  document.addEventListener("securitypolicyviolation", (e) => {
    if (/figma\.com/.test(e.blockedURI || "")) prototypeBlocked();
  });
}

function initDialogs() {
  initPasswordDialog();
  initPrototypeDialog();

  const about = $("#aboutOverlay");
  about.style.setProperty("--avatar-img", cssUrl(PORTRAIT_IMG));
  dialogs.about = createDialog(about, { closeBtn: $("#abClose") });

  dialogs.testimonial = createDialog($("#tmOverlay"), { closeBtn: $("#tmClose") });

  /* long pages start from the top every time they open */
  dialogs.work = createDialog($("#whOverlay"), {
    closeBtn: $("#whClose"),
    onOpened: () => ($("#whOverlay .wh-box").scrollTop = 0),
  });
  dialogs.speaking = createDialog($("#spOverlay"), {
    closeBtn: $("#spClose"),
    onOpened: () => ($("#spOverlay .sp-box").scrollTop = 0),
  });
}
