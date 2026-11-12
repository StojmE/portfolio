/*
 * The bento grid: builds the tiles from GRID, wires what each tile does when opened, and adds
 * the loading skeleton, drag to reorder, link prefetching and the tone of the small corner marks.
 */
"use strict";

const grid = $("#grid");
const tileEntries = new WeakMap(); /* tile element → its GRID entry */

const tileOf = (slug) => $(`.tile[data-slug="${CSS.escape(slug)}"]`, grid);
const caseTiles = () => $$(".tile.case", grid);

function buildGrid() {
  grid.innerHTML = GRID.map(tileHtml).join("");
  $$(".tile", grid).forEach((tile, i) => tileEntries.set(tile, GRID[i]));
}

/* what the corner button does, in words a screen-reader user can act on */
function actionLabel(tile) {
  const entry = tileEntries.get(tile),
    t = SITE.tiles;
  switch (entry.type) {
    case "case": {
      const action = isLocked(tile) ? t.caseStudy.actionLocked : t.caseStudy.action;
      return fill(action, { name: CASE_CONTENT[entry.slug].name });
    }
    case "testimonial":
      return fill(t.testimonial.action, TESTIMONIALS[entry.area]);
    default:
      return t[entry.type].action;
  }
}

/* open whatever the tile leads to */
function activateTile(tile) {
  const entry = tileEntries.get(tile);
  const open = {
    intro: () => dialogs.about.open(),
    work: () => dialogs.work.open(),
    speaking: () => dialogs.speaking.open(),
    testimonial: () => openTestimonial(entry.area),
    case: () => openCase(tile),
  }[entry.type];
  open?.();
}

/* LinkedIn and Medium open the profile in a new tab instead of expanding */
function linkTile(tile, url, label) {
  const a = document.createElement("a");
  a.className = "icon-chip expand-btn";
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", label);
  a.innerHTML = ICONS.external;
  a.addEventListener("click", (e) => e.stopPropagation());
  tile.appendChild(a);
  tile.addEventListener("click", () => window.open(url, "_blank", "noopener"));
}

/* the email tile copies the address instead of expanding */
function emailTile(tile, btn) {
  const t = SITE.tiles.email;
  const idle = () => {
    btn.classList.remove("copied");
    btn.innerHTML = ICONS.copy;
    btn.setAttribute("aria-label", t.copy);
  };
  let resetTimer = null;
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(EMAIL_ADDRESS).catch(() => {});
    announce(t.announce);
    bubble.say(t.bubbleCopied);
    replayClass(tile, "sent");
    setTimeout(() => tile.classList.remove("sent"), 720);
    btn.classList.add("copied");
    btn.innerHTML = `${ICONS.check}<span class="copy-label">${rich(t.copied)}</span>`;
    btn.setAttribute("aria-label", t.copied);
    clearTimeout(resetTimer);
    resetTimer = setTimeout(idle, 1800);
  };
  idle();
  btn.addEventListener("click", copy);
  tile.appendChild(btn);
  tile.addEventListener("click", copy);
}

function wireTiles() {
  $$(".tile", grid).forEach((tile) => {
    const { type } = tileEntries.get(tile);
    if (CAN_HOVER) {
      tile.setAttribute("draggable", "true");
      tile.insertAdjacentHTML(
        "beforeend",
        `<span class="drag-hint" aria-hidden="true">${ICONS.dragGrip}</span>`,
      );
    }
    tile.style.userSelect = "none";
    if (type === "medium") return linkTile(tile, LINKS.medium, SITE.tiles.medium.action);
    if (type === "linkedin") return linkTile(tile, LINKS.linkedin, SITE.tiles.linkedin.action);
    if (type === "soon") return; /* nothing to open yet */

    const btn = document.createElement("button");
    btn.className = "icon-chip expand-btn";
    btn.type = "button";
    if (type === "email") return emailTile(tile, btn);

    btn.setAttribute("aria-label", actionLabel(tile));
    btn.innerHTML = ICONS.expand;
    tile.appendChild(btn);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      activateTile(tile);
    });
    tile.addEventListener("click", () => activateTile(tile));
  });
}

