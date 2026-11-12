/*
 * Grid tile templates. GRID in js/config.js lists the tiles in order; each entry's `type`
 * picks one of the templates below. All words come from js/content.js and the case studies.
 */
"use strict";

/* a case-study cover: logo, title and tags, plus a screenshot or two phones */
function coverHtml(slug) {
  const cover = COVERS[slug],
    c = CASE_CONTENT[slug];
  const shots = cover.phones
    ? cover.phones
        .map(
          (p) =>
            `<img class="cv-shot cv-phone" src="${p.src}" alt="" style="left:${p.x}cqw;top:${p.y}cqw;width:${p.width}cqw">`,
        )
        .join("")
    : `<img class="cv-shot" src="${cover.shot.src}" alt="" style="left:${cover.shot.x}cqw;width:${cover.shot.width}cqw">`;
  return `<div class="cover cover-${slug}" style="--cv-bg-l:${cover.bg};--cv-ink-l:${cover.ink};--cv-kick-l:${cover.kick}"><div class="cv-in"><div class="cv-text"><svg class="cv-logo cv-logo-${slug}" viewBox="${cover.logo.viewBox}" fill="currentColor" aria-hidden="true">${cover.logo.paths}</svg><p class="cv-title">${rich(c.title)}</p><p class="cv-kicker">${rich(c.kicker)}</p></div>${shots}</div></div>`;
}

/* the outer tile: role, grid span, filter category and the cursor-bubble message */
function tileShell(entry, { cls = "", cat, label, bubble, attrs = "" }, inner) {
  const [cols, rows] = entry.size;
  return `<div class="tile${cls ? " " + cls : ""}" role="listitem" data-area="${entry.area}" data-cat="${cat}"${attrs} aria-label="${esc(label)}" data-msg="${esc(bubble)}" data-cols="${cols}" data-rows="${rows}">${inner}</div>`;
}

/* a decorative kit of wireframe components (button, toggle, field, checkbox, swatches, slider, tags, card) */
const DS_KIT = `<div class="ds" aria-hidden="true"><div class="ds-row"><span class="ds-btn"><i></i></span><span class="ds-toggle"><i></i></span></div><div class="ds-input"><i class="ds-text"></i><i class="ds-caret"></i></div><div class="ds-row"><span class="ds-check"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2 5 8.6 9.6 3.4"/></svg></span><i class="ds-line"></i><span class="ds-type">Aa</span></div><div class="ds-swatches"><i></i><i></i><i></i><i></i><i></i></div><div class="ds-slider"><i class="ds-fill"></i><i class="ds-knob"></i></div><div class="ds-row"><span class="ds-chip ds-c1"></span><span class="ds-chip ds-c2"></span><span class="ds-chip ds-c3"></span></div><div class="ds-card"><span class="ds-avatar"></span><span class="ds-lines"><i></i><i></i></span></div></div>`;

