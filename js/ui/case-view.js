/*
 * The case-study view: opens from its tile with a zoom, swaps between case studies in place,
 * keeps a sidebar index in sync, gives each case study a shareable #link that the Back button
 * closes, and offers two reading modes (the full story or a quick scan) with reading times.
 */
"use strict";

const caseView = $("#caseView"),
  caseHero = $("#caseHero"),
  caseKicker = $("#caseKicker"),
  caseTitle = $("#caseTitle"),
  caseBody = $("#caseBody"),
  caseToc = $("#caseToc"),
  caseMode = $("#caseMode"),
  caseModeNote = $("#caseModeNote");

let caseOpen = false,
  currentTile = null,
  savedScroll = 0,
  focusBeforeCase = null,
  pushedHistory = false,
  placeModeThumb = () => {};

/* ---- password gate for protected case studies ---- */
const unlockedTiles = new WeakSet();
const isLocked = (tile) => tile.dataset.locked === "true" && !unlockedTiles.has(tile);

/* ---- content ---- */
function buildCaseContent(tile) {
  const c = CASE_CONTENT[tile.dataset.slug];
  caseKicker.textContent = c.kicker;
  caseTitle.textContent = c.title;
  caseHero.innerHTML = coverHtml(tile.dataset.slug);
  caseBody.innerHTML = c.html + caseNavHtml(tile);
  $$(".cs-next-case", caseBody).forEach((card) =>
    card.addEventListener("click", () => openCase(tileOf(card.dataset.slug))),
  );
  buildToc();
  applyReadMode();
}

/* previous and next case studies, in grid order */
function caseNavHtml(tile) {
  const tiles = caseTiles(),
    i = tiles.indexOf(tile);
  const prev = tiles[(i - 1 + tiles.length) % tiles.length],
    next = tiles[(i + 1) % tiles.length];
  const card = (t, dir) => caseNavCardHtml(t.dataset.slug, dir, { locked: isLocked(t) });
  return `<nav class="cs-case-nav" aria-label="${esc(SITE.caseStudy.more)}">${card(prev, "prev")}${next !== prev ? card(next, "next") : ""}</nav>`;
}

/* ---- sidebar index ---- */
function buildToc() {
  const sections = $$("section[id]", caseBody).filter((s) => $(".cs-eyebrow", s));
  caseToc.innerHTML = `<button type="button" class="toc-home">${ICONS.back}${rich(SITE.caseStudy.home)}</button><ol>${sections
    .map((s) => `<li><a href="#${s.id}">${$(".cs-eyebrow", s).innerHTML}</a></li>`)
    .join("")}</ol>`;
  caseToc.hidden = false;
  $(".toc-home", caseToc).addEventListener("click", () => closeCase());
}

function syncToc() {
  const links = $$("a", caseToc).filter((a) => !a.parentElement.hidden);
  let current = null;
  links.forEach((a) => {
    const target = $(a.getAttribute("href"), caseView);
    if (target && target.getBoundingClientRect().top < innerHeight * 0.35) current = a;
  });
  if (caseView.scrollTop + caseView.clientHeight >= caseView.scrollHeight - 4) current = links.at(-1);
  links.forEach((a) => a.classList.toggle("on", a === current));
}

/* jump links and the sidebar scroll the case view, not the page, and leave the URL alone */
function scrollCaseTo(hash) {
  const target = $(hash, caseView);
  if (!target) return;
  caseView.scrollTo({
    top: target.getBoundingClientRect().top - caseView.getBoundingClientRect().top + caseView.scrollTop - 24,
    behavior: scrollBehavior(),
  });
}

/* ---- reading modes: the full story, or a quick scan of screens, prototypes, role and impact ---- */
/* what a quick scan keeps; anything that holds one of these stays, the rest of the copy is hidden */
const SCAN_KEEP =
  ".cs-rows, .cs-stats, .cs-impact, .cs-metrics, .cs-live, .cs-shots, .cs-shots-intro, .cs-phones, .cs-proto, .cs-case-nav";
/* headings stay as signposts inside anything that is kept */
const SCAN_HEAD = ".cs-eyebrow, .cs-h, .cs-inshort > h2, .cs-dec-top, .cs-dec > h3, .cs-step-n, .cs-step h3";
let readMode = storage.get("caseMode") === "scan" ? "scan" : "full";

