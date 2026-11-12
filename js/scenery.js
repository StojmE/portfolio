/*
 * Seasonal scenery band along the bottom of the page: spring blooms, summer shore,
 * autumn harvest, winter snow. Each plant leans away from the cursor like a breeze.
 */
"use strict";

(() => {
  const INK = 'stroke="currentColor" stroke-opacity=".32" stroke-width="1.5" stroke-linecap="round"';
  const wrap = (h, inner) =>
    `<svg viewBox="0 0 34 80" width="34" height="${h}" fill="none" focusable="false">${inner}</svg>`;

  /* --- spring --- */
  const flower = (h, petal, core, lean, leaf) => ({
    h,
    w: 1,
    svg: wrap(
      h,
      `<path d="M17 80C17 64 ${17 + lean} 56 17 36" ${INK}/>
     <path d="M17 58C${17 - 7 * leaf} 56.5 ${17 - 9.5 * leaf} 52.5 ${17 - 9 * leaf} 48.5 ${17 - 3.5 * leaf} 50 17 53.5 17 58Z" fill="${petal}" fill-opacity=".75"/>
     <g transform="translate(17 27)">${[0, 1, 2, 3, 4].map((n) => `<ellipse rx="4.4" ry="7.2" cy="-7.6" fill="${petal}" transform="rotate(${n * 72})"/>`).join("")}<circle r="3.3" fill="${core}"/></g>`,
    ),
  });

  /* --- summer --- */
  const parasol = (h) => ({
    h,
    w: 0.55,
    svg: wrap(
      h,
      `<path d="M17 80V30" ${INK}/>
     <path d="M2 31a15 13 0 0 1 30 0Z" fill="#FFF2D0"/>
     <path d="M17 18a15 13 0 0 1 7.5 13H17Zm0 0a15 13 0 0 0-7.5 13H17Z" fill="#E36A6A"/>
     <path d="M2 31a15 13 0 0 1 30 0" stroke="#1E1B2B" stroke-opacity=".3" stroke-width="1.4" fill="none"/>`,
    ),
  });
  const cone = (h) => ({
    h,
    w: 0.4,
    svg: wrap(
      h,
      `<path d="M17 80 9.5 52h15Z" fill="#E3B57A" stroke="#1E1B2B" stroke-opacity=".28" stroke-width="1.3" stroke-linejoin="round"/>
     <circle cx="13.5" cy="48" r="6" fill="#FFB2B2"/><circle cx="20.5" cy="48" r="6" fill="#FFF2D0"/>
     <circle cx="17" cy="41" r="6.2" fill="#FFD9D2"/>`,
    ),
  });
  const shell = (h) => ({
    h,
    w: 0.25,
    svg: wrap(
      h,
      `<path d="M17 80 3 60a17 15 0 0 1 28 0Z" fill="#FFD9D2" stroke="#1E1B2B" stroke-opacity=".22" stroke-width="1.2" stroke-linejoin="round"/>
     <path d="M17 78V58M17 78 8 63M17 78l9-15" stroke="#E36A6A" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"/>`,
    ),
  });
  const grass = (h) => ({
    h,
    w: 1,
    svg: wrap(
      h,
      `<path d="M17 80C15 66 12 58 8 50M17 80c0-14 1-24 3-34M17 80c2-12 5-20 9-27" stroke="currentColor" stroke-opacity=".4" stroke-width="1.9" stroke-linecap="round"/>
     <circle cx="20" cy="44" r="3.4" fill="#FFF2D0"/><circle cx="20" cy="44" r="1.5" fill="#E36A6A"/>`,
    ),
  });
  const starfish = (h) => ({
    h,
    w: 0.2,
    svg: wrap(
      h,
      `<g transform="translate(17 68)">${[0, 1, 2, 3, 4].map((n) => `<ellipse rx="3.6" ry="11" cy="-4" fill="#FFC861" transform="rotate(${n * 72})"/>`).join("")}<circle r="2.4" fill="#E39A4A"/></g>`,
    ),
  });

  /* --- autumn --- */
  const leafStem = (h, c, lean) => ({
    h,
    w: 1,
    svg: wrap(
      h,
      `<path d="M17 80C17 64 ${17 + lean} 56 17 40" ${INK}/>
     <g transform="translate(17 30) rotate(${lean * 4})">
       <path d="M0-15C8-10 11-1 0 13-11-1-8-10 0-15Z" fill="${c}"/>
       <path d="M0 11V-12M0 0l5-5M0 2l-5-5" stroke="#1E1B2B" stroke-opacity=".22" stroke-width="1" stroke-linecap="round"/>
     </g>`,
    ),
  });
  const pumpkin = (h, body, mid) => ({
    h,
    w: 0.18,
    svg: wrap(
      h,
      `<g transform="translate(17 80)">
       <ellipse cy="-11" rx="13.5" ry="11" fill="${body}"/>
       <ellipse cy="-11" rx="8" ry="11" fill="${mid}"/>
       <ellipse cy="-11" rx="3" ry="10.8" fill="${body}" fill-opacity=".55"/>
       <path d="M0-21c0-3 .4-5 2.6-6.6" stroke="#6E5A3C" stroke-width="2.4" stroke-linecap="round"/>
       <path d="M2.6-27.6c3 .4 4.6 2.2 4.6 4.4" stroke="#8A7A4E" stroke-width="1.6" stroke-linecap="round"/>
     </g>`,
    ),
  });
  const acorn = (h) => ({
    h,
    w: 0.22,
    svg: wrap(
      h,
      `<g transform="translate(17 80)">
       <path d="M-7.5-15c0 9 3.2 15 7.5 15s7.5-6 7.5-15Z" fill="#E39A4A"/>
       <path d="M-9-15a9 6 0 0 1 18 0Z" fill="#B8542E"/>
       <path d="M0-21v-4.5" stroke="#8A5A32" stroke-width="2" stroke-linecap="round"/>
     </g>`,
    ),
  });

  /* --- winter --- */
  const snowman = (h) => ({
    h,
    w: 0.15,
    svg: wrap(
      h,
      `<g transform="translate(17 80)">
       <circle cy="-12" r="12" fill="#FFFFFF" stroke="#1E1B2B" stroke-opacity=".22" stroke-width="1.3"/>
       <circle cy="-29" r="8.6" fill="#FFFFFF" stroke="#1E1B2B" stroke-opacity=".22" stroke-width="1.3"/>
       <path d="M-8.6-22.5h17.2" stroke="#E36A6A" stroke-width="3.4" stroke-linecap="round"/>
       <path d="M6-22.5c1.5 3 1 6 0 8" stroke="#E36A6A" stroke-width="2.6" stroke-linecap="round"/>
       <circle cx="-3" cy="-31" r="1.2" fill="#1E1B2B"/><circle cx="3" cy="-31" r="1.2" fill="#1E1B2B"/>
       <path d="M0-29.5l4 1.5-4 1.5Z" fill="#E8843C"/>
       <path d="M-12-14l-7-4M12-14l7-4" stroke="#8A6A4E" stroke-width="1.5" stroke-linecap="round"/>
     </g>`,
    ),
  });
  const fir = (h) => ({
    h,
    w: 0.5,
    svg: wrap(
      h,
      `<path d="M17 80v-9" stroke="#8A6A4E" stroke-width="3" stroke-linecap="round"/>
     <path d="M17 26 30 52H4Z" fill="#5E7A66"/><path d="M17 14 28 38H6Z" fill="#6D8A74"/>
     <path d="M17 6 25 26H9Z" fill="#7C9982"/>`,
    ),
  });
  const drift = (h) => ({
    h,
    w: 0.1,
    svg: wrap(h, `<path d="M0 80c4-9 9-13 17-13s13 4 17 13Z" fill="#FFFFFF" fill-opacity=".92"/>`),
  });
  const flake = (h) => ({
    h,
    w: 1,
    svg: wrap(
      h,
      `<path d="M17 80V40" ${INK}/>
     <g transform="translate(17 30)" stroke="#C8D8E4" stroke-width="2" stroke-linecap="round">
       ${[0, 1, 2].map((n) => `<path d="M-10 0h20" transform="rotate(${n * 60})"/>`).join("")}
       ${[0, 1, 2].map((n) => `<path d="M-5-4l0 0M-6 0l3-3M6 0l-3-3" transform="rotate(${n * 120})"/>`).join("")}
     </g>`,
    ),
  });

  const SEASONS = {
    spring: [
      flower(54, "#FFB2B2", "#E36A6A", -3, 1),
      flower(72, "#FFD9D2", "#E36A6A", 2, -1),
      flower(46, "#FFF2D0", "#FFB2B2", -1, 1),
      flower(80, "#FFB2B2", "#C24A4A", 3, -1),
      flower(60, "#FFC9C9", "#E36A6A", -2, 1),
      flower(88, "#FFB2B2", "#E36A6A", 1, -1),
      flower(50, "#FFF2D0", "#E36A6A", -3, 1),
      flower(68, "#FFD9D2", "#C24A4A", 2, -1),
      flower(56, "#FFB2B2", "#E36A6A", -1, 1),
    ],
    summer: [
      grass(58),
      cone(70),
      grass(46),
      parasol(86),
      shell(62),
      grass(64),
      starfish(58),
      parasol(74),
      grass(52),
    ],
    autumn: [
      leafStem(62, "#E39A4A", -3),
      pumpkin(68, "#E8843C", "#F3A164"),
      leafStem(74, "#D2703A", 2),
      acorn(66),
      leafStem(54, "#C24A4A", -2),
      pumpkin(56, "#D2703A", "#E8843C"),
      leafStem(80, "#E8843C", 3),
      leafStem(48, "#E39A4A", -1),
      acorn(58),
    ],
    winter: [fir(70), drift(58), flake(58), snowman(92), drift(50), fir(54), flake(70), drift(62), fir(82)],
  };

  function currentSeason(d = new Date()) {
    const m = d.getMonth() + 1;
    return m <= 2 || m === 12 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn";
  }
  /* the band follows today's date; ?season=winter (etc.) previews another season */
  const seasonOverride = new URLSearchParams(location.search).get("season");
  const SEASON = SEASONS[seasonOverride] ? seasonOverride : currentSeason();

  const bloomRow = $("#blooms");
  if (bloomRow) {
    const meadow = $(".meadow");
    let blooms = [];
    function plant() {
      const art = SEASONS[SEASON];
      meadow.dataset.season = SEASON;
      const n = Math.max(5, Math.min(46, Math.round(innerWidth / 64)));
      bloomRow.innerHTML = Array.from({ length: n }, (_, i) => {
        const sp = art[i % art.length];
        return `<span class="bloom" style="--i:${i % 9};--amp:${sp.w.toFixed(2)}" data-w="${sp.w}"><span class="idle">${sp.svg}</span></span>`;
      }).join("");
      blooms = $$(".bloom", bloomRow);
      snowfall();
    }
    /* winter gets a little snow drifting through the band */
    function snowfall() {
      const old = $(".snow", meadow);
      if (old) old.remove();
      if (SEASON !== "winter" || REDUCED_MOTION) return;
      const f = document.createElement("div");
      f.className = "snow";
      f.innerHTML = Array.from(
        { length: 16 },
        (_, i) =>
          `<i style="left:${i * 6.4 + Math.round((i * 13) % 7)}%;--d:${(6 + (i % 5) * 1.7).toFixed(1)}s;--dl:${(i * 0.63).toFixed(2)}s;--s:${(i % 3) + 2}px"></i>`,
      ).join("");
      meadow.appendChild(f);
    }
    plant();
    let replantTimer = null;
    addEventListener("resize", () => {
      clearTimeout(replantTimer);
      replantTimer = setTimeout(plant, 180);
    });
    /* each plant bends away from a nearby cursor, more the closer it is */
    let frame = null;
    addEventListener("pointermove", (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const top = meadow.getBoundingClientRect().top;
        const reach = Math.exp(-Math.max(0, top - e.clientY) / 150);
        blooms.forEach((bl) => {
          const r = bl.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const near = Math.exp(-Math.abs(dx) / 95);
          bl.style.setProperty(
            "--bend",
            ((dx > 0 ? -1 : 1) * near * reach * 14 * (+bl.dataset.w || 1)).toFixed(2) + "deg",
          );
        });
      });
    });
    addEventListener("pointerleave", () => blooms.forEach((bl) => bl.style.setProperty("--bend", "0deg")));
  }
})();