const TILE_TEMPLATES = {
  intro(entry, t = SITE.tiles.intro) {
    return tileShell(
      entry,
      { cat: "about", label: t.label, bubble: t.bubble },
      `<div class="tile-in card"><div class="card-copy"><div class="intro-av" role="img" aria-label="${esc(t.photoAlt)}" style="background-image:url('${PORTRAIT_IMG}')"></div><div class="card-copy-inner"><h2>${rich(t.greeting)} <span class="wave-emoji" aria-hidden="true">👋</span></h2><p>${rich(t.text)}</p></div></div></div>`,
    );
  },

  /* the pixel character; opens the work history */
  work(entry, t = SITE.tiles.work) {
    return tileShell(
      entry,
      { cls: "work-tile", cat: "about", label: t.label, bubble: t.bubble },
      `<div class="tile-in wk"><div class="wk-px" role="img" aria-label="${esc(t.imageAlt)}" style="--px:${cssUrl(AVATAR_PIXEL_IMG)}"></div><p class="wk-label"><span>${rich(t.title)}</span><b>${rich(t.years)}</b></p></div>`,
    );
  },

  email: (entry) => iconTile(entry, LOGOS.gmail, SITE.tiles.email),
  linkedin: (entry) => iconTile(entry, LOGOS.linkedin, SITE.tiles.linkedin),
  medium: (entry) => iconTile(entry, LOGOS.medium, SITE.tiles.medium),

  case(entry, t = SITE.tiles.caseStudy) {
    const c = CASE_CONTENT[entry.slug],
      locked = !!entry.locked;
    return tileShell(
      entry,
      {
        cls: "no-zoom case",
        cat: "work",
        label: fill(t.label, { name: c.name }),
        bubble: locked ? t.bubbleLocked : t.bubble,
        attrs: `${locked ? ' data-locked="true"' : ""} data-slug="${entry.slug}" data-tone="${COVERS[entry.slug].tone}"`,
      },
      `<div class="tile-in visualwrap"><div class="visual"><div class="ph-img">${coverHtml(entry.slug)}</div></div>${
        locked ? `<div class="lock-badge">${ICONS.lock}<span>${rich(t.locked)}</span></div>` : ""
      }</div>`,
    );
  },

  testimonial(entry, w = SITE.tiles.testimonial) {
    const t = TESTIMONIALS[entry.area];
    return tileShell(
      entry,
      { cls: "testimonial", cat: "testimonials", label: fill(w.label, t), bubble: w.bubble },
      `<div class="tile-in tm"><div class="tm-head"><span class="tm-mark" aria-hidden="true">“</span><span class="tm-label">${rich(w.heading)}</span></div><p class="tm-quote">${rich(t.short)}</p><p class="tm-by"><span class="tm-who"><b>${rich(t.name)}</b><span>${rich(t.role)}</span></span></p></div>`,
    );
  },

  /* an upcoming project: badge, title and the component kit; it doesn't open anything yet */
  soon(entry, t = SITE.tiles.aiSystem) {
    return tileShell(
      entry,
      { cls: "soon", cat: "work", label: t.label, bubble: t.bubble },
      `<div class="tile-in soon-in"><div class="soon-copy"><span class="soon-badge">${ICONS.spark}<span>${rich(t.badge)}</span></span><h2 class="soon-title">${rich(t.title)}</h2></div>${DS_KIT}</div>`,
    );
  },

  /* talks and community: the latest talks; opens the talks page */
  speaking(entry, w = SITE.tiles.speaking) {
    const talks = TALKS.map((t) => {
      const lang = t.langCode
        ? ` <span class="talks-lang" title="${esc(t.language)}"><span aria-hidden="true">${rich(t.langCode)}</span><span class="sr-only">${rich(t.language)}</span></span>`
        : "";
      const video = t.video ? ` · <span class="talks-video">${rich(w.video)}</span>` : "";
      return `<li><span class="talks-date">${rich(t.date)}<span class="talks-kind"> · ${rich(t.kind)}</span>${lang}</span><b>${rich(t.title)}</b><span class="talks-event">${rich(t.event)}${video}</span></li>`;
    }).join("");
    return tileShell(
      entry,
      { cls: "speaking-tile", cat: "about", label: w.label, bubble: w.bubble },
      `<div class="tile-in talks"><div class="talks-in"><div class="talks-intro">${PIXEL_MIC}${LOGOS.uxplore}<h2 class="talks-title">${rich(w.title)}</h2><p class="talks-desc">${rich(w.text)}</p></div><div class="talks-bottom"><ul class="talks-list">${talks}</ul></div></div></div>`,
    );
  },
};

/* email, LinkedIn and Medium: a brand mark that fills the tile */
function iconTile(entry, logo, t) {
  return tileShell(
    entry,
    { cls: entry.area, cat: "about", label: t.label, bubble: t.bubble },
    `<div class="tile-in icon">${logo}</div>`,
  );
}

const tileHtml = (entry) => TILE_TEMPLATES[entry.type](entry);