function markScanHidden() {
  const walk = (parent) => {
    for (const el of parent.children) {
      if (el.matches(SCAN_KEEP) || el.matches(SCAN_HEAD)) continue;
      if (el.matches(".cs-sub-h")) {
        /* a sub-heading stays only when it introduces something kept */
        if (!el.nextElementSibling?.matches(SCAN_KEEP)) el.classList.add("scan-hide");
      } else if (el.querySelector(SCAN_KEEP)) walk(el);
      else el.classList.add("scan-hide");
    }
  };
  walk(caseBody);
}
const clearScanHidden = () => $$(".scan-hide", caseBody).forEach((el) => el.classList.remove("scan-hide"));

/* reading time: about 220 words a minute, plus ~10 seconds for each screenshot or prototype */
function readMinutes({ scan }) {
  const copy = caseBody.cloneNode(true);
  $$(`.cs-case-nav, .cs-foot, .cs-anchors${scan ? ", .scan-hide" : ""}`, copy).forEach((el) => el.remove());
  const words = (copy.textContent.match(/\S+/g) || []).length;
  const shots = $$(".cs-shot, .cs-proto", copy).length;
  return Math.max(1, Math.round(words / 220 + (shots * 10) / 60));
}

function applyReadMode() {
  const scan = readMode === "scan";
  $$("button", caseMode).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === readMode)));
  caseModeNote.hidden = !scan;
  caseBody.classList.toggle("is-scan", scan);

  clearScanHidden();
  const minutes = { full: readMinutes({ scan: false }) };
  markScanHidden();
  minutes.scan = readMinutes({ scan: true });
  if (!scan) clearScanHidden();
  for (const [mode, min] of Object.entries(minutes)) {
    const time = $(`[data-time="${mode}"]`, caseMode);
    time.textContent = fill(SITE.caseStudy.readTime, { min });
    time.setAttribute("aria-label", fill(SITE.caseStudy.readTimeLabel, { min }));
  }
  placeModeThumb();

  /* the sidebar only lists sections that are showing */
  $$("a", caseToc).forEach((a) => {
    a.parentElement.hidden = !!$(a.getAttribute("href"), caseBody)?.classList.contains("scan-hide");
  });
  syncToc();
}

function setReadMode(mode) {
  if (readMode === mode) return;
  readMode = mode;
  storage.set("caseMode", mode);
  applyReadMode();
  /* the content eases in so the change reads as one smooth step */
  if (!REDUCED_MOTION)
    caseBody.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "none" },
      ],
      {
        duration: 320,
        easing: "cubic-bezier(0.3, 0.8, 0.25, 1)",
      },
    );
  /* keep the switch in view so the change shows right where the click happened */
  if (caseMode.getBoundingClientRect().top < 0) caseMode.scrollIntoView({ block: "start" });
}

/* ---- shareable links: each case study has its own #slug. Opening one from the grid adds one
   history step, so the Back button (or a phone's swipe back) closes it instead of leaving the site ---- */
function setCaseHash(tile) {
  const slug = tile?.dataset.slug;
  try {
    if (slug && !location.hash) {
      history.pushState({ caseStudy: slug }, "", "#" + slug);
      pushedHistory = true;
    } else if (slug) history.replaceState(history.state, "", "#" + slug);
    else if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  } catch {
    /* some embedded viewers don't allow changing the address; the link just stays as it was */
  }
}

function openFromHash() {
  const slug = location.hash.slice(1).toLowerCase();
  const tile = slug && tileOf(slug);
  if (tile && !(caseOpen && currentTile === tile)) openCase(tile);
}

/* ---- the zoom between the tile and the full view ---- */
const ZOOM_IN = { duration: 0.52, ease: "cubic-bezier(.16,1,.3,1)", fade: "opacity .3s ease" };
const ZOOM_OUT = { duration: 0.45, ease: "cubic-bezier(.22,1,.36,1)", fade: "opacity .35s ease .1s" };

