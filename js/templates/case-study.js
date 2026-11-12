/*
 * Case-study templates: turn a content object from js/cases/*.js into the case-study page markup.
 * No words live here; js/content-guide.md documents every block type the content files can use.
 */
"use strict";

const num = (n, width = 2) => String(n).padStart(width, "0");
const pairsHtml = (list, cls, label) =>
  `<div class="${cls}"${label ? ` aria-label="${esc(label)}"` : ""}>${list
    .map(([value, text]) => `<div><b>${rich(value)}</b><span>${rich(text)}</span></div>`)
    .join("")}</div>`;

/* a screenshot that opens in the lightbox; also used by the talks page gallery */
const shotButton = (img, alt, extraStyle = "") =>
  `<button type="button" class="cs-shot" style="background-image:url('${img}')${extraStyle}" data-src="${img}" data-alt="${esc(alt)}" aria-label="${esc(fill(SITE.caseStudy.enlargeLabel, { alt }))}"></button>`;

const shotHtml = (s) =>
  `<figure${s.wide ? ' class="cs-wide"' : ""}>${shotButton(s.img, s.alt, s.ratio ? `;aspect-ratio:${s.ratio}` : "")}<figcaption><b>${rich(s.label)}</b>${rich(s.text)}</figcaption></figure>`;

/* one renderer per block type; `ctx` carries running numbers and where the block sits */
const BLOCKS = {
  subheading: (v) => `<h3 class="cs-sub-h">${rich(v)}</h3>`,
  statement: (v) => `<p class="cs-statement">${rich(v)}</p>`,
  hmw: (v) => `<p class="cs-hmw">${rich(v)}</p>`,
  lead: (v) => `<p class="cs-sub">${rich(v)}</p>`,
  shotsIntro: (v) => `<p class="cs-shots-intro">${rich(v)}</p>`,
  principle: (v) => `<blockquote class="cs-principle">${rich(v)}</blockquote>`,
  quote: (v) => `<blockquote class="cs-quote">${rich(v)}</blockquote>`,
  mini: (v) => `<h4 class="cs-mini">${rich(v)}</h4>`,
  impact: (v) =>
    `<ol class="cs-impact">${v
      .map(
        ([t, d], i) =>
          `<li><span>${num(i + 1, 3)}</span><div><strong>${rich(t)}</strong> ${rich(d)}</div></li>`,
      )
      .join("")}</ol>`,
  flow: (v) => `<ol class="cs-flow">${v.map((t) => `<li>${rich(t)}</li>`).join("")}</ol>`,
  list: (v) => `<ul class="cs-dash">${v.map((t) => `<li>${rich(t)}</li>`).join("")}</ul>`,
  chips: (v) => `<ul class="cs-chips">${v.map((t) => `<li>${rich(t)}</li>`).join("")}</ul>`,
  /* cards directly under a section heading are level-3 headings for screen readers */
  cards: (v, ctx) =>
    `<div class="cs-hypo">${v
      .map(
        ([t, d]) =>
          `<div><h4${ctx.depth === 0 ? ' aria-level="3"' : ""}>${rich(t)}</h4><p>${rich(d)}</p></div>`,
      )
      .join("")}</div>`,
  decisionFlow: (v) =>
    `<ol class="cs-dflow">${v
      .map((s) =>
        s.result
          ? `<li class="cs-dflow-end"><span>→</span><b>${rich(s.title)}</b><p>${rich(s.text)}</p></li>`
          : `<li><b>${rich(s.title)}</b><p>${rich(s.text)}</p></li>`,
      )
      .join("")}</ol>`,
  table: (v) =>
    `<div class="cs-table" role="table" aria-label="${esc(v.label)}"><div class="cs-row cs-head" role="row">${v.columns
      .map((c) => `<span role="columnheader">${rich(c)}</span>`)
      .join("")}</div>${v.rows
      .map(
        (r) =>
          `<div class="cs-row" role="row">${r.map((c) => `<span role="cell">${rich(c)}</span>`).join("")}</div>`,
      )
      .join("")}</div>`,
  shots: (v, ctx, b) => {
    const mods = (b.layout || "")
      .split(" ")
      .filter(Boolean)
      .map((m) => " cs-shots-" + m)
      .join("");
    return `<div class="cs-shots${mods}">${v.map(shotHtml).join("")}</div>`;
  },
  phones: (v, ctx, b) =>
    `<div class="cs-phones${b.single ? " cs-phones-one" : ""}">${v.map(shotHtml).join("")}</div>`,
  metrics: (v) => pairsHtml(v, "cs-metrics"),
  stats: (v) => pairsHtml(v, "cs-stats"),
  next: (v) =>
    `<ol class="cs-next">${v.map(([t, d]) => `<li><div><b>${rich(t)}</b><p>${rich(d)}</p></div></li>`).join("")}</ol>`,
  live: (v) =>
    `<div class="cs-live"><span class="cs-live-badge"><i></i>${esc(SITE.caseStudy.live)}</span><ul class="cs-markets">${v
      .map((t) => `<li>${rich(t)}</li>`)
      .join("")}</ul></div>`,
  more: (v) =>
    `<p class="cs-more"><a href="${esc(v.href)}" target="_blank" rel="noopener noreferrer">${rich(v.text)}</a></p>`,
  prototype: (v) =>
    `<a class="cs-proto" data-embed="${esc(v.embed)}" href="${esc(v.href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(v.label)}"><span class="cs-proto-img" style="background-image:url('${v.img}')"></span><span class="cs-proto-bar"><span class="cs-proto-txt"><strong>${rich(v.title)}</strong><span>${rich(v.text)}</span></span><span class="cs-proto-btn">${rich(v.button)}</span></span></a>`,
  step: (v, ctx) =>
    `<div class="cs-step"><span class="cs-step-n">${num(++ctx.step)}</span><div><h3>${rich(v.title)}</h3>${blocksHtml(v.body || [], { depth: ctx.depth + 1 })}</div></div>`,
  decision: (v, ctx) =>
    `<article class="cs-dec"><div class="cs-dec-top"><span class="cs-dec-n">${num(++ctx.decision)}</span><span class="cs-tag">${rich(v.tag)}</span></div><h3>${rich(v.title)}</h3>${
      v.text ? `<p>${rich(v.text)}</p>` : ""
    }${
      v.before || v.after
        ? `<div class="cs-ba"><div><h4>${esc(SITE.caseStudy.before)}</h4><p>${rich(v.before)}</p></div><div><h4>${esc(SITE.caseStudy.after)}</h4><p>${rich(v.after)}</p></div></div>`
        : ""
    }${blocksHtml(v.body || [], { depth: ctx.depth + 1 })}</article>`,
};

