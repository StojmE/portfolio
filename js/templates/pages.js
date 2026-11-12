/*
 * Templates for the lists inside the dialogs and pages: talks, jobs, education and community,
 * and the photos on the talks page. Every word comes from js/content.js.
 */
"use strict";

const extLink = (cls, href, html) =>
  `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${html}</a>`;

function talksHtml() {
  return TALKS.map((t) => {
    const page = extLink("sp-link", t.url, rich(t.urlLabel));
    const links = t.video
      ? `<p class="sp-links">${extLink("sp-link sp-watch", t.video, ICONS.play + rich(SITE.talks.watch))} ${page}</p>`
      : page;
    return `<li><p class="sp-meta">${rich(t.date)} · ${rich(t.kind)} · ${rich(t.place)}</p><h3>${rich(t.title)}${t.language ? ` <span class="sp-lang">${rich(t.language)}</span>` : ""}</h3><p class="sp-event">${rich(t.event)}</p><p>${rich(t.summary)}</p>${links}</li>`;
  }).join("");
}

function jobsHtml() {
  return SITE.workHistory.jobs
    .map(
      (j) =>
        `<li class="wh-item${j.current ? " wh-now" : ""}"><span class="wh-dot" aria-hidden="true"></span><p class="wh-date">${rich(j.date)}</p><h3>${rich(j.role)} <span>· ${rich(j.company)}</span>${
          j.tag ? ` <em class="wh-tag">${rich(j.tag)}</em>` : ""
        }</h3><p class="wh-kind">${rich(j.kind)}</p><ul>${j.points.map((p) => `<li>${rich(p)}</li>`).join("")}</ul></li>`,
    )
    .join("");
}

const extrasHtml = () =>
  SITE.workHistory.extras.map((x) => `<div><h4>${rich(x.title)}</h4><p>${rich(x.text)}</p></div>`).join("");

/* talks page photos: enlarge in the same lightbox as the case-study screenshots */
const galleryHtml = () =>
  SITE.talks.gallery
    .map((g) => `<figure>${shotButton(g.img, g.alt)}<figcaption>${rich(g.caption)}</figcaption></figure>`)
    .join("");

/* each [data-list] element in index.html names one of these */
const LIST_TEMPLATES = { talks: talksHtml, jobs: jobsHtml, extras: extrasHtml, gallery: galleryHtml };