/* animates a copy of the tile between its spot in the grid and the full screen, then calls done */
function zoomTile(tile, { opening }, done) {
  const inner = $(".tile-in", tile);
  const rect = tile.getBoundingClientRect(),
    radius = getComputedStyle(inner).borderRadius;
  const ghost = document.createElement("div");
  ghost.className = "case-ghost";
  ghost.style.background = getComputedStyle(inner).backgroundColor;
  const content = inner.cloneNode(true);
  content.classList.add("case-ghost-content");
  content.style.cssText =
    "position:absolute;inset:0;border:0;background:transparent;transform:none;border-radius:0;";
  ghost.appendChild(content);

  const atTile = {
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    borderRadius: radius,
  };
  const atFull = { top: "0", left: "0", width: "100vw", height: "100vh", borderRadius: "0" };
  const [from, to] = opening ? [atTile, atFull] : [atFull, atTile];
  const timing = opening ? ZOOM_IN : ZOOM_OUT;
  Object.assign(ghost.style, from);
  content.style.opacity = opening ? "1" : "0";
  document.body.appendChild(ghost);
  if (!opening) caseView.classList.remove("open");

  requestAnimationFrame(() => {
    ghost.style.transition = ["top", "left", "width", "height", "border-radius"]
      .map((p) => `${p} ${timing.duration}s ${timing.ease}`)
      .join(",");
    content.style.transition = timing.fade;
    Object.assign(ghost.style, to);
    content.style.opacity = opening ? "0" : "1";
  });
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    ghost.remove();
    done();
  };
  ghost.addEventListener("transitionend", (e) => e.propertyName === "width" && finish());
  setTimeout(finish, opening ? 560 : 500);
}

/* ---- open, swap and close ---- */
function openCase(tile) {
  if (isLocked(tile)) return requestUnlock(tile);
  if (caseOpen) {
    if (tile !== currentTile) swapCase(tile);
    return;
  }
  currentTile = tile;
  caseOpen = true;
  setCaseHash(tile);
  focusBeforeCase = document.activeElement;
  savedScroll = scrollY;
  buildCaseContent(tile);
  pageLock.lock();
  /* the logo and the day/night switch stay usable on top of an open case study */
  document.documentElement.classList.add("case-open");
  $("#themeSw").removeAttribute("inert");
  const shown = () => {
    caseView.classList.add("open");
    caseView.scrollTop = 0;
    $("#caseClose").focus({ preventScroll: true });
  };
  if (REDUCED_MOTION) shown();
  else zoomTile(tile, { opening: true }, shown);
}

/* swap the open case study for another one in place (used by the previous / next cards) */
function swapCase(tile) {
  currentTile = tile;
  setCaseHash(tile);
  const inner = $(".case-inner", caseView);
  const show = () => {
    buildCaseContent(tile);
    caseView.scrollTo({ top: 0 });
    inner.style.opacity = "1";
    inner.style.transform = "none";
    caseTitle.setAttribute("tabindex", "-1");
    caseTitle.focus({ preventScroll: true });
  };
  if (REDUCED_MOTION) return show();
  inner.style.transition = "opacity .25s ease,transform .25s ease";
  inner.style.opacity = "0";
  inner.style.transform = "translateY(8px)";
  setTimeout(show, 250);
}

function closeCase({ fromHistory = false } = {}) {
  if (!caseOpen) return;
  /* step back through the history entry we added, so Back and the close button stay in sync */
  if (pushedHistory && !fromHistory) {
    pushedHistory = false;
    history.back();
    return;
  }
  caseOpen = false;
  document.documentElement.classList.remove("case-open");
  setCaseHash(null);
  const tile = currentTile;
  const hidden = () => {
    pageLock.unlock();
    scrollTo(0, savedScroll);
    const canReturn =
      focusBeforeCase?.isConnected && focusBeforeCase !== document.body && focusBeforeCase.offsetParent;
    (canReturn ? focusBeforeCase : $(".expand-btn", tile))?.focus({ preventScroll: true });
  };
  if (REDUCED_MOTION) {
    caseView.classList.remove("open");
    hidden();
  } else zoomTile(tile, { opening: false }, hidden);
}

function initCaseView() {
  placeModeThumb = slidingThumb($(".cs-mode-seg", caseMode));
  $$("button", caseMode).forEach((b) => b.addEventListener("click", () => setReadMode(b.dataset.mode)));
  $("#caseClose").addEventListener("click", () => closeCase());
  caseView.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && caseOpen) trapFocus(caseView, e, [$("#brand"), $("#themeSw")]);
  });
  /* in-page links: the "jump to section" bar and the sidebar index */
  caseView.addEventListener("click", (e) => {
    const a = e.target.closest(".cs-anchors a, .case-toc a");
    if (!a) return;
    e.preventDefault();
    scrollCaseTo(a.getAttribute("href"));
  });
  caseView.addEventListener("scroll", () => requestAnimationFrame(syncToc), { passive: true });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && caseOpen) closeCase();
  });
  addEventListener("popstate", () => {
    if (caseOpen && !location.hash) {
      pushedHistory = false;
      closeCase({ fromHistory: true });
    }
  });
  addEventListener("hashchange", openFromHash);
  /* a shared link opens its case study once the grid has finished loading */
  if (location.hash) setTimeout(openFromHash, 650);
}