function blocksHtml(blocks, ctx = { depth: 0 }) {
  ctx.step = ctx.step || 0;
  ctx.decision = ctx.decision || 0;
  return blocks
    .map((b) => {
      if (typeof b === "string") return `<p>${rich(b)}</p>`;
      const type = Object.keys(b).find((k) => BLOCKS[k]);
      if (!type) throw new Error("Unknown case-study block: " + JSON.stringify(b).slice(0, 80));
      return BLOCKS[type](b[type], ctx, b);
    })
    .join("");
}

function renderCase(c) {
  const t = SITE.caseStudy;
  const facts = `<dl class="cs-rows">${c.facts.map(([k, v]) => `<div><dt>${rich(k)}</dt><dd>${rich(v)}</dd></div>`).join("")}</dl>`;
  const s = c.summary;
  const summary = `<div class="cs-inshort"><h2>${esc(t.summary)}</h2><p>${rich(s.text)}</p>${
    s.results ? pairsHtml(s.results, "cs-stats cs-results", t.resultsLabel) : ""
  }${blocksHtml(s.blocks || [], { depth: 1 })}</div>`;
  const jump = c.sections.filter((x) => x.nav);
  const nav = jump.length
    ? `<nav class="cs-anchors" aria-label="${esc(t.jumpLabel)}">${jump
        .map((x) => `<a href="#${x.id}">${rich(x.nav)}</a>`)
        .join("")}</nav>`
    : "";
  const sections = c.sections
    .map(
      (x) =>
        `<section id="${x.id}" class="cs-sec"><p class="cs-eyebrow">${rich(x.eyebrow)}</p><h2 class="cs-h">${rich(x.title)}</h2>${blocksHtml(x.blocks)}</section>`,
    )
    .join("");
  return facts + summary + nav + sections + `<p class="cs-foot">${esc(t.signature)}</p>`;
}

/* a "previous / next case study" card with a small cover preview */
function caseNavCardHtml(slug, dir, { locked }) {
  const c = CASE_CONTENT[slug],
    t = SITE.caseStudy;
  const label = dir === "prev" ? t.previous : t.next;
  const arrow = lineIcon(dir === "prev" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6", {
    width: 2,
    cls: "cs-nc-ic",
  });
  return `<button type="button" class="cs-next-case cs-nc-${dir}" data-slug="${slug}" aria-label="${esc(`${label}: ${c.title}`)}"><span class="cs-nc-thumb">${coverHtml(slug)}</span><span class="cs-nc-copy"><span class="cs-nc-label">${arrow}${esc(label)}${locked ? esc(t.lockedSuffix) : ""}</span><span class="cs-nc-title">${esc(c.name)}</span><span class="cs-nc-kicker">${esc(c.kicker)}</span></span></button>`;
}

/* every case study gets its page markup once, up front */
for (const c of Object.values(CASE_CONTENT)) c.html = renderCase(c);