/* case-study screenshots load only when a case opens; warm them up when a visitor shows interest */
function prefetchCaseImages() {
  const done = new Set();
  const prefetch = (slug) => {
    if (done.has(slug)) return;
    done.add(slug);
    for (const [, src] of CASE_CONTENT[slug].html.matchAll(/url\('([^']+)'\)/g)) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    }
  };
  caseTiles().forEach((tile) => {
    const go = () => prefetch(tile.dataset.slug);
    tile.addEventListener("pointerenter", go, { once: true });
    tile.addEventListener("focusin", go, { once: true });
  });
}

/* the drag dots and the password tag: dark on light tiles, light on dark tiles */
function toneTileMarks() {
  $$(".tile", grid).forEach((tile) => {
    const lum = [$(".cover", tile), $(".tile-in", tile), document.body]
      .map((el) => el && luminance(getComputedStyle(el).backgroundColor))
      .find((l) => l != null);
    $$(".drag-hint, .lock-badge", tile).forEach((mark) => mark.classList.toggle("on-dark", lum < 0.5));
  });
}

/* the talks tile's title fills its column on one line: the type grows or shrinks until it fits */
function fitTalksTitle() {
  $$(".talks-title", grid).forEach((h) => {
    h.style.fontSize = "";
    const room = h.parentElement.clientWidth;
    if (!room || !h.scrollWidth) return;
    const size = parseFloat(getComputedStyle(h).fontSize);
    h.style.fontSize = Math.min(40, Math.max(9, (size * room) / h.scrollWidth - 0.2)) + "px";
  });
}

/* drag to reorder: for this visit only; the saved layout is GRID in js/config.js */
function enableDragReorder() {
  let dragged = null,
    over = null;
  const clearOver = () => {
    if (over) over.style.boxShadow = "";
    over = null;
  };
  grid.addEventListener("dragstart", (e) => {
    if (!e.target.classList.contains("tile")) return;
    dragged = e.target;
    dragged.style.opacity = "0.5";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", dragged.innerHTML);
    e.dataTransfer.setDragImage(dragged, e.offsetX, e.offsetY);
  });
  grid.addEventListener("dragover", (e) => {
    const tile = e.target.closest(".tile");
    if (!dragged || !tile || tile === dragged) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    /* tiles move live as the pointer passes over them */
    const tiles = $$(".tile", grid);
    if (tiles.indexOf(dragged) < tiles.indexOf(tile)) tile.after(dragged);
    else tile.before(dragged);
    over = tile;
    tile.style.boxShadow = "0 0 0 3px rgba(165,139,245,0.7)";
  });
  grid.addEventListener("dragleave", (e) => {
    if (over && e.target.closest(".tile") === over) clearOver();
  });
  grid.addEventListener("drop", (e) => {
    if (!dragged) return;
    e.preventDefault();
    rememberTileOrder();
    announce(SITE.tiles.reordered);
    clearOver();
  });
  grid.addEventListener("dragend", (e) => {
    if (!e.target.classList.contains("tile")) return;
    e.target.style.opacity = "1";
    e.target.style.boxShadow = "";
    clearOver();
    dragged = null;
  });
}

/* loading skeleton: one placeholder per tile, shaped like its content, until fonts and covers are ready */
function showSkeletonUntilReady(onReady) {
  const bar = (w) => `<i style="height:12px;width:${w}%"></i>`;
  const shapes = {
    card: `<i class="sk-av"></i><div class="sk-lines"><i style="height:20px;width:75%"></i>${bar(92)}${bar(84)}${bar(60)}</div>`,
    icon: `<i></i>`,
    visual: `<div class="sk-lines"><i style="height:16px;width:70%"></i>${bar(45)}</div>`,
  };
  $$(".tile-in", grid).forEach((inner) => {
    const type = ["card", "icon"].find((t) => inner.classList.contains(t)) || "visual";
    const sk = document.createElement("div");
    sk.className = "sk sk-" + type;
    sk.setAttribute("aria-hidden", "true");
    sk.innerHTML = shapes[type];
    inner.appendChild(sk);
  });
  grid.setAttribute("aria-busy", "true");

  const decode = (src) => {
    const img = new Image();
    img.src = src;
    return img.decode().catch(() => {});
  };
  const images = [PORTRAIT_IMG, ...Object.values(COVERS).map((c) => c.shot?.src || c.phones[0].src)];
  const ready = Promise.all([document.fonts?.ready, ...images.map(decode)]);
  const minimum = new Promise((r) => setTimeout(r, 200)); /* reads as a load state, not a flicker */
  const cap = new Promise((r) => setTimeout(r, 4000)); /* never hold content back on a slow connection */
  Promise.race([Promise.all([ready, minimum]), cap]).then(() => {
    document.documentElement.classList.add("loaded");
    grid.removeAttribute("aria-busy");
    onReady();
    /* the Medium letters write themselves once, then rest */
    setTimeout(() => document.documentElement.classList.add("md-written"), 2800);
    setTimeout(() => $$(".sk", grid).forEach((s) => s.remove()), 600);
  });
}

function initGrid() {
  buildGrid();
  wireTiles();
  prefetchCaseImages();
  if (CAN_HOVER) enableDragReorder();
  showSkeletonUntilReady(() => {
    toneTileMarks();
    fitTalksTitle();
  });
  /* re-tone once the theme colours have finished fading */
  new MutationObserver(() => setTimeout(toneTileMarks, 450)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  addEventListener("resize", () => requestAnimationFrame(fitTalksTitle));
  document.fonts?.ready.then(fitTalksTitle);
}
